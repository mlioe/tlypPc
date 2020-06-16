<template>
  <div class="mask">
    <div class="box">
        <div class="box_header">
          <div class="">请选择职位类型   <span style="color: #00C982;padding-left: 30px;font-size: 14px;">2/30</span> </div>
          <div style="cursor: pointer;" @click="cancel">X</div>
        </div>
        <div class="box_select">
          <div class="box_select_left">
            <div class="tag" v-for="(item,index) in selectArr" :key="index" @click="deleteSelect(index)">{{item.name}} <span style="color: #EEEEEF;font-size: 12px;">X</span> </div>
<!--            <div class="tag">英语4级 <span style="color: #EEEEEF;font-size: 12px;">X</span> </div>
            <div class="tag">英语4级 <span style="color: #EEEEEF;font-size: 12px;">X</span> </div>
            <div class="tag">英语4级 <span style="color: #EEEEEF;font-size: 12px;">X</span> </div> -->
          </div>
          <div class="box_select_right" @click="save">确认</div>
        </div>
        <div class="box_main">
            <div class="list_box" v-for="(item,index) in certificateList">
              <div class="list_box_left">
                {{item.name}}
              </div>
              <div class="list_box_right">
                <div class="tag"
                  v-for="(item2,index2) in item.children"
                  :style="{'order':index2}"
                  :class="selectArrName.includes(item2.name) ? 'active':''"
                  @click="tagClick(index,index2)"
                >
                  {{item2.name}}
                </div>
                <div
                  class="tag_son_box"
                  :class="sonListIndex == index ? '':'displayNone'"
                  :style="{'order':tagSonBoxIndex}"
                >
                  <div style="width: 100%;padding: 10px;">证书层次</div>
                  <div class="tag"
                  v-for="item in tagSonBoxList"
                  :key="item.name"
                  @click="sonTagClick(item)"
                  :class="selectArrName.includes(item.name) ? 'active':''"
                  >{{item.name}}</div>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import insff from '../../common/json/new_file.json'
  export default{
    data(){
      return{
        certificateList:[
        ],
        sonListIndex:null,
        tagSonBoxIndex:null,
        tagSonBoxList:[],
        selectArr:[],
        selectArrName:[]
      }
    },
    created(){
      this.certificateList = insff
    },
    methods:{
      cancel(){
         this.$emit('downCertificate')
      },
      save(){
        console.log(this.selectArr)
        this.$emit('postCertificate')
      },
      deleteSelect(index){
        this.selectArr.splice(index,1)
        this.selectArrName.splice(index,1)
      },
      sonTagClick(item){
        this.selectArr.push(item)
        this.selectArrName.push(item.name)
      },
      tagClick(index,index2){
        let obj = this.certificateList[index].children[index2]
        // console.log(obj.name)
        if(this.selectArrName.includes(obj.name)){ //判断点击的是否在选择项中
          // console.log('在选择项中')
          // console.log(this.selectArrName.indexOf(obj.name))
          const deleteIndex = this.selectArrName.indexOf(obj.name)//拿到删除的下标
          this.selectArr.splice(deleteIndex,1)
          this.selectArrName.splice(deleteIndex,1)
          return
        }
        const type = 'children' in obj
        if(type){//判断有无children,有则展开
          this.sonListIndex = index
          if(index2%2 == 0){
            this.tagSonBoxIndex = index2+1
          }else{
            this.tagSonBoxIndex = index2
          }
          this.tagSonBoxList = obj.children

        }else{
          this.sonListIndex = null
          this.selectArr.push(obj)
          this.selectArrName.push(obj.name)
        }
      }
    }
  }
</script>

<style scoped>
  .active{color: #00C982;}
  .mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box {
    width: 850px;
    height: 600px;
    background-color: white;
    display: flex;
    flex-direction: column;
  }
  .box_header {
    height: 60px;
    width: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid #EEEEEF;
  }
  .box_select{width: 100%;background-color: #EEEEEF;display: flex;justify-content: space-between;}
  .box_select_left{flex: 1;display: flex;align-items: center;flex-wrap: wrap;}
  .box_select_left .tag{display: inline-block;background-color: #00C982;padding: 5px 10px;color: white;font-size: 14px;margin-left: 30px;margin-top: 5px;border-radius: 20px;margin-bottom: 5px;cursor: pointer;}
  .box_select_right{background-color: #00C982;color: white;font-size: 14px;margin-left: 30px;margin-top: 5px;border-radius: 5px;margin-bottom: 5px;cursor: pointer;margin-right: 30px;height: 30px;width: 50px;text-align: center;line-height: 30px;}
  .box_main{width: 100%;overflow: auto;background-color: white;flex: 1;overflow: auto;}
  .list_box{display: flex;align-items: center;border-bottom: 1px solid #EEEEEF;}
  .list_box_left{width: 200px;display: flex;align-items: center;justify-content: center;}
  .list_box_right{flex: 2;display: flex;align-items: center;flex-wrap: wrap;}
  .list_box_right .tag{width: 50%;height: 40px;line-height: 40px;}
  .tag_son_box{width: 100%;background-color: #EEEEEF;display: flex;align-items: center;flex-wrap: wrap;}
  .tag_son_box .tag{width: 50%;height: 40px;line-height: 40px;padding-left: 10px;box-sizing: border-box;}
  .displayNone{display: none;}
</style>
