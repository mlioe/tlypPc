<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        list:[{name:'222'}]
      }
    },
    methods:{

    },
    mounted(){//监听页面滚动
      // console.log('--app.vue--')
    },
  }
</script>

<style>
  body {
    width: 100%;
    height: 100%;
    background: #EEEEEF;
  }

  * {
    margin: 0;
    padding: 0;
  }

  a:link,
  a:visited {
    color: white;
    text-decoration: none;
    margin-right: 20px;
    transition: 0.5s;
    font-size: 14px;
  }

  li {
    list-style: none;
  }
  input{
    outline:none;
    border: 1px solid #00C982;
    box-sizing: border-box;
    padding:  0 10px;
  }
  @font-face {
    font-family: 'iconfont';
    /* project id 1555981 */
    src: url('https://at.alicdn.com/t/font_1555981_o0zt15l4zh.eot');
    src: url('https://at.alicdn.com/t/font_1555981_o0zt15l4zh.eot?#iefix') format('embedded-opentype'),
      url('https://at.alicdn.com/t/font_1555981_o0zt15l4zh.woff2') format('woff2'),
      url('https://at.alicdn.com/t/font_1555981_o0zt15l4zh.woff') format('woff'),
      url('https://at.alicdn.com/t/font_1555981_o0zt15l4zh.ttf') format('truetype'),
      url('https://at.alicdn.com/t/font_1555981_o0zt15l4zh.svg#iconfont') format('svg');
  }

  .Icon {
    font-family: iconfont;
  }
   /* element的样式自定义 */
   /* 分页器 */
   .el-pagination.is-background .el-pager li:not(.disabled).active {
       background-color: #00C982;
       color: #FFF;
   }
   .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li:hover {
       color: #00C982 !important;
   }
   /* select选择器 */
  .el-select{width: 300px !important;}
  .el-input__inner {border-color: #00C982 !important;border-radius:0 !important;}
  .el-select-dropdown__item.selected {
      color: #00C982 !important;
      font-weight: 700;
  }
  .el-select .el-input__inner:focus {
      border-color: #00C982 !important;
  }
  .el-input.is-active .el-input__inner, .el-input__inner:focus {
      border-color: #00C982 !important;
      outline: 0;
  }
  /* 日期选择器 */
  .el-date-editor{width: 300px !important;}
  .el-month-table td.today .cell {
      color: #00C982;
      font-weight: 700;
  }
  .el-month-table td.today a:hover {
      color: #00C982 !important;
      font-weight: 700;
  }
  .el-date-table td.end-date span, .el-date-table td.start-date span {
      background-color: #00C982;
  }
  .el-date-table td.today span {
      color: #00C982;
      font-weight: 700;
  }
  .el-month-table td.end-date .cell, .el-month-table td.start-date .cell {
      color: #FFF;
      background-color: #00C982;
  }
  /* textares */
  .el-textarea__inner {height: 150px !important; border-color: #00C982 !important;}
  .el-textarea__inner:focus {
      border-color: #00C982 !important;
  }
  /* 加载提示的颜色 */
  .el-loading-text{color: #00C982 !important;}
  .el-loading-spinner .path {stroke: #00C982 !important;}

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  }
</style>
