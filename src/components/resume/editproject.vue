<template>
  <div>
    <div class="set_data">
      <div class="title">管理项目经历 </div>
      <div class="set_data_box">
        <div class="list">
          <div class="list_title">项目名称</div>
          <input type="text" v-model="project_name">
        </div>
        <div class="list">
          <div class="list_title">担任角色</div>
          <input type="text" v-model="project_role">
        </div>
        <div class="list">
          <div class="list_title">项目时间</div>
          <el-date-picker v-model="times" type="monthrange" range-separator="至" start-placeholder="开始月份"
          value-format="yyyy.MM"  end-placeholder="结束月份">
          </el-date-picker>
        </div>
        <div class="list">
          <div class="list_title">项目链接</div>
          <input type="text" v-model="project_url">
        </div>
        <div class="list_textarea">
          <div class="list_textarea_title">项目描述</div>
          <el-input type="textarea" placeholder="请输入内容" v-model="project_description" maxlength="300" show-word-limit size="medium">
          </el-input>
        </div>
        <div class="list_textarea">
          <div class="list_textarea_title">项目业绩</div>
          <el-input type="textarea" placeholder="请输入内容" v-model="project_achievement" maxlength="300" show-word-limit size="medium">
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
    name: 'editproject',
    props:{
      set_project:String,
      setProjectIndex:Number,
      project_list:Array
    },
    data() {
      return {
        nickname: '',
        times: ['',''],
        resume_id:'',
        project_name:'',
        project_role:'',
        project_description:'',
        project_achievement:'',
        project_url:''
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
        	project_name:this.project_name,
        	project_role:this.project_role,
        	project_time:this.times[0]+','+this.times[1],
        	project_description:this.project_description,//描述
        	project_achievement:this.project_achievement,//业绩
        	project_url:this.project_url
        };
        if(this.set_project == 'put'){//更新事件
          this.$emit('putProject',obj)
        }else{//新增事件
          this.$emit('postProject',obj)
        }
      },
      setProjectListArr(){
        // console.log(this.set_project)
        // console.log(this.set_project_index)
        // console.log(this.project_list[this.set_project_index])
        const data = this.project_list[this.setProjectIndex]
        if(this.set_project == 'put'){
          this.project_name = data.name
        }else{//post清空
          this.nickname = ''
          this.times = ['','']
          this.resume_id = ''
          this.project_name = ''
          this.project_role = ''
          this.project_achievement = ''
          this.project_description = ''
          this.project_url = ''
        }
      }
    },
    watch:{
        set_project(){//监听父组件是要求更新还是添加
            this.setProjectListArr()
        },
		setProjectIndex(){
			this.setProjectListArr()
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
  .set_data .set_data_box input {
    font-size: 14px;
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
