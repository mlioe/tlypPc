<template>
  <div>
    <headers :headeIndex="1"></headers>
    <div class="main">

      <div class="banner">
        <div class="banner_box">
          <div class="left">
            <img src="../../assets/logo.png" alt="">
            <div>
              <div class="company_name">
                联邦快递
              </div>
              <div class="tag">
                已上市 · 10000人以上
              </div>
            </div>
          </div>
          <div class="right">
            <div class="number">11480</div>
            <div class="title">在招职位</div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="swipers">
        <div class="swipers_box">
          <div class="swipers_box_title" @click="swiperClic(true)" :class="showType ? 'active':''">公司简介</div>
          <div class="swipers_box_title" @click="swiperClic(false)" :class="!showType ? 'active':''">热招职位</div>
        </div>
      </div>
      <!--  -->
      <div class="job_details_box">
        <div class="box">
          <div class="left">
            <!-- 公司简介 -->
            <div v-show="showType">
              <!-- 简介 -->
              <div class="title" style="margin-top: 20px;">德邦快递简介</div>
              <div class="text">
                岗位职责：<br>
                网易互娱AI实验室招募NLP算法专家，负责NLP技术在人机对话、自动问答以及语义理解等方向上的研究和开发，应用于游戏<br>中智能助理、智能机器人等。目标是实现AI算法在游戏中的落地，从而实现与游戏玩家的智能交互、提升游戏玩家体验。
                要求：<br>
                1. 人工智能、数学和计算机等相关专业硕士及以上学历；<br>
                2. 精通自然语言处理相关领域的知识与技能，且有扎实的算法基础；<br>
                3. 具有 3年及以上工作经历，在人机交互、智能问答、文本检索及语义理解等方向有实际产品落地经验；<br>
                4. 熟练掌握一种常见的深度学习框架，譬如Caffe、TensorFlow和PyTorch；<br>
                5. 熟练掌握C/C++、Python语言，熟悉Hadoop、Spark框架者优先；<br>
                6. 有增强学习、深度增强学习经验者优先；<br>
                7. 在顶级会议或期刊有论文发表者优先;<br>
                8. 有带领团队项目开发经验者优先。<br>
              </div>
              <!-- 公司介绍 -->
              <div class="title">公司介绍</div>
              <div class="text">
                网易 (NASDAQ: NTES)，1997年由丁磊先生在广州创办、2000年在美国NASDAQ股票交易所挂牌上市，是中国领先的互联网技术公司，在开发互联网应用、服务等方面始终保持中国业界领先地位。本着对中国互联网发展强烈的使命感，缔造美好生活的愿景，网易利用最先进的互联网技术，加强人与人之间信息的
              </div>

              <!-- 工作地址 -->
              <div class="title">工作地址</div>
              <div class="map">
                  <el-amap
                    :center='center'
                    :zoom='zoom'
                  >
                    <el-amap-marker
                      :position="center"
                      :label="label"
                    ></el-amap-marker>
                  </el-amap>
               </div>
            </div>

            <!-- 在招职位 -->
            <div v-show="!showType">
              <div class="job_list" v-for="item in jobList">
                <div class="left">
                  <div class="name">市场营销</div>
                  <div class="tag">4-10K 经验不限 | 学历不限</div>
                </div>
                <div class="other">
                  <img src="../../assets/logo.png" alt="">
                  <span>王先生 | 店长</span>
                </div>
              </div>
            </div>
            <div class="pagesBox" v-show="!showType">
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
            <rightlogin style="margin-top: 20px;"></rightlogin>
            <!-- 公司基本信息 -->

            <!-- -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headers from '@/components/header.vue';
import rightlogin from '@/components/right_login.vue';
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    //Vuex
    ...mapState(['userDetails','loginType'])
  },
  components: {
    //组件
    headers,rightlogin
  },
  data(){
    return{
        center: [116.397428, 39.90923],
            zoom: 15,
            label:{
              content: '故宫',
              offset:[10,12]
            },
            showType:true,
            jobList:[{},{},{},{},{},{},{},{},{},{},{},{},]
    }
  },
  mounted(){//监听页面滚动
    // console.log('--'+this.loginType)
  },
  methods:{
    swiperClic(type){
      this.showType = type
    }
  }
};
</script>

<style scoped>
  .main{overflow: hidden;}
  .banner{width: 100%;background: linear-gradient(to right,#444c60,#444c70);}
  .banner_box{width: 1100px;margin: 0 auto;display: flex;justify-content: space-between;}
  .banner_box .left{display: flex;align-items: center;}
  .banner_box .left img{width: 100px;height: 100px;margin: 20px 50px 20px 0;}
  .banner_box .left .company_name{font-size: 32px;line-height: 40px;color: white;}
  .banner_box .left .tag{color: #EEEEEF;font-size: 14px;margin-top: 10px;}
  .banner_box .right{display: flex;align-items: flex-end;flex-direction: column;margin-top: 30px;margin-right: 20px;}
  .banner_box .right .number{color: white;font-size: 36px;}
  .banner_box .right .title{color: white;font-size:16px ;}
  /*  */
  .swipers{width: 100%;background: linear-gradient(to right,#444c60,#444c70);height: 50px;}
  .swipers_box{width: 1100px;height: 50px;margin: 0 auto;}
  .swipers_box .swipers_box_title{height: 50px;display: inline-block;border-bottom: 3px solid #444c60;box-sizing: border-box;line-height: 50px;color: #FFFFFF;font-size: 16px;margin-right: 20px;cursor: pointer;}
  .swipers_box .active{border-bottom: 3px solid #00C982;color: #00C982;}
  /*  */
  .job_details_box{width: 100%;min-height: 20px;background-color: white;}
  .job_details_box .box{width: 1100px;margin: 0 auto;display: flex;justify-content: space-between;}
  .job_details_box .box .left{width: 850px;}
  .job_details_box .box .right{width: 220px;box-sizing: border-box;border-left:1px solid #EEEEEF ;}
  .job_details_box .box .left .title{font-size: 15px;color:  #424a5e;font-weight: 700;border-bottom: 3px solid #00C982;display: inline-block;margin-bottom: 10px;}
  .job_details_box .box .left .text{color: #61687c;line-height: 36px;font-size: 14px;margin-bottom: 10px;}
  .map{width: 800px;height: 200px;margin-top: 20px;margin-bottom: 20px;}
  /* 招聘信息 */
  .job_list{width:80%;min-height: 100px;border-bottom: 1px dashed #EEEEEF;display: flex;align-items: center;}
  .job_list .left .name{font-size: 16px;color: #00C982;padding: 13px 0 10px;}
  .job_list .left .tag{font-size: 14px;color: #61687c;margin-top: 5px;}
  .job_list .left .red{color: #FC703E;display: flex;align-items: center;}
  .job_list .other{display: flex;align-items: center;width: 200px;color: #333333;}
  .job_list .other img{width: 20px;height: 20px;margin-right: 20px;}

  .pagesBox{width: 680px;display: flex;align-items: center;justify-content: space-between;margin-bottom: 20px;margin-top: 20px;}
</style>
