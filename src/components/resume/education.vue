<template>
    <div class="box">
            <div class="list_title" >
              <div>教育经历</div>
              <div class="cur" @click="add">添加</div>
            </div>
            <div class="list" v-for="(item,index) in  educationList">
                <div class="list_top">
                    <div class="flex">
                        <div class="list_top_title">{{item.school}}</div>
                        <div class="list_top_time">2019-2030</div>
                    </div>
                    <div class="flex">
                        <div class="Icon cur" @click="deletes(index)">&#xe8e1;删除</div>
                        <div class="Icon cur" @click="sets(index)">&#xe8ac;编辑</div>
                    </div>
                </div>
                <div class="other">
                    <div class="major">计算机网络技术</div>
                    <div class="education">大专</div>
                </div>
            </div>
    </div>
</template>

<script>
  export default{
      props:{
        educationList:Array
      },
    data(){
      return{
        data:[{},{}],
        type:false
      }
    },
    created(){
        this.data = this.projectList
    },
    methods:{
      add(){
        this.$emit('addEducation')
      },
      deletes(index){
        console.log(index)
        this.$emit('deleteEducation',index)
      },
      sets(index){
        this.$emit('putEducation',index)
      }
    },
    watch:{

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
.content_text{margin: 20px 0;}
.other{display: flex;margin-bottom: 20px;font-weight: bold;}
.other .major{margin-right: 20px;}
</style>
