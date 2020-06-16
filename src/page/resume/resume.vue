<template>
<div>
    <!-- 头部区域 -->
    <headers></headers>
    <!-- 内容区域 -->
    <div id="main">
        <!-- 内容区域右边 -->
        <div class="main_lefe">
          <!-- 个人资料,名字头像等 -->
          <mydata v-show="set_data_type" @setData="setData">
          </mydata>
          <!-- 修改个人资料功能 -->
          <setdata v-show="!set_data_type" @setDataCancel="setDataCancel" @setDataSave="setDataSave">
          </setdata>
          <!-- 个人优势 -->
          <div class="list" v-show="advantageType">
            <div class="list_title">个人优势</div>
            <div class="list_advantage_box">
              <div class="list_advantage_text">
                1.熟练掌握HTML的标签，CSS和JavaScript实现网页的基本布局 <br>
                2.熟练使用javascript的DOM、BOM操作<br>
                3.熟练使用ajax实现后台Json的交互<br>
                4.熟练使用Photoshop、HbuilderX、vscode等软件<br>
                5.熟悉Vue.js、elementUI等框架的基本使用<br>
                6.熟悉使用SVN，git协同开发<br>
                7.善于使用git、前端开发网站寻找问题解决问题
              </div>
              <div class="set" @click="setAdvantage">编辑</div>
            </div>
          </div>
          <!-- 编辑个人优势 -->
          <div class="list" v-show="!advantageType">
            <div class="set_title">编辑个人优势 </div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="advantageVal"
              maxlength="300"
              show-word-limit
              size="medium"
              style="width: 700px;"
            >
            </el-input>
            <div class="save_box">
              <div class="save">保存</div>
              <div class="cancel">取消</div>
            </div>
          </div>
          <!-- 求职期望 -->
          <expect v-show="set_expect_type" @addExpect="addExpect" :jobTitleLists="jobTitleLists" @deleteExpect="deleteExpect" @putExpect="putExpect"></expect>
          <!-- 编辑求职期望 -->
          <editexpect v-show="!set_expect_type" :setExpects="setExpects" @postExpect="postExpect" :jobTitleLists="jobTitleLists" :setExpectIndex="setExpectIndex" @putExpectList="putExpectList"></editexpect>
          <!-- 工作经历 -->
          <wrok
            v-show="setWork_type"
            @addWork="addWork"
            @setWorkList="setWorkList"
            @deleteWork="deleteWork"
            :workList="userDatas.workList"
          >

          </wrok>
          <!-- 编辑工作经历 addWork点击添加事件 -->
          <editwork
            v-show="!setWork_type"
            :setWork="setWork"
            :workList="userDatas.workList"
            :workListIndex="setWorkIndex"
            @postWork="postWork"
            @putWork="putWork"
          >

          </editwork>
          <!-- 项目经历 deleteProject删除功能(index)是下标,setProject修改功能(index)是下标,projectList传给子组件的值-->
          <project

            @deleteProject="deleteProject"
            @setProject="setProject"
            :projectList="userDatas.projectList"
            v-loading="deleteProjectType"
            element-loading-text="修改中"
            v-show="set_project_type"
            @addProject="addProject"
          >

          </project>
          <!-- 管理项目经历 set_project控制项目编辑器是要添加还是更新  setProjectIndex要更新的项目下标 projectList项目经历的数据-->
          <editproject v-show="!set_project_type"
          :set_project="setProjects"
          :setProjectIndex="setProjectIndex"
          :project_list="userDatas.projectList"
          @putProject="putProject"
          @postProject="postProject"
          >
          </editproject >

          <!-- 教育经历 -->
          <education
            :educationList="userDatas.education"
            v-show="set_education"
            @addEducation="addEducation"
            @putEducation="putEducation"
          ></education>
          <!-- 编辑教育经历 -->
          <editeducation
          v-show="!set_education"
          :setEducations="setEducations"
          :setEducationIndex="setEducationIndex"
          :educationList="userDatas.education"
          @putEducationList="putEducationList"
          @postEducationList="postEducationList"
          ></editeducation>
          <!--  个人证书 -->
          <div class="certificateBox" v-show="set_certificate_type">
            <div class="list_title" >
              <div>个人证书</div>
              <div class="cur" @click="addCertificate">添加</div>
            </div>
            <div class="main">
              <div class="main_list">
                <div class="tag" v-for="item in userDatas.certificateList">{{item.name}}</div>
              </div>
              <div class="Icon cur"  @click="addCertificate">&#xe8ac;编辑</div>
            </div>
          </div>
          <!-- 编辑个人证书 -->
          <editcertificate v-show="!set_certificate_type" @postCertificate="postCertificate" @downCertificate="downCertificate"></editcertificate>
          <!-- 社交主页 -->
          <div class="serverBox" v-show="set_url_type">
            <div class="list_title" >
              <div>个人主页</div>
              <div class="cur" @click="addUrl">添加</div>
            </div>
            <div class="main" v-for="(item,index) in userDatas.userUrlList">
              <div class="server_list">
                {{item.url}}
              </div>
              <div class="server_list_right">
                <div class="Icon cur"  @click="deleteUrl(item,index)">&#xe8ac;删除</div>
                <div class="Icon cur"  @click="putUrl(item,index)">&#xe8ac;编辑</div>
              </div>
            </div>
          </div>
          <!-- 编辑个人优势 -->
          <div class="list" v-show="!set_url_type">
            <div class="set_title">社交主页 </div>
            <input type="text" class="server_input" placeholder="例如:www.xx.com" v-model="url">
            <div class="save_box">
              <div class="save" @click="saveUrl">保存</div>
              <div class="cancel">取消</div>
            </div>
          </div>
        </div>

        <!-- 内容区域左边 -->
        <div class="main_right">

        </div>

    </div>

</div>
</template>



<script>
  // import aaa from '../../common/request/request.js'
    //顶部区域
    import headers from '@/components/header.vue'
    //组件
    import expect from '@/components/resume/expect.vue'
    import editexpect from '@/components/resume/editexpect.vue'
    import setdata from '@/components/resume/setdata.vue';
    import mydata from '@/components/resume/mydata.vue';
    import project from '@/components/resume/project.vue'
    import editproject from '@/components/resume/editproject.vue'
    import education from '@/components/resume/education.vue'
    import editeducation from '@/components/resume/editeducation.vue'
    import wrok from '@/components/resume/work.vue'
    import editwork from '@/components/resume/editwork.vue'
    import editcertificate from '@/components/resume/editcertificate.vue'
    import { mapState, mapMutations } from 'vuex';
    // import toasts from '../../common/util/toast.js'
    export default{
        computed: {
		    //Vuex
		    ...mapState(['userDetails','userDatas','jobTitleLists']),

        },
        components: {
		    //组件
            setdata,mydata,project,editproject,education,editeducation,wrok,editwork,editcertificate,headers,expect,editexpect
        },

        data(){
            return{
              loading: true,//加载提示状态
              set_data_type:true,//编辑个人资料修改功能开关状态
              set_expect_type:true,//编辑个人求职期望开关
              setWork_type:true,//编辑个人工作经历的开关
              set_project_type:true,//编辑项目经历模板出现的开关状态
              set_education:true,//控制编辑学校经历模板开关状态
              set_url_type:true,//编辑个人主页开关
              set_certificate_type:true,//控制编辑简历模板出现开关
              advantageVal:'',//优势的值
              advantageType:true,//编辑个人优势修改功能开关状态
              deleteProjectType:false,//v-loading提示的开关
              setProjects:'',//控制编辑项目经历模板是post put
              setProjectIndex:null,//控制编辑项目经历模板是put时要更新的项目的下标传过去（点击项目经历组件的编辑按钮后，会将下标传过来存给该参，通过该参将他传到编辑模板里去拿到对应的数据进行删除 ）
              setWork:'',//控制编辑工作经历是post 还是 put
              setWorkIndex:null,//控制编辑工作经历模板是put时要更新的项目的下标传过去
              setEducations:"",//控制编辑教育经历是post 还是put
              setEducationIndex:null,//要编辑哪个教育经历的下标
              setExpects:'',//控制编辑求职期望是post 还是put
              setExpectIndex:null,//要编辑求职期望的下标
              setUrl:'',//个人主页是添加还是更新
              url:''
            }
        },
        created(){
          // console.log(2%2)
          // console.log(1%2)
          // console.log(4%2)
          // console.log(3%2)
        },
        methods:{
          ...mapMutations(['setUserDatas']),
          setExpectType(){
            this.set_expect_type = !this.set_expect_type
          },
          addExpect(){//点击添加求职期望
            this.setExpects = 'post'
            this.setExpectType()
          },
          postExpect(){//保存求职期望的回调
            console.log('--保存求职期望--')
            this.setExpectType()
          },
          putExpect(index){
            console.log('--编辑第'+index+'条求职期望--')
            this.setExpects = 'put'
            this.setExpectIndex = index
            this.setExpectType()
          },
          deleteExpect(index){//删除求职期望
            console.log(index)
          },
          putExpectList(){
            console.log('更新求职期望的回调')
            this.setExpectType()
          },
          setDataType(){//开启编辑功能
            this.set_data_type = !this.set_data_type
          },
          setData(){//点击编辑出现个人资料(姓名等)修改
            this.setDataType()
          },
          setDataCancel(){//取消编辑个人资料
            this.setDataType()
          },
          setDataSave(obj){//保存个人资料
            console.log(obj)
            this.setDataType()
          },
          setWorkType(){//控制工作经历还是编辑工作经历组件出现
            this.setWork_type = !this.setWork_type
          },
          addWork(){//点击工作经历的添加按钮
            this.setWork = 'post'
            this.setWorkType()
          },
          deleteWork(index){//删除某个工作经历
            console.log(index+'删除')
          },
          setWorkList(index){//编辑某个工作经历
            console.log(index+'编辑')
            this.setWork = 'put'
            this.setWorkIndex = index
            this.setWorkType()
          },
          setAdvantage(){//个人优势还是编辑个人优势模板出现
            this.advantageType = !this.advantageType
          },
          deleteProject(index){//删除该项目经历
            this.deleteProjectType = true
            setTimeout(()=>{
              let projectList = this.userDatas.projectList
              projectList.splice(index,1)
              const arr = {
                projectList:projectList,
                index:2
              }
              this.setUserDatas(arr) //传入redux
              this.deleteProjectType = false
              this.toasts('删除成功')
            },2000)

          },
          setProject(index){//点击要编辑的项目
            console.log(index)
            this.setProjects = 'put'
            this.setProjectIndex = index
            this.setProjectType()
          },
          setProjectType(){
            this.set_project_type = !this.set_project_type
          },
          addProject(){//点击项目经历添加按钮
            this.setProjects = 'post'
            this.setProjectType()
          },
          postWork(obj){//工作经历保存事件
            console.log(obj)
            console.log('保存工作经历')
            this.setWorkType()
          },
          putWork(obj){//更新某个经历
            console.log(obj)
            console.log('--更新项目经历--')
            this.setWorkType()
          },
          postProject(obj){//项目经历添加新项目事件
            this.setProjectType()
            console.log('post事件',obj)
          },
          putProject(obj){//更新项目经历事件
            this.setProjectType()
            console.log('put事件',obj)
          },
          setEducation(){
            this.set_education = !this.set_education
          },
          addEducation(){//点击添加教育经历事件
            this.setEducations = 'post'
            this.setEducation()
          },
          putEducation(index){//编辑哪个教育经历
            this.setEducations = 'put'
            this.setEducationIndex = index
            this.setEducation()
          },
          putEducationList(obj){//更新教育教育经历
            // console.log(obj)
            console.log('--更新教育经历--')
            this.setEducation()
          },
          postEducationList(obj){
            // console.log(obj)
            console.log('--保存教育经历--')
            this.setEducation()
          },
          setCertificateType(){//控制编辑证书模板出现
            this.set_certificate_type = !this.set_certificate_type
          },
          addCertificate(){//点击添加证书按钮
            this.setCertificateType()
          },
          postCertificate(){//点击保存证书后的时间
            this.setCertificateType()
          },
          downCertificate(){//点击关闭
            this.setCertificateType()
          },
          setUrlType(){
             this.set_url_type = !this.set_url_type
          },
          addUrl(){
            this.setUrl = 'post'
            this.url = ''
            this.setUrlType()
          },
          saveUrl(){
            console.log(this.setUrl+'主页')
            this.setUrlType()
          },
          deleteUrl(item,index){
            console.log('删除求职期望')
            console.log(item,index)
          },
          putUrl(item,index){
            console.log('更新求职期望')
            console.log(item,index)
            this.setUrl = 'put'
            this.url = item.url
            this.setUrlType()
          }
        }
    }

</script>


<style scoped>
.cur{cursor: pointer;}
/* .el-select{width: 300px !important;} */
/* .input_border input{border: 1px solid #00C982 !important; ;} */


/* 内容区域 */

#main{width: 1100px;margin: 20px auto;display: flex;justify-content: space-between}
#main .main_lefe{width: 850px;background-color: white;}
/* 公用标题 和修改功能标题 */
#main .main_lefe .list {width: 800px;margin: 0 auto;border-bottom: 1px solid #eeeeef;margin-bottom: 20px;}
#main .main_lefe .list .set_title{font-size: 16px;padding:20px 0;}
#main .main_lefe .list .list_title{font-size: 16px;border-left: 3px solid #00C982;line-height: 20px;padding-left: 10px;display: flex;align-items: center;justify-content: space-between;}
/* 个人优势 */
#main .main_lefe .list .list_advantage_box{display: flex;justify-content: space-between;}
#main .main_lefe .list .list_advantage_text{font-size: 14px;margin-top: 20px;margin-bottom: 20px;width: 600px;}
#main .main_lefe .list .list_advantage_box .set{color: #00C982;font-size: 14px;width: 80px;text-align: center;font-weight: bold;cursor: pointer;}
#main .main_right{width: 220px;height: 80px;background-color: white}


/* 保存取消按钮 */
.save_box{display: flex;align-items: center;}
.save_box .save,.cancel{width: 100px;height: 40px;line-height: 40px;border: 1px solid #00C982;margin: 20px 20px 20px 0;text-align: center;cursor: pointer;}
.save{background-color: #00C982;color: white;}

/* 个人整数 */
.certificateBox{width: 800px;margin: 0 auto;margin-bottom: 20px;border-bottom: 1px solid #eeeeef;}
.certificateBox .list_title{font-size: 16px;margin-bottom: 20px;border-left: 3px solid #00C982;line-height: 20px;padding-left: 10px;display: flex;align-items: center;justify-content: space-between;height: 20px;}
.certificateBox .Icon{color: #00C982;margin-left: 20px;}
.certificateBox .main{display: flex;}
.certificateBox .main .main_list{flex: 2;}
.certificateBox .main .main_list .tag{border: 1px solid #CCCCCC;display: inline-block;padding: 2px 5px;border-radius: 2px;margin-right: 10px;margin-bottom: 10px;}
/* 社交主页 */
.serverBox{width: 800px;margin: 0 auto;margin-bottom: 20px;}
.serverBox .list_title{font-size: 16px;margin-bottom: 20px;border-left: 3px solid #00C982;line-height: 20px;padding-left: 10px;display: flex;align-items: center;justify-content: space-between;height: 20px;
}
.serverBox .main{display: flex;justify-content: space-between;margin-bottom:20px;}
.serverBox .server_list_right{display: flex;align-items: center;}
.serverBox .Icon{color: #00C982;margin-left: 20px;}
/* 编辑社交主页input */
.server_input{width: 700px;height: 40px;}

</style>
