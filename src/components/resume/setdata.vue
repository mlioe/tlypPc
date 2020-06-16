<template>
  <div>
    <div class="set_data">
        <div class="title">编辑个人信息 </div>
        <div class="set_data_box">
            <div class="list">
              <div class="list_title">姓名</div>
              <input type="text" v-model="name">
            </div>
            <div class="list">
              <div class="list_title">昵称</div>
              <input type="text" v-model="nickname">
            </div>
            <div class="list">
              <div class="list_title">微信号</div>
              <input type="text" v-model="wechat">
            </div>
            <div class="list">
              <div class="list_title">求职身份</div>
              <el-select v-model="identityVal" placeholder="请选择" class="input_border">
                  <el-option
                    v-for="item in identityArr"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
              </el-select>
            </div>
            <div class="list">
              <div class="list_title">性别</div>
              <el-select v-model="value" placeholder="请选择" class="input_border">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
              </el-select>
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
            <div class="list">
              <div class="list_title">出生日期</div>
              <el-date-picker
                v-model="birthday"
                type="month"
                placeholder="请选择"
                value-format="yyyy-MM" 
                >
              </el-date-picker>
            </div>
            <div class="list">
              <div class="list_title">工作时间</div>
              <el-date-picker
                    v-model="start_work_time"
                    type="date"
                    placeholder="请选择"
                    value-format="yyyy-MM-dd"    
              >
              </el-date-picker>
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
  export default{
    name:'setdata',
    data(){
      return{
        options: [{
          value: '0',
          label: '女'
        }, {
          value: '1',
          label: '男'
        }],
        value: '',
        identityArr:[{
          value: '职场人',
          label: '职场人'
        },{
          value: '学生',
          label: '学生'
        }],
        identityVal:'',
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
        birthday:'',
        start_work_time:'',
        name:'',
        nickname:'',
        wechat:''
      }
    },
    methods:{
      workTimeChange(e){
        console.log(e)
      },
      cancels(){
        this.$emit('setDataCancel')
      },
      save(){
        console.log(this.birthday)
        console.log(this.start_work_time)
        let obj = {
          sex: this.value ,
          identity: this.identityVal,
          name: this.name,
          birthday: this.birthday,
          start_work_time: this.start_work_time,
          nickname:this.nickname,
          wechat:this.wechat,
          education:this.educationVal,
        }
        this.$emit('setDataSave',obj)
      }
    }
  }
</script>

<style scoped>
.set_data{width: 800px;margin: 20px auto;border-bottom: 1px solid #EEEEEF;}
.set_data .title{font-size: 16px;padding:20px 0;}
.set_data .set_data_box{width: 100%;display: flex;align-items: center;flex-wrap: wrap;}
.set_data .set_data_box .list{width: 50%;}
.set_data .set_data_box .list .list_title{font-size: 14px;padding: 10px 0;}
.set_data .set_data_box .list input{height: 40px;width: 300px;}
.set_data .save_box{display: flex;align-items: center;}
.set_data .save_box .save,.cancel{width: 100px;height: 40px;line-height: 40px;border: 1px solid #00C982;margin: 20px 20px 20px 0;text-align: center;cursor: pointer;}
  .save{background-color: #00C982;color: white;}
</style>
