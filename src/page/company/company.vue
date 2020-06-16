<template>
  <div>
    <headers :headeIndex="2"></headers>
    <search></search>
    <div class="company_list">
      <ul>
        <li v-for="item in list" @click="liClick()">
          <div class="li_top">
            <img src="../../assets/logo.png" alt="">
            <div class="list_top_title">
              <div class="title">平安惠普</div>
              <div class="tag">已上市 | 互联网金融</div>
            </div>
          </div>
          <div class="list_bottom">
            热招：<span>助理</span> 5-6K
          </div>
        </li>
      </ul>
    </div>
    <!-- 分页 -->
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
</template>

<script>
  import headers from '@/components/header.vue';
  import search from '@/components/company/search.vue';
  import { mapState, mapMutations } from 'vuex';
  export default {
    components: {
      //组件
      headers,search
    },
    data(){
      return{
        list:[{},{},{},{},{}]
      }
    },
    methods:{
      sizeChange(e){
        console.log(e)
      },
      liClick(){
        let routeData = this.$router.resolve({path: '/company_details',query:{ id:''}});
        window.open(routeData.href,'_blank')
      }
    }
  }
</script>

<style scoped>
  *{margin: 0;padding: 0;}
  .company_list{width: 1184px;margin:  0 auto;margin-top: 20px;display: flex;align-items: center;flex-wrap: wrap;}
  .company_list ul{height: auto;width: 100%;margin-top: 20px;}
  .company_list ul li{width: 284px;float: left;margin: 0 16px 16px 0;background-color: #FFFFFF;transition: 0.3s;cursor: pointer;}
  .company_list ul li:nth-of-type(4n){margin: 0;}
  .company_list ul li:hover{box-shadow: 0 0 8px 0 rgba(0,0,0,.13);}
  .company_list ul li img{width: 57px;height: 57px;border-radius: 10px;overflow: hidden;margin: 10px;}
  .li_top{border-bottom: 1px dashed #EEEEEF;width: 270px;margin-left: 7px;display: flex;align-items: center;justify-content: space-between;}
  .list_top_title{display: flex;align-items: flex-end;flex-direction: column;margin-right: 10px;}
  .list_top_title .title{font-size: 16px;font-weight: 400;margin-bottom: 10px;}
  .list_top_title .tag{color: #898e9d;font-size: 12px;}
   .list_bottom{min-height: 10px;padding: 10px 10px;}
  .list_bottom span{color: #00C982;padding-right: 10px;}
  .pagesBox{width: 1184px;display: flex;align-items: center;justify-content: space-between;margin:10px auto 20px auto ;}
</style>
