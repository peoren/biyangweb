// mutations
export default {
    setLogined (state, status) {
        state.logined = status
    },
    showLoad (state, status) {
        state.showLoading = status
    },
    setPrevUrl (state, url) {
        state.prevUrl = url
    },
    changeAllPri(state,allprice){
        state.allprice=allprice
        
    },
    changeIntegral(state,integral){
        state.integral=integral
    },
    chgoodsstate(state,select){
        for(let i in state.goodsdata){
            state.goodsdata[i].select=select
        }
    }
}