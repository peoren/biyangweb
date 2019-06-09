<template>
  <div class="forgot">
      <p class="backtext">找回密码</p>
      <steptext :index='index'/>
      <div class="steps">
          <router-view @indexfn='indexfn' @tologin='tologin'></router-view>
      </div>
  </div>  
</template>
<script>
import steptext from '@/views/forgotpassword/components/steptext.vue'
export default {
    data() {
        return {
            index:1
        }
    },
    components:{
        steptext,
    },
    methods:{
        tologin() {
            this.$store.state.home.showLogin = true
        },
        indexfn(i) {
            this.index = i
        }
    },
    watch: {
        $route(newVal) {
            if(newVal.fullPath.split('/')[2] == undefined) {
                this.index = 1
            }
            if(newVal.fullPath.split('/')[2] == 'one') {
                this.index = 1
            }
            if(newVal.fullPath.split('/')[2] == 'two') {
                this.index = 2
            }
            if(newVal.fullPath.split('/')[2] == 'three') {
                this.index = 3
            }
            if(newVal.fullPath.split('/')[2] == 'four') {
                this.index = 4
            }
        }
    }
    
}
</script>
<style scoped>
.forgot{
    display: inline-block;
    margin: 56px auto 30px;
    margin-top: 160px;
}
.backtext{
    text-align: left;
    font-size: 22px;
    color: #000000;
    margin-bottom: 30px;
}
</style>

