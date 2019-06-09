import mutations from './detail/mutations';
import actions from './detail/actions';


const state = {
  RETURNCODE:0,
  count:1,
  nowColor:0,
  data: [],
  
  // logined: '',
  // showLoading:false,
  // prevUrl:'/',
  // url:''
}

 



export default {
  namespaced: true,
  state,
  mutations,
  actions
}