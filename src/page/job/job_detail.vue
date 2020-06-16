<template>
  <div>
    <headers :headeIndex="1"></headers>
    <div class="main">
      <div class="banner">
        <div class="tip">招聘中</div>
        <div class="banner_box">
          <div class="left">
            <div class="title">
              <span class="title_name">多媒体设计师</span>
              <span class="moeny">3-5K</span>
            </div>
            <div class="other">
              广州 · 1年以内 · 本科
            </div>
            <div class="tag_box">
              <div class="tag">有提成</div>
              <div class="tag">包吃住</div>
            </div>
          </div>
          <div class="right">
            <div class="chat">立即沟通</div>
            <div class="Icon time">&#xe8e7; 2018-01-01 </div>
            <!-- <div class="Icon love active">&#xe8e9; 收藏</div> -->
          </div>
        </div>
      </div>
      <!--  -->
      <div class="job_details_box">
        <div class="box">
          <div class="left">
            <!-- 顶部 -->
            <div class="detail_top">
              <div class="detail_top_left">
                <img src="../../assets/logo.png" alt="">
                <div>
                  <div class="name">陈先生</div>
                  <div class="position">职校经理</div>
                </div>
              </div>
              <div class="detail_top_right">
                <span class="Icon">&#xe65c;感兴趣</span><span class="Icon">&#xe658;举报</span>
              </div>
            </div>
            <!-- 职位描述 -->
            <div class="title">职位描述</div>
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
            <!-- 工商信息 -->
            <div class="title">工商信息</div>
            <div class="company_information">
              <div class="company_information_title">网易（杭州）网络有限公司 </div>
              <ul>
                <li>
                  <span>法人代表：</span>丁磊
                </li>
                <li>
                  <span>注册资金：</span>11111
                </li>
                <li>
                  <span>成立时间：</span>2001-01-01
                </li>
              </ul>
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

            <!--  -->
          </div>
          <div class="right">
            <rightlogin style="margin-top: 20px;"></rightlogin>
            <!-- 公司基本信息 -->
            <div class="company">
              <div class="title">公司基本信息</div>
              <div>
                <div class="img_box">
                  <img src="../../assets/logo.png" alt="">
                  <span>阿里巴巴集团</span>
                </div>
                <div class="tag">
                  <span class="Icon">&#xe8ec;</span> 不需要融资
                </div>
                <div class="tag">
                  <span class="Icon">&#xe8ec;</span> 10-20人
                </div>
                <div class="tag">
                  <span class="Icon">&#xe8ec;</span> www.baidu.com
                </div>
              </div>
            </div>
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
            }
    }
  },
  mounted(){//监听页面滚动
    // console.log('--'+this.loginType)
  },
  methods:{


  }
};
</script>

<style scoped>
  .main{overflow: hidden;}
  .banner{width: 100%;min-height: 200px;background: linear-gradient(to right,#444c60,#444c70);}
  .tip{width: 1100px;height: 50px;margin: 0 auto;line-height: 50px;color: #EEEEEF;font-size: 16px;}
  .banner_box{width: 1100px;margin: 0 auto;display: flex;justify-content: space-between;}
  .banner_box .title .title_name{color: white;font-size: 24px;}
  .banner_box .title .moeny{color: #FC703E;font-size: 24px;font-weight: bold;padding-left: 20px;}
  .banner_box .other{color: #EEEEEF;font-size: 16px;margin-top: 20px;}
  .banner_box .tag_box{margin-top: 20px;}
  .banner_box .tag{display: inline-block;border: 1px solid #00C982;color: #00C982;margin-right: 10px;font-size: 12px;padding: 5px 20px;border-radius: 20px;}
  .banner_box .chat{width: 200px;height: 40px;background-color: #00C982;color: white;text-align: center;line-height: 40px;font-weight: bold;font-size: 16px;cursor: pointer;}
  .banner_box .right .time,.love{color: white;font-size: 14px;margin-top: 20px;}
  .banner_box .right .love{cursor: pointer;}
  .active{color: #FC703E;}
  .job_details_box{width: 100%;min-height: 20px;background-color: white;}
  .job_details_box .box{width: 1100px;margin: 0 auto;display: flex;justify-content: space-between;}
  .job_details_box .box .left{width: 850px;}
  .job_details_box .box .right{width: 220px;box-sizing: border-box;border-left:1px solid #EEEEEF ;}
  .job_details_box .detail_top{width: 100%;height: 120px;margin-top: 20px;display: flex;justify-content: space-between;align-items: center;}
  .job_details_box .detail_top_left{display: flex;align-items: center;}
  .job_details_box .detail_top_left img{width: 60px;height: 60px;}
  .job_details_box .detail_top_left .name{font-size: 18px;padding-left: 20px;}
  .job_details_box .detail_top_left .position{padding-left: 20px;color: #9fa3af;padding-top: 5px;font-size: 15px;}
  .job_details_box .detail_top_right{margin-top: 20px;}
  .job_details_box .detail_top_right span{margin-left: 20px;color: #333333;}
  .job_details_box .box .left .title{font-size: 15px;color:  #424a5e;font-weight: 700;border-bottom: 3px solid #00C982;display: inline-block;margin-bottom: 10px;}
  .job_details_box .box .left .text{color: #61687c;line-height: 36px;font-size: 14px;margin-bottom: 10px;}
  /* 工商信息 */
  .company_information {font-size: 14px;}
  .company_information_title{margin-top: 10px;}
  .company_information ul{display: flex;}
  .company_information ul li{margin:20px 20px 20px 0;}
  .company_information ul li span{margin-right: 7px;color: #8D92A1;}
  .map{width: 800px;height: 200px;margin-top: 20px;margin-bottom: 20px;}
  /* 右侧公司信息 */
  .right .company{margin-left: 20px;display: flex;flex-direction: column;}
  .right .company .title{font-size: 15px;font-weight: 500;color: #414a60;margin-bottom: 20px;}
  .right .company .img_box{display: flex;align-items: center;}
  .right .company .img_box img{width: 40px;height: 40px;}
  .right .company .img_box span{padding-left: 30px;}
  .right .company .tag{margin-top: 20px;font-size: 15px;font-weight: 500;color: #414A60;}
  .right .company .tag .Icon{margin-right: 10px;}
</style>
