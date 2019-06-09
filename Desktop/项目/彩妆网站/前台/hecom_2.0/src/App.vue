<template>
  <div id="app">
    <top/>
    <router-link to="/"></router-link>
    <router-view/> 
    <bottom v-if='show'/> 
    <login v-show='$store.state.home.showLogin'/>
    <reg v-show='$store.state.home.showReg'/>
  </div>
</template> 

<script>
import reset from '@/components/reset.css'
import top from '@/components/header/header.vue'
import bottom from '@/components/footer/footer.vue'
import login from '@/views/home_login/login.vue' 
import reg from '@/views/home_reg/reg.vue'
export default {
  components:{
    top,bottom,login,reg
  },
  data() {
    return {
      show:true, //如果不需要头部和底部 将该值变成false
      // showlogin:this.$store.state.home.showLogin,
      // showreg:false
    }
  },
  methods: {

  },
  created() {
    // console.log(sessionStorage.getItem('showLoing'))
    // if(sessionStorage.getItem('showLogin') == 'true') {
    //   this.$store.state.home.showLogin = true
    // }
  }
}
</script>


<style>
/* 这是测试字段 */
.form {
  position: absolute;
  top: 500px;
  left: 300px;
  background-color: red;
  z-index: 999;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
 
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.cdcd {
  background-color: red;
  position: absolute;
  top: 500px;
  left: 200px;
}
</style>
