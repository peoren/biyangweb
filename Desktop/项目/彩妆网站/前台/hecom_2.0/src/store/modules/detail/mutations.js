// mutations
export default {
    setLogined (state, status) {
        state.logined = status
    },
    showLoad (state, status) {
        state.showLoading = status
    },
    getdata(state) {
        state.data = JSON.parse(sessionStorage.getItem('data'))
       
    },
    havGet(state) {
        state.RETURNCODE=1;
    },
    getErr(state){
        state.RETURNCODE=-1;
    }
}