<template>
  <div class="search">
    <div class="search_box">
      <input type="text" placeholder="情输入你想查找的公司" v-model="str" />
      <!-- <div class="job_menu">
        <div @click="jobMenuClick">
          职位类型
          <span class="Icon">&#xe665;</span>
          <div class="job_menu_tree1" v-show="jobMenuType" @click.stop="event">
            <div class="list" v-for="(item, index) in list" :key="item.categoryname" @mousemove="tree1_mouse(index)">{{ item.categoryname }}</div>
          </div>
          <div class="job_menu_tree2" v-show="jobMenuType"  @click.stop="event">
            <div class="list" v-for="(item, index) in list[tree1ListIndex].children" :key="item.categoryname" @mousemove="tree2_mouse(index)">{{ item.categoryname }}</div>
          </div>
          <div class="job_menu_tree3" v-show="tree3List.length != 0">
            <div class="list" v-for="(item, index) in tree3List" :key="item.categoryname" @click.stop="tree3_click(item)">{{ item.categoryname }}</div>
          </div>
        </div>
      </div> -->
      <div class="searc_inp" @click="searchClick">搜索</div>
    </div>
    <div class="other">
      <div class="left">
        <div class="title exp">
          <span v-show="experienceIndex == null">工作经验</span>
          <span v-show="experienceIndex != null">{{ experienceIndex == null ? '' : experience[experienceIndex] }}</span>
          <span class="Icon">&#xe665;</span>
          <div class="list_box exp_box">
            <div class="list" v-for="(item, index) in experience" @click="experienceClick(index)" :key="index">{{ item }}</div>
          </div>
        </div>
        <div class="title resume">
          <span v-show="educationArrIndex == null">学历要求</span>
          <span v-show="educationArrIndex != null">{{educationArrIndex == null ? '':educationArr[educationArrIndex].value}}</span>
          <span class="Icon">&#xe665;</span>
          <div class="list_box resume_box">
            <div class="list" v-for="(item, index) in educationArr" @click="resumeClick(index)" :key="index">{{ item.value }}</div>
          </div>
        </div>
        <div class="title moeny">
          <span v-show="moneyArrIndex == null">薪资要求</span>
          <span v-show="moneyArrIndex != null">{{moneyArrIndex == null ? '':moneyArr[moneyArrIndex].value}}</span>
          <span class="Icon">&#xe665;</span>
          <div class="list_box moeny_box">
            <div class="list" v-for="(item, index) in moneyArr" @click="moneyClick(index)" :key="index">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="right" @click="empty">清空筛选条件</div>
    </div>
  </div>
</template>

<script>
import jobList from '../../common/json/jobs.json';
export default {
  props:{
    val:String,//高亮
  },
  data() {
    return {
      list: [],
      jobMenuType: false,
      tree1ListIndex: 0,
      tree3List: [],
      select: {},
      str: '',
      experience: ['不限', '在校生', '应届生', '1年以内', '1-3年', '3-5年', '5-10年', '10年以上'],
      experienceIndex: null,
      educationArrIndex: null,
      educationArr: [
        {
          value: '初中及以下'
        },
        {
          value: '中专/中技'
        },
        {
          value: '高中'
        },
        {
          value: '大专'
        },
        {
          value: '本科'
        },
        {
          value: '硕士'
        },
        {
          value: '博士'
        }
      ],
      moneyArrIndex: null,
      moneyArr: [
        {
          value: '不限',
          label: '不限'
        },
        {
          value: '3K以下',
          label: '以下'
        },
        {
          value: '3-5K',
          label: '不限'
        },
        {
          value: '5-10K',
          label: '5-10K'
        },
        {
          value: '10-30K',
          label: '10-300K'
        },
        {
          value: '面议',
          label: '面议'
        }
      ]
    };
  },
  created() {
    this.handel();
  },
  methods: {
    event(){
      return
    },
    searchClick(){
      console.log(this.str)
      console.log(this.educationArrIndex == null ? '' : this.educationArr[this.educationArrIndex].value)
      console.log(this.experienceIndex == null ? '' : this.experience[this.experienceIndex])
      console.log(this.moneyArrIndex == null ? '' : this.moneyArr[this.moneyArrIndex].value)
      this.$emit('searchJob')
    },
    empty(){
      this.moneyArrIndex = null
      this.educationArrIndex = null
      this.experienceIndex = null
    },
    moneyClick(index){//薪资点击
      this.moneyArrIndex = index
    },
    resumeClick(index){//学历点击
      this.educationArrIndex = index
    },
    experienceClick(index) {
      //工作经验点击下标
      this.experienceIndex = index;
    },
    jobMenuClick() {
      this.jobMenuType = !this.jobMenuType;
      // if(this.jobMenuType == false){
      //   this.jobMenuType = !this.jobMenuType;
      // }
    },
    tree3_click(item) {
      this.jobMenuType = !this.jobMenuType;
      this.select = item;
      this.str = item.categoryname;
      this.tree3List = [];
    },
    tree1_mouse(index) {
      if (this.tree1ListIndex == index) {
      } else {
        this.tree3List = [];
        this.tree1ListIndex = index;
      }
    },
    tree2_mouse(index) {
      // console.log(this.list[this.tree1ListIndex].children[index].children)
      this.tree3List = this.list[this.tree1ListIndex].children[index].children;
    },
    handel() {
      //处理工作列表，将其分类
      let list = [];
      const arr = this.build_tree(0); //处理后端导出的json，改成3级数组
      arr.map(item => {
        //默认是3级，所以没有递归
        // console.log(item)
        let childeren = [];
        item.children.map(item2 => {
          // console.log(item2)
          let childeren2 = [];
          item2.children.map(item3 => {
            // console.log(item3)
            childeren2.push({
              name: item3.categoryname
            });
          });
          childeren.push({
            name: item2.categoryname,
            tabList: childeren2
          });
        });
        list.push({
          title: item.categoryname,
          tabList: childeren
        });
      });
      for (var i = 0; i < 8; i++) {
        this.list.push(arr[i]);
      }
    },
    findChild(arr, id) {
      //处理json
      let childs = [];
      jobList['RECORDS'].forEach(v => {
        if (v.parentid == id) {
          childs.push(v);
        }
      });
      return childs;
    },
    build_tree(id) {
      //处理json
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
    valChange(){
      // console.log('值改变')
      this.str = this.val
      console.log(this.str)
      console.log(this.educationArrIndex == null ? '' : this.educationArr[this.educationArrIndex].value)
      console.log(this.experienceIndex == null ? '' : this.experience[this.experienceIndex])
      console.log(this.moneyArrIndex == null ? '' : this.moneyArr[this.moneyArrIndex].value)
      this.$emit('valChangeSearch')
    }
  },
  watch:{
    val(){
      this.valChange()
    }
  }
};
</script>

<style scoped>
.search {
  width: 100%;
  min-height: 100px;
  background-color: white;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
}
.search_box {
  width: 700px;
  border: 1px solid #00c982;
  height: 44px;
  display: flex;
  align-items: center;
  margin: 20px auto;
}
.search_box input {
  border: none;
  background-color: white;
  font-size: 12px;
  border-right: 1px solid #eeeeef;
  width: 575px;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
}
.search_box .job_menu {
  width: 125px;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.search_box .searc_inp {
  width: 125px;
  height: 44px;
  background-color: #00c982;
  color: white;
  text-align: center;
  line-height: 44px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
.job_menu_tree1 {
  width: 180px;
  height: 180px;
  background-color: white;
  position: absolute;
  top: 35px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
}
.job_menu_tree1 .list {
  text-align: left;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  cursor: pointer;
  font-size: 12px;
  transition: 0.1s;
}
.job_menu_tree1 .list:hover {
  background-color: #eeeeef;
}
.job_menu_tree2 {
  width: 180px;
  height: 180px;
  background-color: white;
  position: absolute;
  top: 35px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
  left: 181px;
  font-size: 12px;
}
.job_menu_tree2 .list {
  text-align: left;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  cursor: pointer;
  font-size: 12px;
  transition: 0.1s;
}
.job_menu_tree2 .list:hover {
  background-color: #eeeeef;
}
.job_menu_tree3 {
  width: 180px;
  height: 180px;
  background-color: white;
  position: absolute;
  top: 35px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: auto;
  left: 362px;
  font-size: 12px;
}
.job_menu_tree3 .list {
  text-align: left;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  cursor: pointer;
  font-size: 12px;
  transition: 0.1s;
}
.job_menu_tree3 .list:hover {
  background-color: #eeeeef;
}
.other {
  width: 700px;
  height: 40px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}
.other .left {
  flex: 1;
  display: flex;
}
.other .left .title {
  cursor: pointer;
  width: 100px;
  position: relative;
  margin-right: 20px;
  height: 40px;
  line-height: 40px;
}
.other .left .list_box {
  position: absolute;
  top: 41px;
  background-color: white;
  width: 120px;
  min-height: 200px;
}
.other .left .list_box .list {
  width: 120px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding-left: 10px;
}
.other .right {
  color: #8d92a1;
  cursor: pointer;
}
.other .left .list_box .list:hover {
  background-color: #eeeeef;
}
.exp_box,
.resume_box,
.moeny_box {
  display: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.exp:hover > .exp_box {
  display: block;
}
.resume:hover > .resume_box {
  display: block;
}
.moeny:hover > .moeny_box {
  display: block;
}
</style>
