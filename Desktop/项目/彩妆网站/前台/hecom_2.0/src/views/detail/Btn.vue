<template>
    <div class="btn">
        <div v-if="stock>0">
            <div class="shopnow" @click="buynow">立即购买</div>
            <div class="shopbag" @click="addtocart">加入购物袋</div>
        </div>
        <div v-else>
            <div class="notenough">暂时缺货</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'btn',
    props:["stock"],
    methods:{
        addtocart(){
            console.log('dianjigouwuche')
            /* 获取参数 */
            let that = this
            let userToken = sessionStorage.getItem('user_id'),
            product_num=this.$store.state.detail.count,
            product_inf_id=this.$store.state.detail.data.goodsDataList[this.$store.state.detail.nowColor].product_inf_id;
            let postData = this.$qs.stringify({
                    product_inf_id:product_inf_id,
                    userToken:userToken,
                    product_num:product_num
                })
            this.$http.post('/shopping/addtocart',postData)
            .then(res =>{
                console.log(res)
                if(res.data.code==1){
                     /* 如果返回值1，应该调用添加购物车成功 */
                   
                      this.$modal({
                            // type:'提示',
                            msg:'已加入购物袋成功',
                            type:'successful'
                        })
                     console.log(1)
                }else if(res.data.code==-1){
                    /* 如果返回值-1，应该渲染登录组件 */
                   
                     this.$modal({
                            // type:'提示',
                            msg:'购物袋数量上限',
                            type:'fail'
                        })
                    console.log(-1)
                }else{
                    /* 服务器报错 */
                }
            })
            .catch(err => {
                    console.log(err,'错误') 
            })     
        },
        buynow(){
             let proInfId=this.$store.state.detail.data.goodsDataList[this.$store.state.detail.nowColor].product_inf_id;
            let proNum=this.$store.state.detail.count;
            let settlementData=[{productInfId:proInfId,proNum:proNum}]
             this.$router.push({
                name:'toorder',
                params:{
                        settlementData, 
                    }
                })
        }
    }
}
</script>
<style scoped>
    .btn{
        width: 100%;
        height: 108px;
        position: absolute;
        top:44px;
        left: 0;
        user-select:none;
    }
    .shopnow{
        cursor: pointer;
        text-align: center;
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        background: #000;
        color: #fff;
        margin-top: 10px;
    }
    .shopnow:hover{
        background: #333;
    }
    .shopbag{
        cursor: pointer;
        text-align: center;
         height: 44px;
        line-height: 44px;
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
        color: #000;
        border: solid 1px #000;
        margin-top: 10px;
    }
    .shopbag:hover{
        border: solid 1px #666;
        color: #666;
    }
    .notenough{
        cursor: pointer;
        text-align: center;
         height: 44px;
        line-height: 44px;
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
        color: #000;
        border: solid 1px #000;
        margin:32px 0;
    }
    .notenough:hover{
        border: solid 1px #666;
        color: #666;
    }
</style>


