import mutations from './order_form/mutations';


const state = {
  num:[1,2,3],
  logined: '',
  showLoading:false,
  prevUrl:'/',
  // 确认的地址数据
  confirmAddress:'',
  //右边价格
  allnum:'',
  beforeallprice:'',
  allprice:'',
   // 是否要发票
   paper:0,
   //商品id
   productInfId:{},
   address:'',
   order_money:'',
   order_num:'',
   order_size:''
}

 



export default {
  namespaced: true,
  state,
  mutations
}