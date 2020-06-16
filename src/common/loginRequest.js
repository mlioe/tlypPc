import cryptoJS from 'crypto-js'
import axios from 'axios'

//谦哥的登录 http://192.168.31.218:8000
//谦哥的系统 http://192.168.31.218:8800
//陈镇的系统 http://192.168.31.242:8800
//陈镇登录 http://192.168.31.242:8000
const webtype = false//true为线上,fasle为线下环境
export let tlkpurl = webtype ? 'http://192.168.31.242:8000' : 'http://192.168.31.218:8000' //tlkp
export let header = {
    encryptionKey: 'telo-origin', // 用来加密/解密来源数据的key
    encryptionKey2: 'telo-auth', //  用来加密/解密认证数据的key
    encrypt: 'telo-data-encrypt', // 返回的数据是否加密的头部
    timestamp: 'telo-time-param', // 返回的时间戳的头部
}
export let datas = { 'name': 'kuaipin_admin' } //快聘的key
export function requests(responses) { //api文件夹里的文件请求接口时先将请求方式等传入
    return checkStatus(responses)
}
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
/**
 * reqsponses 包含请求头，url，数据等
 * @param responses 
 */
async function checkStatus(responses) {
    let response = ''
    if(responses.method == 'GET'){
        response = await apiGetRequest(responses) //将传入的数据传给封装的接口，拿到值
    }
    if(responses.method == 'POST'){
        response = await apiPostRequest(responses) //将传入的数据传给封装的接口，拿到值
    }
    let falseCode = [400001, 400002, 400003, 400004, 470000, 470027,401003];
    // if (falseCode.includes(response.status)) {
    //     console.log('在里面')
    //     window.location.href='/company/company_manage'
    // }
    if (response.status< 200 && response.status > 300) { //200---300为正常返回，否则将对应的错误return出去
        const errorText = codeMessage[response.status] || '其他类型的报错'
        const error = new Error(errorText)
        throw error
    }
    let encrypt = response.headers[header.encrypt]
    let timestamp = response.headers[header.timestamp]
    if (encrypt === 'true' && timestamp != "") { //获取到的数据encrypt 是 true的话说明是加密过的并且时间戳不为空
        let key = header.timestamp + timestamp //对应的key+时间戳
        let result = aesDecrypt(response.data.data, key) //将得到的key和数据进行解密
        if (typeof result === "string") { //返回的是字符串则转换为json格式
            result = JSON.parse(result)
        }
        return result
    } else { //没有加密则直接返回数据
        if (falseCode.includes(response.data.code)) { //如果在对应的数组里，则强制跳转登录页，其中401003代表没通行证，跳转登录页
            window.location.href='/login'
        }
        return response.data
    }
}

async function apiGetRequest(responses) {//get方法
    return new Promise((resolve, reject) => {
        axios.request({
            url:responses.url,
            method: responses.method,
            params: responses.data,
            headers:responses.headers,
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error)
        });
    })
}

async function apiPostRequest(responses){//post
    return new Promise((resolve, reject) => {
        axios({
            method:'post',
            url:responses.url,
            data:responses.data,
            headers:responses.headers,
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error)
        });
    })
}

/**
 * 请求前，对请求头datas的数据进行加密
 * @param data 加密前的数据
 * @param key 加密的key
 */
export function aesEncrypt(data, key) {
    try {
        // console.log(data)
        let datas = JSON.stringify(data)
        let result = null
        result = cryptoJS.AES.encrypt(datas, key)
        result = result.toString()
        result = cryptoJS.enc.Utf8.parse(result)
        result = cryptoJS.enc.Base64.stringify(result)
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}


/**请求后对得到的数据进行解密
 * 
 * @param data 加密后的数据
 * @param key 解密的key
 */

export function aesDecrypt(data, key) {
    try {
        // 用base64解码
        let result = null
        result = cryptoJS.enc.Base64.parse(data)
        result = result.toString(cryptoJS.enc.Utf8)
        // aes解密
        result = cryptoJS.AES.decrypt(result, key)
        result = result.toString(cryptoJS.enc.Utf8)
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}

