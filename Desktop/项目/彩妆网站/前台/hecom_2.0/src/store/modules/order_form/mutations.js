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
    //地址
    setconfirmAddress(state,confirmAddress){
        state.confirmAddress = confirmAddress
    },
    //右边价格
    setallnum(state,allnum){
        state.allnum = allnum
    },
    setbeforeallprice(state,beforeallprice){
        state.beforeallprice = beforeallprice
    },
    setAllprice(state,allprice){
        state.allprice = allprice
    },
    //是否需要发票
    setpaper(state,paper){
        state.paper = paper
    },
    //商品id
    setproductInfId(state,productInfId){
        state.productInfId = productInfId
    },
    setaddress(state,address){
        state.address=address
    },
    setorder_money(state,order_money){
        state.order_money=order_money
    },
    setorder_num(state,order_num){
        state.order_num=order_num
    },
    setorder_size(state,order_size){
        state.order_size=order_size
    }

}