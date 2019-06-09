import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/iconfont/iconfont.css'
import '@/components/iconfont-cart/iconfont.css'
Vue.config.productionTip = false;
// axios
import axios from 'axios';
import qs from 'qs'


axios.defaults.baseURL = '/';

Vue.prototype.$http = axios;
Vue.prototype.$qs = qs

//confirm
import theConfirm from '@/components/confirmbox/confirmbox.js'
Vue.prototype.$confirm = theConfirm;
//modal
import theModal from '@/components/modal/modal.js'
Vue.prototype.$modal = theModal;
// 切换环境
if (process.env.NODE_ENV == 'development') {    
  axios.defaults.baseURL = '/v1'
} else if (process.env.NODE_ENV == 'debug') {    
  axios.defaults.baseURL = '/debug'
} else if (process.env.NODE_ENV == 'production') {    
  axios.defaults.baseURL = '/'
}


axios.defaults.headers.common['userToken'] = sessionStorage.getItem('user_id');

axios.interceptors.response.use(function (res) {
  if(res.data.code == -200) {
    router.push('/')
    store.state.home.showLogin = true
    sessionStorage.setItem('user_id','')
    sessionStorage.setItem('user_name','')
  }
  return res;
}, function (error) {
  return Promise.reject(error);
});
 


new Vue({
  router,
  store, 
  render: h => h(App),
}).$mount('#app');
