import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userDetails:{nickname:'123',work_tim:'',background:'',years:'',avatar_image_url:'',education:''},//用户昵称id,工作时间等
        userName: "",//没用到
		id:'', //没用到
		token:'',//没用到
		seekerUserId:'',//没用到
		loginType:null,//用户是否登录
		resume:false,//用户是否隐藏简历
		jobWanted:0,//用户的求职状态下标
		jobWantedArr:['求职中','暂不找工作'],//求职转态
		jobTitleLists:[{name:'web前端'},{name:'后端'}],//用户求职期望
		userDatas:{ //用户的工作经历,教育经历
			resumeList:[],
			education:[
				{school:'广州',school_time:'2019',major:'计算机'},
				// {school:'湛江',school_time:'2019',major:'计算机'},
			],
			userUrlList:[
        {url:'www'},{url:'baidu'}
      ],//个人主页
			projectList:[
        // {name:'牛牛科技'},{name:'快聘请'},
        ],//项目经验
			certificateList:[
        {name:'英语6级'},{name:'英语4级'}
       ],//证书
      workList:[
        // {company_name:'牛牛科技'},{company_name:'科技'}
      ]
		},
		chatNum:0,//聊天未读信息数
    },
    mutations: {
        login(state, data) { //将得到的用户详情传入userDetails
            state.userDetails = data ;
        },
		resumes(state,type){//用户简历隐藏设置
			// console.log('改变简历转态'+type)
			state.resume = type
		},
		jobWanteds(state,type){//用户的求职转态
			state.jobWanted = type
		},
		setJobTitleList(state,arr){
			state.jobTitleLists = arr
		},
		setUserDatas(state,arr){//修改用户的简历资料
			if(arr.index == 1){
				state.userDatas.resumeList = arr.resumeList
			}
			if(arr.index == 2){
				state.userDatas.education = arr.education
			}
			if(arr.index == 3){
				state.userDatas.userUrlList = arr.userUrlList
			}
			if(arr.index == 4){
				state.userDatas.projectList = arr.projectList
			}
		},
		setChatNum(state,num){ //修改消息的数目
			state.chatNum = num
		},
		setLoginType(state,type){
			state.loginType = type
		}
    }
})

export default store
