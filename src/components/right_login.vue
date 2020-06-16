<template>
  <!-- 页面右边的登录框 -->
  <div class="login_box">
      <div class="login_top">
        <div class="imgBox">
          <img src="../assets/logo.png">
          <div class="tip">hi!登录查看你的专属职位</div>
        </div>
      </div>
      <div class="inp_box">
        <div class="phone">
          <input type="text" placeholder="请输入手机号">
        </div>
        <div class="code">
          <input type="text" placeholder="请输入验证码">
          <div class="get_code" @click="getCode">{{gteCodeType?'获取':times+'s'}}</div>
        </div>
        <div class="login">登录</div>
        <div style="height: 20px;"></div>
      </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        gteCodeType:true,
        timer:null,
        times:60
      }
    },
    methods:{
      getCode(){
        if(this.gteCodeType){
          this.gteCodeType = false
          this.timer = setInterval(()=>{
            this.times--
            if(this.times==0){
              clearInterval(this.timer)
              this.gteCodeType = true
              this.times = 60
            }
          },1000)
        }
      },
    },

  }
</script>

<style scoped>
  .login_box{width: 220px;background-color: white;}
  .login_box .imgBox{display: flex;align-items: center;}
  .login_box .imgBox img{width: 40px;height: 40px;margin: 20px;}
  .login_box .imgBox .tip{padding-right: 20px;}
  .inp_box{min-height: 100px;width: 220px;}
  .inp_box .phone input{width: 180px;height: 30px;margin-left: 20px;font-size: 13px;}
  .inp_box .code{width: 180px;height: 30px;border: 1px solid #00C982;margin: 20px;font-size: 13px;display: flex;align-items: center;justify-content: space-between;}
  .inp_box .code input{border: none;height: 100%;font-size: 13px;width: 100px;}
  .inp_box .get_code{width: 80px;text-align: center;font-size: 13px;color: #333333;border-left: 1px solid #EEEEEF;color: #00C982;cursor: pointer;}
  .inp_box .login{width: 180px;height: 30px;background-color: #00C982;margin: 20px;text-align: center;line-height: 30px;color: white;margin-bottom: 20px;cursor: pointer;}
</style>
