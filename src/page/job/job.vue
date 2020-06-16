<template>
  <div>
    <headers :headeIndex="1"></headers>

    <search :class="searchBoxType ? 'fixed':''" :val="str" @searchJob="searchJob" @valChangeSearch="valChangeSearch"></search>
    <div class="job_box">
      <div class="job_list">
        <div class="list" v-for="(item,index) in list" :key="index" @click="jobClick(index)">
          <div class="list_top">
             <div class="list_top_left">
               <div class="title">
                 <span>web前端工程师</span>
                 <span class="Icon"> &#xe8db; <span class="chat">立即沟通</span></span>
               </div>
               <div class="other">
                 <span class="moeny">5k-6K</span>
                 <span class="tag ">5-10年 | 大专</span>
               </div>
             </div>
             <div class="list_top_right">
                <div class="left">
                  <div class="company_name">
                    广东牛牛科技
                  </div>
                  <div class="tag" style="font-size: 14px;">互联网 | 不需要融资 | 10-20人</div>
                </div>
                <div class="right">
                  <img src="../../assets/logo.png" alt="">
                </div>
             </div>
          </div>
        </div>
        <div class="pagesBox">
          <el-pagination
            style="margin: 0 auto;"
            background
            layout="prev, pager, next"
            @current-change="sizeChange"
            :total="1000">
          </el-pagination>
        </div>
      </div>
      <div class="right">
        <rightlogin></rightlogin>
        <div style="margin-top: 20px;font-size: 16px;font-weight: 500;">最新职位</div>
        <div class="other_job_list">
            <div class="list" v-for="item in otherList">
              <div class="list_top">
                <div class="list_top_job_name">web前端</div>
                <div class="list_top_money">10-20K</div>
              </div>
              <div class="company_name">广东牛牛科技</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headers from '@/components/header.vue';
import rightlogin from '@/components/right_login.vue';
import search from '@/components/job/search.vue';
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    //Vuex
    ...mapState(['userDetails','loginType'])
  },
  components: {
    //组件
    headers,search,rightlogin
  },
  data(){
    return{
      list:[{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
      otherList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
      searchBoxType:false,//控制搜索栏是否浮动吸顶
      str:'',
      id:'',
      categoryname:''
    }
  },
  mounted(){//监听页面滚动
    // console.log(this.loginType+'--登录状态--')
    window.addEventListener('scroll',this.handleScroll,true)
    if(JSON.stringify(this.$route.query)!="{}"){//判断是否为空
      // console.log(this.$route.query.categoryname+'获取路由的值')
      this.str = this.$route.query.categoryname
      // console.log(this.str)
    }
    // this.setLoginType(true)
    // console.log(this.loginType+'--登录状态--')
  },
  methods:{
    ...mapMutations(['setLoginType']),
    jobClick(){
      // this.$router.push({path: '/job_details',query:{ id:''}});
      let routeData = this.$router.resolve({path: '/job_details',query:{ id:''}});
      window.open(routeData.href,'_blank')
    },
    valChangeSearch(){
      console.log('触发搜索')
    },
    searchJob(){
      console.log('点击搜索')
      this.$router.replace({
          query: {
            id:'',categoryname:''
          }
      })
    },
    sizeChange(e){//页数改变时
      console.log(e)
    },
    handleScroll(e){//页面滚动的值,控制搜索栏是否吸顶
      const scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
      // console.log(scrollTop)
      if(scrollTop > 150){
        this.searchBoxType = true
      }else{
        this.searchBoxType = false
      }
    },
  }
};
</script>

<style scoped>
  /* 控制浮动 */
  .fixed{position: fixed;top: 0;}
  /*  */
  .job_box{width:1100px;margin: 20px auto;min-height: 200px;}
  .job_list{width: 850px;cursor: pointer;float: left;}
  .job_list .list{margin-bottom: 20px;}
  .job_list .list_top{width: 850px;background-color: white;display: flex;justify-content: space-between;}
  .job_list .list_top_left{width: 450px;}
  .job_list .list_top_left .title{font-weight: 600;font-size: 16px;color: #00C982;padding: 20px 0 10px 20px;}
  .job_list .list_top_left .other{padding-left: 20px;padding-bottom: 20px;font-size: 14px;}
  .job_list .list_top_left .other .moeny{font-weight: bold;color: #fc703e !important;margin-right: 30px;}
  .job_list .list_top_right{display: flex;justify-content: space-between;width: 400px;}
  .job_list .list_top_right .company_name{font-weight: 600;font-size: 16px;color: #00C982;padding: 20px 0 10px 0px;}
  .job_list .list_top_right .right{}
  .job_list .list_top_right .right img{width: 56px;height: 56px;margin: 20px;}
  .Icon{margin-left: 20px;cursor: pointer;}
  .chat{font-size: 14px;color: #333;transition: 0.1s;}
  .Icon:hover>.chat{color: #00C982;}
  .pagesBox{width: 850px;display: flex;align-items: center;justify-content: space-between;margin-bottom: 20px;}
  /* 右边框 */
  .right{float: right;}
  /* 右边推荐的最新工作 */
  .other_job_list{width: 100%;min-height: 50px;background-color: white;margin-top: 20px;}
  .other_job_list .list{width: 200px;margin-left: 10px;border-bottom: 1px dashed #EEEEEF;margin-bottom: 10px;}
  .other_job_list .list .list_top{display: flex;justify-content: space-between;color: #333333;font-size: 15px;padding-top: 10px;padding-bottom: 10px;align-items: center;}

  .other_job_list .list_top .list_top_job_name{flex: 2;margin-right: 10px;}
  .other_job_list .list_top .list_top_money{width: 50px;color: #FC703E;}
  .other_job_list .company_name{font-size: 13px;padding: 10px 0;color: #333333;}
</style>
