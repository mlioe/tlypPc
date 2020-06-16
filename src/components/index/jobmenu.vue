<template>
  <div class="box">
      <div class="job_menu" @mouseleave="leave()">
          <div class="job_menu_list" v-for="(item,index) in list" @mousemove="list_mouse(index)" :class="index ==listIndex ? 'acitive':''" :key="index">
            <div class="job_menu_list_text" >{{item.categoryname}}</div>
            <div class="Icon">&#xe661;</div>
          </div>
          <div class="classification_box">
            <div v-for="(item,index) in list" class="borderBottom" v-show="index == listIndex" :key="index">
              <div class="list" v-for="(item2,index) in item.children" :key="index">
                <div class="classification_title">{{item2.categoryname}}</div>
                <div class="son_box">
                  <div class="classification_son" v-for="(item3,index) in item2.children" :key="index" @click="listClick(item3)">{{item3.categoryname}}</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="job_menu_list job_max">显示全部职位</div>
  </div>
</template>

<script>
  import jobList from '../../common/json/jobs.json'
  export default{
    data(){
      return{
          list:[],
          listIndex:null,
          timer:''
      }
    },
    created(){
      this.handel()
    },
    methods:{
      listClick(item){//点击某个标签
        this.$emit('jobTag',item)
      },
      leave(){//鼠标移出事件
        this.listIndex = null
      },
      list_mouse(index){
        	this.listIndex = index
      },
      handel(){//处理工作列表，将其分类
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
        for(var i=0;i<8;i++){
          this.list.push(arr[i])
        }
        // console.log(this.list)
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
    }
  }
</script>

<style scoped>
  .box{box-shadow: 0 0 6px 0 rgba(0,0,0,.13);z-index: 999;}
  .job_menu{width: 350px;height: 320px;background-color: white;cursor: pointer;position: relative;}
  .job_menu_list{width: 100%;height: 40px;line-height: 40px;font-size: 16px;box-sizing: border-box;padding-left: 20px;transition: 0.1s;display: flex;align-items: center;justify-content: space-between;}
  .job_menu_list .Icon{padding-right: 20px;}
  /* .job_menu_list:hover{background-color: #00C982;color: white;} */
  .classification_box{width: 730px;height: 360px;background-color: white;position: absolute;left: 352px;top: 0;display: none;overflow: auto;overflow-x: hidden; /*x轴禁止滚动*/overflow-y: scroll;/*y轴滚动*/}
   .classification_box::-webkit-scrollbar {display: none;/*隐藏滚动条*/}
  .job_menu:hover>.classification_box{display: block;}
  .job_max{color: #00C982;background-color: white;height: 40px;box-sizing: border-box;border-top: 1px solid #EEEEEF;cursor: pointer;}
  .classification_title{font-size: 16px;font-weight: bold;padding: 10px;}
  .son_box{width: 100%;display: flex;align-items: center;flex-wrap: wrap;}
  .classification_son{width:33.33%;height: 40px;line-height: 40px;padding-left: 10px;box-sizing: border-box;font-size: 14px;}
  .classification_son:hover{color: #00C982;}
  .borderBottom{border: 1px solid #EEEEEF;}
  .acitive{color: white;background-color: #00C982;}
</style>
