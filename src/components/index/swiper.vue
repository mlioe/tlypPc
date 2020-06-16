<template>
  <div class="box">
    <swiper :options="swiperOption" class="swiper_box">
      <swiper-slide class="swiper-slide" v-for="(item,index) in carouselArr" :key="index">
        <img :src="item.img" :alt="index">
      </swiper-slide>
      <!-- 分页器 -->
      <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
      <!-- 左右箭头 -->
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
  </div>
</template>

<script>
  var vm = null;
  export default {
    data() {
      return {
        carouselArr: [{
          img: 'http://www.telojob.com/data/upload/attach_img/20/01/20/5e251333eae63.png'
        }, {
          img: 'http://www.telojob.com/data/upload/attach_img/20/02/08/5e3e55d5566e6.png'
        },{
          img: 'http://www.telojob.com/data/upload/attach_img/20/02/08/5e3e55d5566e6.png'
        }],
        swiperOption: {
          //显示分页
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          //自动轮播
          autoplay: {
            delay: 3000,
            //当用户滑动图片后继续自动轮播
            disableOnInteraction: false,
          },
          //开启循环模式
          loop: true,
          on: {
            slideChangeTransitionStart: function() {
              // console.log(this.activeIndex-1);
            },
            click: function() {
              // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
              // console.log(this); // -> Swiper
              // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
              const realIndex = this.realIndex;
              vm.carousels(realIndex);
            }
          }
        }
      }
    },
    created() {
      vm = this;
    },
    methods: {

      carousels(index) {//轮播图点击事件
        console.log(index)
        // if (type.url !== null) {
        //   this.$router.push(type.redirect_to);
        // }
      }
    }
  }
</script>

<style scoped>
  .box {
    width:700px;
    height: 360px;
  }

  .swiper_box {
    width: 700px;
    height: 360px;
  }

  .swiper-slide {
    width: 100%;
    height: 100%;
  }

  .swiper-slide img {
    width: 700px;
    height: 360px;
  }

  .swiper-pagination {}
</style>
