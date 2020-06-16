<template>
  <div>
    <div class="my_data">
      <div class="my_data_left">
        <div class="name">李俊辉 男</div>
        <div class="other">
          <div class="Icon">
            <span>&#xe8dd;</span>2年经验
          </div>
          <div class="Icon">
            <span>&#xe8dd;</span>大专
          </div>
          <div class="Icon">
            <span>&#xe8dd;</span>在职暂不考虑
          </div>
        </div>
      </div>
      <div class="my_data_right">
        <div class="imgbox">
          <img src="../../assets/logo.png" alt="">
          <div class="set_img Icon">&#xe92d;</div>
        </div>
        <div class="set" @click="setData">
           编辑
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        
      }
    },
    methods:{
      setData(){
        this.$emit('setData')
      }
    }
  }
</script>

<style scoped>
 .main_lefe{width: 850px;min-height: 800px;background-color: white;}
 .my_data{display: flex;align-items: center;justify-content: space-between;width: 800px;margin: 20px auto;border-bottom: 1px solid #EEEEEF;}
 .my_data .name{font-size: 20px;font-weight: bold;}
 .my_data .other{display: flex;align-items: center;margin-top: 20px;}
 .my_data .other .Icon{margin-right: 20px;font-size: 14px;border-right:1px solid #EEEEEF ;padding-right: 20px;}
 .my_data .other .Icon span{padding-right: 5px;}
 .my_data .imgbox{width: 80px;height: 80px;border-radius: 50%;overflow: hidden;margin: 20px 0;position: relative;}
 .my_data .imgbox:hover>.set_img{display: block;}
 .my_data .imgbox .set_img{width: 80px;height: 80px;position: absolute;top: 0;left: 0;background-color: rgba(0,0,0,0.2);display: none;cursor: pointer;}
 .my_data .imgbox .Icon{font-size: 30px;text-align: center;line-height: 80px;color: white;}
 .my_data .imgbox img{width: 100%;height: 100%;}
 .my_data .set{width: 80px;color: #00C982;text-align: center;margin-bottom: 20px;font-weight: bold;cursor: pointer;}
 .my_data .set span{font-size: 16px;}
</style>
