import {
    Message,
} from 'element-ui'
import {requests,aesDecrypt,header,datas,tlkpurl,aesEncrypt} from '../common/loginRequest'

function passVer(phone){//手机正则正则
    if(!(/^1[3456789]\d{9}$/.test(phone))){
        return false
    }else{
        return true
    }
}

async function getCodes(phone){//获取验证码短信
	if(phone===''){ //判断手机是否为空
        Message({
        	title:'',
        	content:'手机号不能为空',
        	showCancel:false
        })
        return false
    }
	if(!passVer(phone)){
		Message({
            message: '手机格式有误',
            type: 'warning'
          });
		return false
	}
    let headers = {'telo-origin-data':aesEncrypt(datas,header.encryptionKey)} //头部封装
	
    let data = {mobile: phone} //要传入的data
    let responses = {
        headers:headers,
        data:data,
        method:"GET",
        url:'/api/auth/login/captcha/sms'
    }
	const content = await requests(responses)
	return content
}


export default{
    getCodes,//获取验证码
}