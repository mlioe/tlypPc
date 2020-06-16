<template>
  <div>
    <div class="set_data">
      <div class="title">教育经历 </div>
      <div class="set_data_box">
        <div class="list">
          <div class="list_title">学校名称</div>
          <div style="position: relative;">
            <input type="text" v-model="school_name">
          <!--  <div class="select_box">
              <div class="select_box_list">广州工商学院广州工商学院广州工商学院</div>
              <div class="select_box_list">广州工商学院</div>
            </div> -->
          </div>
        </div>
        <div class="list">
          <div class="list_title">专业</div>
          <input type="text" v-model="major">
        </div>
        <div class="list">
          <div class="list_title">时间</div>
          <el-date-picker v-model="times" type="monthrange" range-separator="至" start-placeholder="开始月份"
          value-format="yyyy-MM"  end-placeholder="结束月份">
          </el-date-picker>
        </div>
        <div class="list">
          <div class="list_title">学历</div>
          <el-select v-model="educationVal" placeholder="请选择" class="input_border">
              <el-option
                v-for="item in educationArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
          </el-select>
        </div>

        <div class="list_textarea">
          <div class="list_textarea_title">在校经历</div>
          <el-input type="textarea" placeholder="请输入内容" v-model="school_experience" maxlength="300" show-word-limit size="medium">
          </el-input>
        </div>
      </div>

      <div class="save_box">
        <div class="save" @click="save">保存</div>
        <div class="cancel" @click="cancels">取消</div>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'editeducation',
    props:{
      setEducations:String,
      setEducationIndex:Number,
      educationList:Array
    },
    data() {
      return {
        school_name:'',
        school_experience:'',//学校经历
        major:'',
        educationArr:[
          {
            value: '初中及以下',
            label: '初中及以下'
          },
          {
            value: '中专/中技',
            label: '中专/中技'
          },{
            value:'高中',
            label: '高中'
          },{
            value:'大专,全日制',
            label: '大专,全日制'
          },{
            value:'大专,非全日制',
            label: '大专,非全日制'
          },{
            value:'本科,全日制',
            label: '本科,全日制'
          },{
            value:'本科,非全日制',
            label: '本科,非全日制'
          },{
            value:'硕士,全日制',
            label: '硕士,全日制'
          },{
            value:'硕士,非全日制',
            label: '硕士,非全日制'
          },{
            value:'博士,全日制',
            label: '博士,全日制'
          },{
            value:'博士,非全日制',
            label: '博士,非全日制'
          },

        ],
        educationVal:'',
        times:'',
        resume_id:'',
        id:''
      }
    },
    created(){
    },
    methods: {
      workTimeChange(e) {
        console.log(e)
      },
      cancels() {

      },
      save() {
        const obj = {
        	resume_id:this.resume_id,
        	id:this.id,
          school_name:this.school_name,
          major:this.major,
          school_experience:this.school_experience,
          education:this.educationVal,
          school_time:this.times[0]+','+this.times[1],
          school_id:''
        };
        // console.log(obj)
        if(this.setEducations == 'put'){//更新事件
          this.$emit('putEducationList',obj)
        }else{//新增事件
          this.$emit('postEducationList',obj)
        }
      },
      set_edu(){
        // console.log(this.setEducations)
        if(this.setEducations == 'post'){
          this.school_name = ''
        }else{
          console.log(this.setEducationIndex)
          console.log(this.educationList[this.setEducationIndex])
          this.school_name = this.educationList[this.setEducationIndex].school
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
      }
    },
    watch:{
        setEducationIndex(){//监听父组件是要求更新还是天剑
            this.set_edu()
        },
        setEducations(){
            this.set_edu()
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
  .select_box{
    position: absolute;
    top: 40px;
    width: 298px;
    height: 200px;
    background-color: white;
    z-index: 10;
    overflow: auto;
    box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
  }
  .select_box_list{
    width:280px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    padding-left: 10px;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
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

  .set_data .set_data_box .list .list_title {
    font-size: 14px;
    padding: 10px 0;
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
</style>
