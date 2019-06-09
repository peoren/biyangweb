import Vue from 'vue';
import Router from 'vue-router';

// 引入自己的路由
import home from './routers/home'
import classify from './routers/classify'
import detail from './routers/detail'
import shopping_cart from './routers/shopping_cart'
import person_center from './routers/person_center'
import order_form from './routers/order_form'
import home_static from './routers/home_static'
import home_login from './routers/home_login'
import forgotpassword from './routers/forgotpassword.js'
Vue.use(Router); 



const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...home,
    ...classify,
    ...detail,
    ...shopping_cart,
    ...person_center,
    ...order_form,
    ...home_static,
    ...home_login,
    ...forgotpassword
  ],
});

router.beforeEach((to, from, next) => {
    // if (to.meta.limit) {
    //   let token = sessionStorage.getItem('user_id');
      
    //   if (token == null || token == '') {
    //     alert('需要登录')
    //     console.log(to)

    //   } else {
    //     next();
    //   }
    // } else {
      next()
    // }
})
  export default router