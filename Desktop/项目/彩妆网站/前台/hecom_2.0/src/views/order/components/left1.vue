<template>
    <div class="left1">
        <p class="paycheck">订单付款</p>
        <div class="text">
            <img src="../../../assets/order/yes.png" alt="">
            <p style="padding:20px 0">感谢光临，您的订单已生成，请尽快完成付款</p>

            <div class="clear" style="font-size:12px;padding-bottom:20px;width:120px;margin:0 auto">
                <div style="float:left">支付方式：</div>
                <div style="float:left"><img src="../../../assets/order/alipay.png" alt="" ></div>
                <div style="float:left">支付宝</div>
            </div>
            <button @click="pay">立即支付</button>
        </div>
        <div class="msg">
            <div class="leftall">
                <p>订单号：<span>{{order_num}}</span></p>
                <p>订单商品数量：<span>{{order_size}}</span></p>
                <p>收货信息：收货人：<span>{{address.addressName}}</span></p>
                <p class="back">
                    地区：
                    <span>
                        {{address.addressProvince}}{{address.addressCity}}{{address.addressCounty}}{{address.addressDtaddress}}
                    </span>
                </p>
                <p class="back">手机：<span>{{address.addressPhone}}</span></p>
                <a href="javascript:;" @click="checkOrder">查看订单</a>
            </div>
            <div class="right">
                 <p>应付金额：￥<span>{{order_money}}</span>.00</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // user:sessionStorage.getItem('user_id'),
            address:'',
            order_money:'',
            order_num:'',
            order_size:'',
        }
    },
    methods:{
        checkOrder(){
            sessionStorage.setItem('orderNum',this.order_num);
            this.$router.push('/person_center/orderdetail');
        },
       //获取后台数据
    //    postaddress() {
    //          let that = this
    //          let postData=this.$qs.stringify({

    //             // userToken:'670d64d2b83e4a2cab5a4bf67a7630b3',
    //         })
    //          this.$http.post('/shopping/confirmorder',postData)
    //             .then(function(res){
    //                 console.log(res)
    //                 if(res.data.code == 1) {
    //                     console.log(res.data.data);
    //                     that.address = res.data.data.address;
    //                     that.order_money = res.data.data.order_money;
    //                     that.order_num = res.data.data.order_num;
    //                     that.order_size = res.data.data.order_size;  
    //                     }else {
    //                 }
    //             })
    //             .catch(err => {
    //                         console.log(err,'错误')
    //                     })
    //             },
    postaddress(){
        this.address=this.$store.state.order_form.address
        this.order_money=this.$store.state.order_form.order_money
        this.order_num=this.$store.state.order_form.order_num
        this.order_size=this.$store.state.order_form.order_size
        console.log(this.address);
        console.log(this.order_size)
        
    },
        pay(){

            const that=this
            let postData=this.$qs.stringify({
                        // userToken:'123',
                        totalPrice:that.order_money,
                        orderId:that.order_num
                    })

            
             this.$http.post('/pay/alipay',postData) 
                .then(res => {
                    console.log(res)
                    const div = window.document.createElement('div')
                    div.innerHTML = res.data //此处form就是后台返回接收到的数据
                    window.document.body.appendChild(div)
                    window.document.forms[0].submit()

                    
                })
                .catch(err => {
                    console.log(err,'错误') 
                })
        }
    },
    created(){
        this.postaddress();
    }
}
</script>
<style scoped>
img {
    max-width: 20px;
    max-height: 20px;
}
.left1{
    margin-top: 130px;
    width: 75%;
    float: left;
}
.paycheck{
    font-size: 24px;
    text-align: left;
    color: #000000;
    margin: 54px 0 40px 0;
}
.text{
    text-align: center;
    color: #000000;
    padding: 100px 0 80px;
    font-size: 14px;
    border-top: 1px solid #a0a0a0;
    border-bottom: 1px solid #a0a0a0;
    margin: 0 auto;
}
button{
    font-size: 16px;
    cursor: pointer;
    border: none;
    background-color: black;
    color: aliceblue;
    height: 40px;
    line-height: 40px;
    width: 100px;
}
.msg{
    margin: 20px;
}
.leftall{
    width: 50%;
    font-size: 12px;
    text-align: left;
    float: left;
}
.back{
    margin-left: 60px;
}
.leftall p{
    margin-bottom: 10px;
}
.right{
    float: right;
    text-align: right;
}
</style>
