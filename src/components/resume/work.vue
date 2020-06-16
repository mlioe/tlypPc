<template>
    <div class="box">
            <div class="list_title" >
              <div>工作经历</div>
              <div class="cur" @click="add">添加</div>
            </div>
            <div class="list" v-for="(item,index) in data" :key="item.company_name">
                <div class="list_top">
                    <div class="flex">
                        <div class="list_top_title">{{item.company_name}}</div>
                        <div class="list_top_time">2019-20</div>
                    </div>
                    <div class="flex">
                        <div class="Icon cur" @click="deletes(index)">&#xe8e1;删除</div>
                        <div class="Icon cur" @click="sets(index)">&#xe8ac;编辑</div>
                    </div>
                </div>
                <div class="position">
                  <div class="position_tag">技术部</div>
                  <div class="position_tag">web前端</div>
                  <div class="position_tag border_none">HTML5</div>
                </div>
                <div class="content">
                    <span>内容</span>: <br>
                    <div class="content_text">
                        项目描述：用于医生对患者诊后咨询，问诊，开方，邀请患者，积分提现 等<br>
                        项目职责：<br>
                        ● 根据设计图开发app模块页面<br>
                        ● 根据后端接口和后端进行功能对接<br>
                        ● 根据反馈进行页面优化<br>
                    </div>
                </div>
                <div class="content">
                    <span>业绩</span>: <br>
                    <div class="content_text">
                        项目描述：用于医生对患者诊后咨询，问诊，开方，邀请患者，积分提现 等<br>
                        项目职责：<br>
                        ● 根据设计图开发app模块页面<br>
                        ● 根据后端接口和后端进行功能对接<br>
                        ● 根据反馈进行页面优化<br>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
  export default{
      props:{
        workList:Array,//post put告诉项目是更新还是新增
      },
    data(){
      return{
        data:[],
        type:false
      }
    },
    created(){
        this.data = this.workList
    },
    methods:{
      deletes(index){
          this.$emit('deleteWork',index)
      },
      sets(index){
          this.$emit('setWorkList',index)
      },
      setProjectListArr(){

      },
      add(){
        this.$emit('addWork')
      }
    },
    watch:{
        projectList(){
            // this.setProjectListArr()
        }
    }
  }
</script>

<style scoped>
.cur{cursor: pointer;}
.flex{display: flex;align-items: center;}
.box {width: 800px;margin: 0 auto;margin-bottom: 20px;border-bottom: 1px solid #eeeeef;}
.list_title{font-size: 16px;margin-bottom: 20px;border-left: 3px solid #00C982;line-height: 20px;padding-left: 10px;display: flex;align-items: center;justify-content: space-between;height: 20px;}
.list_top{margin-top: 20px;display: flex;align-items: center;justify-content: space-between}
.list_top_title{font-size: 16px;font-weight: bold;height: 50px;line-height: 50px;}
.list_top_time{font-size: 12px;color: #808080;margin-left: 20px;height: 50px;line-height: 50px;}
.Icon{color: #00C982;margin-left: 20px;}
.position{font-size: 14px;margin: 20px 0;display: flex;align-items: center;}
.position_tag{border-right: 2px solid #EEEEEF;padding-right: 20px;margin-right: 20px;}
.border_none{border: none;}
.content{font-size: 14px;}
.content span{font-weight: bold;}
.content_text{margin: 20px 0;}
</style>
