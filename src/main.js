// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//vuex
import store from './store/index.js' //用户的信息状态库'
Vue.prototype.$store = store

//ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//ElementUI的提示功能,将他注册到全局
Vue.prototype.toasts = function(message){ //成功的提示
	this.$message({
	  message: message,
	  type: 'success'
	});
}
Vue.prototype.warningToast = function(message){ //错误的提示
	this.$message({
	  message: message,
	  type: 'warning'
	});
}
Vue.prototype.errorToast = function(message){ //警告的提示
	this.$message.error(message);
}
//轮播
import vueSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(vueSwiper)

//高德地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
    key: '40603c701ff650fe964bf49a21f9cd17',//申请的高德地图Key
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { store,App },
  template: '<App/>'
})
