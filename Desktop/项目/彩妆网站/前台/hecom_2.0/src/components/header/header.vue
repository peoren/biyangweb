<template>
    <div class="header" :class="{rise:rises}">
        <div :class="{navbg:!isshow}">
            <nav class="clear">
                <div class="head_img">
                    <img :src="url" alt="" :class="{img_rise:rises}" @click='tohome'>
                </div>
                <nav1 @search='search'/>
                <nav2 @search='search' :rises='rises' @enter='enter' @leave='leave'/>
            </nav>
        </div>
        <shade :show='isshow' :msg='msgs' @enter='isshow=true' @leave='isshow=false'/>
        <search @close='close' :issearch='issearch'/>
    </div>
</template>

<script>
import nav1 from '@/components/header/components/nav1.vue'
import nav2 from '@/components/header/components/nav2.vue'
import shade from '@/components/header/components/shade.vue'
import search from '@/components/header/components/search.vue'
export default {
  data() {
      return {
          isshow:false,
          msgs:'',
          rises:false,
          url:require('../../assets/home/header-logo.png'),
          issearch:false
      }
  },
  components: {
    nav1,nav2,shade,search
  },
  methods: {
      enter(n) {
          this.isshow = true
          this.msgs = n
      },
      leave() {
          this.isshow = false
      },
      search() {
          this.issearch = true
      },
      close() {
          this.issearch = false;
      },
      tohome() {
          this.$router.push('/')
      },
  },
  mounted() {
      var _this = this;
      window.onscroll = function() {
          if(document.documentElement.scrollTop >= 100) {
              _this.rises = true
              _this.url = require('../../assets/home/header-logo-compact.png')
          }else {
              _this.rises = false
              _this.url = require('../../assets/home/header-logo.png')
          }
      }
  },
}
</script>


<style scoped>
    .header {
        height: 130px;
        width: 100%;
        position: fixed;
        top: 0;
        transition: all 0s;
        box-sizing: border-box;
        background-color: #fff;
        z-index: 998;
    }
    .navbg {
        height: 130px;
        box-sizing: border-box;
        border-bottom: 1px solid #ac9b81;
    }
    nav {
        height: 130px;
        width: 80%;
        min-width: 1024px;
        max-width: 1440px;
        margin: 0 auto;
        position: relative;
    }
    .head_img {
        float: left;
        line-height: 130px;
    }
    img {
        width: 150px;
        height: auto;
        cursor: pointer;
        vertical-align: middle; 
    }
    .rise {
        top: -80px;
        transition: all .5s;
    }
    .img_rise {
        margin-top: 80px;
    }
</style>

