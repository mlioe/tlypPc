<template>
  <div>
    <div class="set_data">
      <div class="title">管理工作经历</div>
      <div class="set_data_box">
        <div class="list">
          <div class="list_title">公司名称</div>
          <input type="text" v-model="company_name" placeholder="例如:湛江牛牛科技有限公司">
        </div>
        <div class="list">
          <div class="list_title">所属行业</div>
          <div class="list_select" @click="setIndustryType()">
            <div class="list_select_tip" v-show="industry == ''">请选择所属行业</div>
            <div class="list_select_content" v-show="industry!=''">{{industry}}</div>
          </div>
        </div>
        <div class="list">
          <div class="list_title">所属部门</div>
          <input type="text" v-model="department" placeholder="请选择所属部门">
        </div>
        <div class="list">
          <div class="list_title">职位名称(选填)</div>
          <input type="text" v-model="project_role" placeholder="例如:室内设计师">
        </div>
        <div class="list">
          <div class="list_title">职位类型</div>
          <div class="list_select" @click="setPositionType()">
            <div class="list_select_tip" v-show="work_postion == ''">请选择职位类型</div>
             <div class="list_select_content" v-show="work_postion!=''">{{work_postion}}</div>
          </div>
        </div>
        <div class="list">
          <div class="list_title">在职时间</div>
          <el-date-picker v-model="times" type="monthrange" range-separator="至" start-placeholder="开始月份" value-format="yyyy.MM"
            end-placeholder="结束月份">
          </el-date-picker>
        </div>
        <div class="list_textarea">
          <div class="list_textarea_title">工作描述</div>
          <el-input type="textarea" placeholder="请输入内容" v-model="project_description" maxlength="300" show-word-limit
            size="medium">
          </el-input>
        </div>
        <div class="list_textarea">
          <div class="list_textarea_title">工作业绩</div>
          <el-input type="textarea" placeholder="请输入内容" v-model="project_achievement" maxlength="300" show-word-limit
            size="medium">
          </el-input>
        </div>
      </div>

      <div class="save_box">
        <div class="save" @click="save">保存</div>
        <div class="cancel" @click="cancels">取消</div>
      </div>
      <!-- 所属行业 -->
      <div class="position_mask" v-show="industry_type">
        <div class="position_box">
          <div class="position_box_header">
            <div class="">请选择行业类型</div>
            <div style="cursor: pointer;" @click="setIndustryType()">X</div>
          </div>
          <div class="position_box_mian">
            <div class="main_list">
              <div class="mian_list_left">
                <div
                  class="main_list_title"
                  :style="index == list_index ? 'color:#00C982':''"
                  v-for="(item,index) in list"
                  :key="index"
                  @click="industryListClick(index)"
                  >
                  {{item.name}}
                </div>
              </div>
              <div class="mian_list_right">
                <div class="main_list_son_list">
                  <!-- <div class="son_list_title">
                    {{item.name}}
                  </div> -->
                  <div class="son_list_box">
                    <div class="list"
                    v-for="item in list[list_index].subLevelModelList"
                    @click="industrySonClick(item)"
                    >
                      {{item.name}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 职位类型 -->
      <div class="position_mask" v-show="position_type">
        <div class="position_box">
          <div class="position_box_header">
            <div class="">请选择职位类型</div>
            <div style="cursor: pointer;" @click="setPositionType()">X</div>
          </div>
          <div class="position_box_mian">
            <div class="main_list">
              <div class="mian_list_left">
                <div class="main_list_title"
                  v-for="(item,index) in position_list"
                  :style="index == position_index ? 'color:#00C982':''"
                  @click="positionListClick(index)"
                >
                  {{item.title}}
                </div>
              </div>
              <div class="mian_list_right">
                <div class="main_list_son_list" v-for="(item,index) in position_list[position_index].tabList">
                  <div class="son_list_title">
                   {{item.name}}
                  </div>
                  <div class="son_list_box">
                    <div class="list" v-for="(item2,index2) in item.tabList"
                      @click="positionSonClick(item2)"
                    >
                      {{item2.name}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import jobList from '../../common/json/jobs.json'
  import industry from '../../common/json/industry.json'
  export default {
    name: 'editproject',
    props: {
      setWork: String,//告诉组件是新增还是更新
      workListIndex: Number,//告诉组件修改的数据的下标
      workList: Array,//要修改的数据的数组
    },
    data() {
      return {
        company_name:'',
        industry:'',
        department:'',
        times:['',''],
        list: [],
        list_index: 0,
        industry_type:false,
        position_type: false,//蒙版
        project_description:'',
        project_achievement:'',
        project_role:"",
        position_list:[],
        position_index:0,
        work_postion:'',
        resume_id:''
      }
    },
    created() {
      //处理json
      let list = []
      const arr = this.build_tree(0) //处理后端导出的json，改成3级数组
      arr.map(item => { //默认是3级，所以没有递归
        // console.log(item)
        let childeren = []
        item.children.map(item2 => {
          // console.log(item2)
          let childeren2 = []
          item2.children.map(item3 => {
            // console.log(item3)
            childeren2.push({
              name: item3.categoryname,
            })
          })
          childeren.push({
            name: item2.categoryname,
            tabList: childeren2
          })
        })
        list.push({
          title: item.categoryname,
          tabList: childeren
        })
      })
      //当时搞错类型了,应该this.position_list = position_list ，时间紧没有将变量名改了
      this.list = industry.zpData//行业类型
      this.position_list = list//职位类型
    },
    methods: {
      workTimeChange(e) {
        // console.log(e)
      },
      cancels() {

      },
      save() {
        const obj = {
        	resume_id:this.resume_id,
        	company_name:this.company_name,
          industry:this.industry,
          time:this.times[0]+','+this.times[1],
          project_description:this.project_description,
          project_achievement:this.project_achievement,
          project_role:this.project_role,
          work_postion:this.work_postion
        };
        // console.log(obj)
        // console.log(this.set_work)
        if(this.setWork == 'put'){
          this.$emit('putWork',obj)
        }else{//新增事件
          this.$emit('postWork',obj)
        }

        // if(this.set_project == 'put'){//更新事件
        //   this.$emit('putProject',obj)
        // }else{//新增事件
        //   this.$emit('postProject',obj)
        // }
      },
      setWorkType() {
        console.log(this.setWork)
        if(this.setWork == 'put'){

          this.company_name = this.workList[this.workListIndex].company_name
        }else{//清空
          this.company_name = ''
        }
        // console.log(this.set_project)
        // console.log(this.set_project_index)
        // console.log(this.project_list[this.set_project_index])
        // const data = this.project_list[this.set_project_index]
        // if(this.set_project == 'put'){
        //   this.project_name = data.name
        // }else{//post清空
        //   this.nickname = ''
        //   this.times = ['','']
        //   this.resume_id = ''
        //   this.project_name = ''
        //   this.project_role = ''
        //   this.project_achievement = ''
        //   this.project_description = ''
        //   this.project_url = ''
        // }
      },
      setPositionType() { //职位的蒙版
        this.position_type = !this.position_type
      },
      setIndustryType(){//行业蒙版
        this.industry_type = !this.industry_type
      },
      industryListClick(index){//切换行业下标
        this.list_index = index
      },
      industrySonClick(item){//点击行业
        this.setIndustryType()
        this.industry = item.name
      },
      positionListClick(index){//职位类型下标切换
        this.position_index = index
      },
      positionSonClick(item){//点击职位
        this.work_postion = item.name
        this.setPositionType()
      },
      findChild(arr, id) { //处理json
        let childs = [];
        jobList['RECORDS'].forEach(v => {
          if (v.parentid == id) {
            childs.push(v);
          }
        });
        return childs;
      },
      build_tree(id) { //处理json
        let childs = this.findChild(jobList['RECORDS'], id);
        if (childs.length == 0) {
          return null;
        }
        // 对于父节点为0的进行循环，然后查出父节点为上面结果id的节点内容
        childs.forEach((v, k) => {
          let buildTree = this.build_tree(v.id);
          if (buildTree != null) {
            v['children'] = buildTree;
          }
        });
        return childs;
      },
    },
    watch: {
      setWork() { //监听父组件是要求更新还是添加
        this.setWorkType()
      },
      workListIndex(){
        this.setWorkType()
      }
    }
  }
</script>

<style scoped>
  .set_data {
    width: 800px;
    margin: 20px auto;
    border-bottom: 1px solid #EEEEEF;
  }

  .set_data .title {
    font-size: 16px;
    padding: 20px 0;
  }

  .set_data .set_data_box {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .set_data .set_data_box .list {
    width: 50%;
  }
  .set_data .set_data_box .list input{
    font-size: 14px;
  }
  .set_data .set_data_box .list .list_title {
    font-size: 14px;
    padding: 10px 0;
  }

  .set_data .set_data_box .list .list_select {
    width: 300px;
    height: 40px;
    border: 1px solid #00C982;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .list_select_tip {
    height: 38px;
    line-height: 38px;
    color: #808080;
    font-size: 14px;
  }
  .list_select_content{
    height: 38px;
    line-height: 38px;
    font-size: 14px;
  }
  .set_data .set_data_box .list input {
    height: 40px;
    width: 300px;
  }

  .set_data .save_box {
    display: flex;
    align-items: center;
  }

  .set_data .save_box .save,
  .cancel {
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #00C982;
    margin: 20px 20px 20px 0;
    text-align: center;
    cursor: pointer;
  }

  .save {
    background-color: #00C982;
    color: white;
  }

  .list_textarea {
    width: 700px;
  }

  .list_textarea .list_textarea_title {
    font-size: 16px;
    padding: 20px 0;
  }

  .position_mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .position_box {
    width: 850px;
    height: 500px;
    background-color: white;
  }

  .position_box_header {
    height: 60px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid #EEEEEF;
  }

  .position_box_mian {
    width: 100%;
    height: 440px;
    overflow: auto;
  }

  .position_box_mian .main_list {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .position_box_mian .mian_list_left {
    height: 440px;
    overflow: auto;
  }

  .position_box_mian .main_list_title {
    width: 250px;
    display: flex;
    align-items: center;
    color: #808080;
    height: 40px;
    padding-left: 30px;
    cursor: pointer;
  }

  .position_box_mian .mian_list_right {
    flex: 2;
    border-left: 1px solid #EEEEEF;
    height: 440px;
    overflow: auto;
  }

  .position_box_mian .main_list_son_list {
    width: 100%;
  }

  .position_box_mian .son_list_title {
    padding: 10px;
    color: #00C982;
  }

  .position_box_mian .son_list_box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .position_box_mian .son_list_box .list {
    width: 50%;
    height: 40px;
    padding-left: 10px;
    line-height: 40px;
    box-sizing: border-box;
    cursor: pointer;
  }
</style>
