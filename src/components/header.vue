<template>
  <div>
    <div id="header">
      <div class="box">
        <div class="box_left">
          <div class="logo">logo区域</div>
          <router-link to="/" :class="headeIndex == 0 ? 'active' : ''">首页</router-link>
          <router-link to="/job" :class="headeIndex == 1 ? 'active' : ''">找工作</router-link>
          <router-link to="/company" :class="headeIndex == 2 ? 'active' : ''">搜公司</router-link>
        </div>
        <div class="box_right">
         <router-link to="/login">登录</router-link>
          <a href="">个人资料</a>
          <div class="ul_box">
            <a href="" class="name">李俊辉</a>
            <div class="imgbox"><img src="../assets/logo.png" /></div>
            <ul class="uls">
              <li>
                <router-link to="/resume">个人中心</router-link>
              </li>
              <li><a href="">账号设置</a></li>
              <li><a href="">隐私设置</a></li>
              <li><a href="">退出登陆</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  props: {
    headeIndex: Number //高亮
  },
  computed: {
    //Vuex
    ...mapState(['userDetails'])
  },
  name: 'Header',
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped>
.cur {
  cursor: pointer;
}
.active {
  color: #00c982;
}
/* .el-select{width: 300px !important;} */
/* .input_border input{border: 1px solid #00C982 !important; ;} */
/* 顶部栏 */
#header {
  width: 100%;
  background: black;
  height: 50px;
}
#header .box {
  width: 1100px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#header .box .box_left {
  color: white;
  display: flex;
  align-items: center;
}
#header .box .box_left .logo {
  width: 100px;
  height: 100%;
  text-align: center;
}
#header .box .box_left a:hover {
  color: #00c982;
}
#header .box .box_right {
  display: flex;
  align-items: center;
}
#header .box .box_right a {
  margin-right: 20px;
  transition: 0.5s;
  font-size: 14px;
  color: white;
}
.acitive {
  color: #00c982 !important;
}
#header .box_right .ul_box {
  position: relative;
}
#header .box_right .ul_box:hover > .uls {
  display: block;
}
#header .box_right .ul_box .name {
  float: left;
  height: 50px;
  line-height: 50px;
}
#header .box_right .ul_box .imgbox {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  float: left;
  margin-top: 10px;
  background-color: white;
  overflow: hidden;
}
#header .box_right .ul_box .imgbox img {
  width: 100%;
  height: 100%;
}
#header .box_right .uls {
  width: 150px;
  height: 200px;
  background-color: white;
  position: absolute;
  top: 50px;
  display: none;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 999;
}
#header .box_right .uls li {
  width: 100%;
  height: 50px;
  line-height: 50px;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
}
#header .box_right .uls li:hover {
  background: #eeeeef;
}
#header .box_right .uls a {
  color: #000000;
}
/* 登录蒙版 */
.mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>
