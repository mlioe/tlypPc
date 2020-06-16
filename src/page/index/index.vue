<template>
<div id="app" class="app">
    <headers :headeIndex="0"></headers>
    <!-- 移动到某个位置，出现浮动的搜索栏 -->
    <div class="search_box_flex" :style="flexSearchBoxType ? '':'display:none'">
      <!-- 搜索区域  -->
      <div class="search_box">
        <div class="search_box_type_box">
            找工作 <span class="Icon">&#xe665;</span>
        </div>
        <input type="text" placeholder="搜索职位/公司/人才">
        <div class="search_sub">搜索</div>
      </div>
    </div>
    <!-- 返回顶部 -->

    <!--  -->
    <div id="main">
        <div class="main_box">
            <!-- 搜索区域  -->
            <div class="search_box">
              <div class="search_box_type_box">
                  找工作 <span class="Icon">&#xe665;</span>
              </div>
              <input type="text" placeholder="搜索职位/公司/人才">
              <div class="search_sub">搜索</div>
            </div>
            <!-- 轮播、职位类型区域 -->
            <div class="flex flex-justify-content index_classification">
              <jobmenu @jobTag="jobTag"></jobmenu>
              <div class="swiper_box">
                  <swiper></swiper>
              </div>
            </div>
            <!-- 公司列表 -->
            <div class="company_box">
              <div class="company_list" v-for="(item,index) in companyList" :key="index">
                <div class="list_img_box">
                  <img src="../../assets/logo.png" alt="">
                </div>
                <div class="list_name">
                  广东牛牛科技
                </div>
                <div class="mask">
                  <div class="mask_title">10个热招职位</div>
                  <div class="mask_inp">查看详情</div>
                </div>
              </div>
            </div>
            <!-- 紧急招聘栏 -->
            <div class="urgent_position_title">紧急招聘</div>
            <div class="urgent_position_box">
              <div class="urgent_position_list" v-for="(item,index) in urgentList" :key="index">
                <div class="list_top">
                  <div class="list_top_title">中心主任</div>
                  <div class="list_top_money">6K-10K</div>
                </div>
                <div class="list_other">
                  <div class="list_other_comany_name">广东开发企业</div>
                  <div class="list_other_edg">
                    本科 | 1-3年
                  </div>
                </div>
                <div class="list_bottom">
                  <div class="logo Icon">&#xe643;<span>开发区</span></div>
                  <div class="inp">我要应聘</div>
                </div>
              </div>
            </div>
            <!-- （最新职位，热门职位等）职位区 -->
            <div class="position_box_title">
              <div class="title" :class="positionIndex == 0 ? 'title_active':''" @mousemove="title_mouse(0)">最新职位</div>
              <div class="title" :class="positionIndex == 1 ? 'title_active':''" @mousemove="title_mouse(1)">热门职位</div>
              <div class="title" :class="positionIndex == 2 ? 'title_active':''" @mousemove="title_mouse(2)">高薪职位</div>
            </div>
            <div class="position_box">
                <div class="new" :style="positionIndex == 0 ? '':'display:none'">
                    <div class="list" v-for="(item,index) in newList" :key="index">
                      <div class="list_top">
                        <div class="list_top_title">文员</div>
                        <div class="list_top_money">面议</div>
                      </div>
                      <div class="list_tag">
                        赤坑区 | 经验不限 | 学历不限
                      </div>
                      <div class="list_company">
                        湛江牛牛科技有限公司
                      </div>
                    </div>
                </div>
                <div class="hot" :style="positionIndex == 1 ? '':'display:none'">
                    <div class="list" v-for="(item,index) in hotList" :key="index">
                      <div class="list_top">
                        <div class="list_top_title">文员</div>
                        <div class="list_top_money">面议</div>
                      </div>
                      <div class="list_tag">
                        赤坑区 | 经验不限 | 学历不限
                      </div>
                      <div class="list_company">
                        湛江牛牛科技有限公司
                      </div>
                    </div>
                </div>
                <div class="hight" :style="positionIndex == 2 ? '':'display:none'">
                    <div class="list" v-for="(item,index) in hightList" :key="index">
                      <div class="list_top">
                        <div class="list_top_title">文员</div>
                        <div class="list_top_money">面议</div>
                      </div>
                      <div class="list_tag">
                        赤坑区 | 经验不限 | 学历不限
                      </div>
                      <div class="list_company">
                        湛江牛牛科技有限公司
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>



<script>
    import headers from '@/components/header.vue'
    import jobmenu from '@/components/index/jobmenu.vue'
    import swiper from '@/components/index/swiper.vue'
    import { mapState, mapMutations } from 'vuex';
    export default{
        computed: {
		    //Vuex
		    ...mapState(['userDetails','loginType']),

        },
        mounted(){//监听页面滚动
          window.addEventListener('scroll',this.handleScroll,true)
          console.log(this.loginType+'---')
        },
        components: {
		    //组件
            headers,jobmenu,swiper
        },
        created(){
            // console.log(this.userDetails)
        },
        data(){
            return{
              companyList:[{},{},{},{},{},{},{},{}],
              urgentList:[{},{},{}],
              positionIndex:0,
              flexSearchBoxType:false,
              newList:[{},{},{},{},{}],
              hotList:[{},{},{},{}],
              hightList:[{},{}]
            }
        },
        methods:{
          title_mouse(index){ //最新职位、热门职位、高薪职位切换
            // console.log(index)
            this.positionIndex = index
          },
          handleScroll(e){//页面滚动的值
            const scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
            // console.log(scrollTop)
            if(scrollTop > 120){
              this.flexSearchBoxType = true
            }else{
              this.flexSearchBoxType = false
            }
          },
          jobTag(item){//点击职位分类
            // console.log('首页职位标签')
            // console.log(item.id+item.categoryname)
            this.$router.push({path: '/job',query:{ id:item.id,categoryname:item.categoryname}});
          }
        }
    }

</script>


<style scoped>

.flex{display: flex;align-items: center;}
.flex-justify-content{justify-content: space-between;}
/* 内容区域 */
#main{width: 100%;}
.main_box{width: 1100px;margin: 0 auto;}
/* 搜索框 */
.search_box{width: 900px;height: 50px;background-color: white;box-shadow: 0 0 6px 0 rgba(0,0,0,.13);margin-top: 20px;margin-left: 100px;display: flex;align-items: center;justify-content: space-between;border: 1px solid #00C982;transition: 0.1s;cursor: pointer;}
.search_box_type_box{width: 150px;background-color: white;height: 50px;display: flex;align-items: center;justify-content: center;font-size: 16px;}
.search_box_type_box span{margin-left: 10px;}
.search_box input{flex: 2;height: 50px;border: none;font-size: 16px;}
.search_sub{height: 50px;background: #00C982;width:150px;line-height: 50px;text-align: center;font-size: 16px;color: white;}
/* 浮动搜索框 */
.search_box_flex{width: 100%;background-color: white;position:fixed;top: 0;z-index: 1000;display: flex;justify-content: center;box-shadow: 0 0 6px 0 rgba(0,0,0,.13);height: 100px;}

/* 轮播、求职分类盒子 */
.index_classification{width: 1080px;margin: 20px auto 0 auto;}
.swiper_box{width: 700px;height: 360px;background-color: white;box-shadow: 0 0 6px 0 rgba(0,0,0,.13);}
/* 公司列表 */
.company_box{width: 1080px;min-height: 130px;background-color: white;margin-top: 20px;display: flex;align-items: auto;flex-wrap: wrap;margin-left: 10px;}
.company_list{width: 180px;height: 130px;border-right: 1px solid #EEEEEF;box-sizing: border-box;border-bottom: 1px solid #EEEEEF;cursor: pointer;position: relative;}
.company_list .list_img_box{height: 90px;background-color: #FFFFFF;display: flex;align-items: center;justify-content: center;}
.company_list .list_img_box img{height: 70px;}
.company_list .list_name{font-size: 14px;width: 100%;height: 40px;line-height: 40px;text-align: center;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.company_list .mask{width: 180px;height: 130px;position: absolute;top: 0;left: 0;background-color: rgba(0,0,0,0.5);opacity: 0;transition: 0.2s;display: flex;align-items: center;justify-content: center;flex-direction: column;}
.company_list .mask:hover{opacity: 1;}
.company_list .mask .mask_title{color: white;font-size: 12px;}
.company_list .mask .mask_inp{width: 90px;height: 22px;background-color: #00C982;font-size: 12px;color: white;text-align: center;line-height: 22px;border-radius: 10px;margin-top: 20px;box-sizing: border-box;}
/* 紧急招聘 */
.urgent_position_title{width: 1080px;margin-top: 20px;display: flex;align-items: auto;flex-wrap: wrap;margin-left: 10px;font-size: 18px;font-weight: 600;}
.urgent_position_box{width: 1080px;min-height: 100px;background-color: white;margin-top: 20px;display: flex;align-items: auto;flex-wrap: wrap;margin-left: 10px;}
.urgent_position_list{width: 360px;border-right: 1px solid #EEEEEF;box-sizing: border-box;}
.urgent_position_list:nth-of-type(3n){border: none;}
.urgent_position_list .list_top{width: 300px;margin-left: 30px;display: flex;justify-content: space-between;font-size: 16px;height: 20px;line-height: 20px;margin-top: 15px;}
.urgent_position_list .list_top_money{color: #00C982;}
.urgent_position_list .list_other{width: 300px;argin-left: 30px;display: flex;justify-content: space-between;font-size: 14px;height: 20px;line-height: 20px;margin-top: 15px;margin-left: 30px;}
.urgent_position_list .list_bottom{width: 300px;display: flex;justify-content: space-between;margin-left: 30px;margin-top: 10px;align-items: center;margin-bottom: 10px;}
.urgent_position_list .list_bottom .Icon{height: 20px;}
.urgent_position_list .list_bottom .inp{border: 1px solid #00C982;padding:5px 10px;font-size: 12px;border-radius: 16px;color: #00C982;cursor: pointer;transition: 0.5s;}
.urgent_position_list .list_bottom .inp:hover{color: white;background-color: #00C982;}
/* 最新职位等 */
.position_box_title{width: 1080px;margin-top: 20px;display: flex;align-items: auto;flex-wrap: wrap;margin-left: 10px;font-size: 18px;font-weight: 600;}
.position_box_title .title{margin-right: 30px;color: #808080;cursor: pointer;}
.position_box_title .title_active{color: #000000;}
.position_box{width: 1080px;background-color: white;margin-top: 20px;display: flex;align-items: auto;flex-wrap: wrap;margin-left: 10px;}
.new,.hot,.hight{display: flex;align-items: auto;flex-wrap: wrap;}
.position_box .list{width: 360px;border-right: 1px solid #EEEEEF;box-sizing: border-box;border-bottom: 1px solid #EEEEEF;}
.position_box .list:nth-of-type(3n){border-right: none;}
.position_box .list .list_top{display: flex;width: 300px;display: flex;justify-content: space-between;margin-left: 30px;font-size: 16px;padding-top: 10px;}
.position_box .list .list_top_money{color: #00C982;}
.position_box .list .list_tag{margin-left: 30px;font-size: 14px;padding-top: 10px;}
.position_box .list .list_company{margin-left: 30px;font-size: 14px;padding-top: 10px;padding-bottom: 10px;color: #808080;}
</style>
