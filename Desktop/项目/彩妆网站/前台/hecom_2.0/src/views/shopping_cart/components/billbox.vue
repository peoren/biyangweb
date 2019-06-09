<template>
    <div class="billbox">
        <div class="billTitle">
            订单一览
        </div>
        <div class="billMsg">
            <div class="billPrice">
                <div>
                    <span>订单小计</span>
                    <span @click="all">￥{{this.$store.state.shopping_cart.allprice}}</span>
                </div>
                <div>
                    <span>订单优惠金额</span>
                    <span>￥{{this.$store.state.shopping_cart.integral/10}}</span>
                </div>
            </div>
            <div class="billAllPrice">
                <span>预计总额</span>
                <span>￥{{allprice}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data:function(){
        return {
            // allprice:this.$store.state.shopping_cart.allprice,
            
        }
    },
    methods:{
        all(){
            console.log(this.$store.state.shopping_cart.integral);
            
        }
    },
    computed:{
        allprice(){
            let all=this.$store.state.shopping_cart.allprice-this.$store.state.shopping_cart.integral*0.1
            all=parseInt(all)
            if(all>0){
                return all
            }else{
                return 0
            }
        }
    }

}
</script>
<style scoped>
.billbox{
    width: 70%;
    float: right;
    text-align: left;
}
.billTitle{
    font-size: 24px;
    color: #464646;
    margin: 60px auto 40px;
}
.billPrice{
    border-top: 1px solid #a0a0a0;
    border-bottom: 1px solid #a0a0a0;

}
.billMsg span{
    font-size: 14px;
    line-height: 21px;
    display: inline-block;
    margin: 15px auto;
    color: #000;
}
.billPrice>div:nth-of-type(1) span{
    margin-bottom: 0;
}
.billPrice>div span:nth-of-type(2){
    display: block;
    float: right;
}
.billAllPrice{
       border-bottom: 1px solid #a0a0a0;
}
.billAllPrice span:nth-of-type(2){
    display: block;
    float: right;
}
</style>
