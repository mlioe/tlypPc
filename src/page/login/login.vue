<template>
  <div class="mask">
    <div class="header">
      <div class="text">腾龙易聘</div>
    </div>
    <div class="loginBox">
      <div class="top">账号登录</div>
      <div class="InpBox" v-show="loginTypeInp">
        <el-input placeholder="请输入内容" v-model="input4">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
        <el-input placeholder="请输入密码" v-model="input4">
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </div>
      <div class="InpBox" v-show="!loginTypeInp">
        <el-input placeholder="请输入手机号" v-model="mobile" maxlength="11">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
        <div class="codeBox">
          <input type="text" placeholder="请输入验证码" class="Inp" />
          <div class="get" @click="getCode">
            <span v-show="timerType">获取</span>
            <span v-show="!timerType">{{timerNum}}S</span>
          </div>
        </div>
      </div>
      <div class="type" @click="setType">验证码登录</div>
      <div class="login">登录</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import getCodeJs from '../../server/getcode'
export default {
  computed: {
    //Vuex
    ...mapState(["userDetails", "loginType"])
  },
  data() {
    return {
      length: null,
      acitive: 0,
      loginTypeInp: false,
      code: "",
      mobile: "",
      timerType:true,
      timer:null,
      timerNum:60,
      input4: ""
    };
  },
  mounted() {
    this.length = window.history.length; //通过length,判断是否是别的页面进入该页面，如果是，则长度大于2
    
  },
  methods: {
    setType() {
      this.loginTypeInp = !this.loginTypeInp;
    },
    getCode(){
        if(this.mobile == ''){
            this.$message({
              message: '电话号不能为空',
              type: 'warning'
            });
            return
        }
        if(this.timerType){
          this.timerType = false
          this.phoneCode()
          this.timer = setInterval(()=>{
            this.timerNum -- 
            if(this.timerNum == 0){
                this.timerType = true
                this.timerNum = 60
                clearInterval(this.timer)
            }
          },1000)
        }
    },
    async phoneCode(){
      const data = await getCodeJs.getCodes(this.mobile)
      console.log(data)
    }
  }
};
</script>

<style>
.mask {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #eeeeef;
}
.mask::after {
  background: url(../../assets/bgtop.svg) bottom center no-repeat;
  width: 100%;
  bottom: 0px;
  left: 0;
  height: 100%;
  content: "";
  position: absolute;
  background-size: contain;
  pointer-events: none;
}
.header {
  width: 450px;
  height: 80px;
  color: white;
  z-index: 9;
}
.text {
  position: absolute;
  z-index: 10;
  width: 450px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 26px;
}
.header::before {
  height: 80px;
  background-color: #409;
  width: 450px;
  transform: skew(-20deg);
  -webkit-transform: skew(-20deg);
  position: absolute;
  left: -20px;
  border-radius: 0 0 60px 0;
  line-height: 80px;
  font-size: 40px;
  text-align: center;
  color: white;
  top: 0;
  z-index: 1;
  content: "";
}
.loginBox {
  width: 350px;
  height: 400px;
  position: absolute;
  box-shadow: 0 6px 13px 0 rgba(0, 0, 0, 0.1);
  right: 200px;
  top: 50%;
  margin-top: -200px;
  z-index: 9;
  background-color: white;
  border-radius: 10px;
}
.loginBox .top {
  text-align: center;
  width: 100%;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  color: #808080;
}
.InpBox {
  width: 80%;
  margin: 5% 10%;
}
.el-input__inner {
  border-color: #eeeeef !important;
  border-radius: 0 !important;
  margin-top: 20px;
}
.codeBox {
  position: relative;
  height: 40px;
  width: 100%;
  border: 1px solid #eeeeef;
  margin-top: 20px;
  box-sizing: border-box;
  position: relative;
}
.codeBox input {
  border: none;
  height: 100%;
  width: 100%;
  padding-right: 100px;
  box-sizing: border-box;
  border: 1px solid #fff;
}
.codeBox input:focus {
  border: 1px solid #440099;
}
.get {
  position: absolute;
  right: 0;
  top: 2px;
  height: 34px;
  line-height: 34px;
  border-left: 1px solid #eeeeef;
  padding: 0 30px;
  cursor: pointer;
}
.el-input__inner:focus {
  border: 1px solid #440099 !important;
}
.el-input__inner i {
  color: #000000 !important;
}
.el-input__prefix,
.el-input__suffix {
  top: 10px !important;
}
.login {
  width: 80%;
  margin-left: 10%;
  background-color: #440099;
  height: 50px;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
.type {
  width: 80%;
  margin-left: 10%;
  line-height: 20px;
  margin: 20rpx 0;
  padding-bottom: 20px;
}
</style>
