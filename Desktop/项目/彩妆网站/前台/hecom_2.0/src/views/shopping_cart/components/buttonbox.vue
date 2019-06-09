<template>
    <div class="buttonbox">
        <p class="clearShoppingCart"  @click="handMe()">
            清空购物车
        </p>
        <router-link to='/' class="backHome" tag='p'>
            继续购物
        </router-link>
        <p @click="sendMessge" class="settleAccounts" >
            下单结算
        </p>
        <!-- <clearmodal v-show="modal_flag" :modal_state.sync='modal_state' />   -->
        <!-- <span @click="demo">demooooooo</span> -->
        
    </div>
</template>
<script>
// import clearmodal from '@/views/shopping_cart/components/clearmodal.vue'
import { setTimeout } from 'timers';
export default {
    components:{
        // clearmodal
    },
    data:function(){
        return {
            // modal_flag:false,//打开模态框
            // modal_state:false//模态框的状态值
            // user:sessionStorage.getItem('user_id'), //获取用户id


        }
    },
    methods:{
        //清除数据函数，其中包含ajax请求
        clearshopcart(){
            
             let postData=this.$qs.stringify({
                // userToken:sessionStorage.getItem('user_id'),
            })

             this.$http.post('/shopping/clearcart',postData) 
                .then(res => {
                    // console.log(res)
                    
                    if(res.data.code == 1) {
                        // console.log(res.data.data);
                        
                        this.$router.push('/clear_shopping_cart')
                    }else {

                    }
                })
                .catch(err => {
                    console.log(err,'错误') 
                })
        },
        handMe(){
            let that=this
			this.$confirm({
				// type:'提示',
				msg:'确认清空购物袋',
				btn:{
					ok:'确认',
					no:'取消'
				}
			}).then(() => {
                // clearshopcart()
                 let postData=this.$qs.stringify({
                        // userToken:sessionStorage.getItem('user_id')
                    })

             that.$http.post('/shopping/clearcart',postData) 
                .then(res => {
                    // console.log(res)
                    
                    if(res.data.code == 1) {
                        // console.log(res.data.data);
                        
                        that.$router.push('/clear_shopping_cart/')
                    }else {

                    }
                })
                .catch(err => {
                    console.log(err,'错误') 
                })
              
			})
			.catch(() => {
                console.log('清除购物车失败');
			})
        },
          sendMessge(){
            let goodsdata=this.$store.state.shopping_cart.goodsdata
            
            

            let settlementData=[]
                for(let i in goodsdata){
                    if(goodsdata[i].select){
                        let productInfId=goodsdata[i].proInfId
                        let proNum=goodsdata[i].proNum
                        let temp={
                            productInfId:productInfId,
                            proNum:proNum
                        }
                        settlementData.push(temp)
                    }
                } 
                if(!settlementData.length){
                    this.$modal({
                        msg:'未选中商品！',
                        type:'fail'
                    })
                    return false
                }
            this.$router.push({
                name:'toorder',
                params:{
                        settlementData:settlementData,
                        // userToken:userToken
                    }
                })
        }
        //支付宝接口demo
        // demo(){
            
        //      let postData=this.$qs.stringify({
        //                 // userToken:'123',
        //                 totalPrice:123
        //             })

        //      this.$http.post('/pay/alipay',postData) 
        //         .then(res => {
        //             console.log(res)
        //             const div = window.document.createElement('div')
        //             div.innerHTML = res.data //此处form就是后台返回接收到的数据
        //             window.document.body.appendChild(div)
        //             window.document.forms[0].submit()

                    
        //         })
        //         .catch(err => {
        //             console.log(err,'错误') 
        //         })
        //     // const div = document.createElement('div')
        //     // let form=
        //     // div.innerHTML = form //此处form就是后台返回接收到的数据！
        // }

    }
}
</script>
<style scoped>
.buttonbox{
    width: 100%;
    height: 94px;
    box-sizing: border-box;
    margin: 35px 0 25px 0;
    padding-right: 30px;
}
.buttonbox p{
    font-size: 14px;
    float: left;
    height: 42px;
    border: 1px solid #464646;
    width: 124px;
    color: #464646;
    cursor: pointer;
    text-align: center;
    line-height: 44px;
}
.buttonbox .clearShoppingCart{
    margin-right: 20px;
}
.buttonbox .settleAccounts{
    float: right;
    color: #fff;
    background: #000;
    width: 200px;
}
</style>
