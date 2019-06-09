<template>
    <div class="settlement clear">
        <div>
        <ul>
            <li>
            <input :disabled='can' type="checkbox" id="use" @click="checkbox">
            <label for="use">使用积分抵扣:</label><span>{{userIntegral}}</span><span>分</span>
            </li>

            <li>
                <span>商品总金额：￥</span>
                <span>{{shopCarPrice}}</span>
            </li>

            <li>
                <span>运费：￥</span>
                <span>12.00</span>
            </li>
            <li>
                <span>订单积分优惠：￥ -</span>
                <span>{{points}}</span>
            </li>
            <li>
                <span>总金额：￥</span>
                <span>{{UseIn}}</span>
            </li>
        </ul>
        </div>
        <div>
            <div class="bu" @click="back"><button>返回购物袋</button></div>
            <div class="bu" @click="paySure"><button class="bu2">确认订单</button></div>
        </div>
    </div>
</template>
<script>
export default {
    props:['afterUseIn','shopCarCartTotalprice','userIntegral','shopCarPrice'],
    data:function(){
        return{
           points:'-',
           ischeck:false,
           UseIn:this.shopCarCartTotalprice,
           can:false
        }
    },
    methods:{
        checkbox(){
            this.ischeck = !this.ischeck
            if(this.ischeck == true){
                    this.points = this.userIntegral/100;
                    this.UseIn = this.afterUseIn;
            }else{
                this.points = '-';
                this.UseIn = this.shopCarCartTotalprice;
            }
        },
        back(){
            this.$router.push('/shopping_cart/');
        },
         paySure(){
             let useIn = 0
            if(this.ischeck == true){
                useIn = this.userIntegral
            }else{
                useIn = 0
            }
            if(!this.$store.state.order_form.confirmAddress.addressId){
                this.$modal({
                    msg:'请输入发货地址',
                    type:'fail'
                })
                return false
                
            }
            //momal
           
            //订单支付界面
            this.ordertime = setTimeout(() => {
                this.$router.push('/orderPay');
            }, 2000);
            const that = this
            let addressId=this.$store.state.order_form.confirmAddress.addressId
            let paper=this.$store.state.order_form.paper
            let mydata=JSON.stringify(that.$store.state.order_form.productInfId)
            // let dataTemp=JSON.stringify(
            //      data
            // )
            // let data2='[{"productInfId":1,"proNum":3}]'
            // console.log(this.$store.state.order_form.productInfId)
            // let cd = this.$store.state.order_form.productInfId
            // console.log(that.$store.state.order_form.productInfId)
            // console.log(mydata);
            
            // addressId:addressId,
            //         paper:paper,
            //         useIn:useIn,
            //         productInfId:productInfId
            //返回数据
            let postData = this.$qs.stringify({
                addressId:addressId,
                paper:paper,
                useIn:useIn,
                settlementData:mydata
                // productInfId:productInfId
                
                // userToken:'670d64d2b83e4a2cab5a4bf67a7630b3'
                })
                // console.log(addressId)
                // console.log(paper)
                // console.log(useIn)
                // console.log(productInfId
                
            
            this.$http.post("/shopping/confirmorder",postData)
                .then(function(res) {
                    console.log(res)
                // console.log(res.data.data);
                if (res.data.code == 1) {
                    // console.log(res.data.data);
                       that.$modal({
                            // type:'提示',
                            msg:'订单生成成功',
                            type:'successful'
                        })
                    that.$store.commit('order_form/setaddress',res.data.data.address)
                     that.$store.commit('order_form/setorder_money',res.data.data.order_money)
                      that.$store.commit('order_form/setorder_num',res.data.data.order_num)
                       that.$store.commit('order_form/setorder_size',res.data.data.order_size)
                        console.log(res.data.data.order_size);
                        
                
                } else {
                }
                })
                .catch(err => {
                console.log(err, "错误");
                });


        }
    },
    watch: {
        shopCarCartTotalprice(newVal) {
            // console.log(newVal)
            this.UseIn = newVal
            this.$store.commit('order_form/setbeforeallprice',this.shopCarPrice)           
        },
        UseIn(val){
            this.$store.commit('order_form/setAllprice',this.UseIn)
        },
        userIntegral(newVal) {
            if(this.shopCarPrice > this.userIntegral/100){
                    this.can = false
            }else {
                this.can = true
            }
       }
    },
    beforeDestroy(){
        clearTimeout(this.ordertime);
    }
    
}
</script>
<style scoped>
    .settlement{
        color: #000000;
        font-size: 14px;
        padding: 25px 0;
        border-bottom:1px solid #a0a0a0;
        text-align: right;
    }
    button{
        width: 147px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        border: none;
        background-color: black;
        color: #fff;
    }
    .bu{
        margin-top: 10px;
    }
    .bu2 {
        background-color: #fff;
        color: #000;
        border: 1px solid #000;
    }
</style>

