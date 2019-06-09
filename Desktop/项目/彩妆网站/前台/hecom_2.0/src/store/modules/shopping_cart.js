import mutations from './shopping_cart/mutations.js';


const state = {
  num:[1,2,3],
  logined: '',
  showLoading:false,
  prevUrl:'/',
  allprice:'',
  integral:'',
  goodsdata:''
}

 



export default {
  namespaced: true,
  state,
  mutations
}