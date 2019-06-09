<template >
  <!-- 单个商品组件 -->
  <div id="sgoods" class="goods">
    <img @click.stop='todetail' class="banner" :src=masg.productDefPic alt=""> 
    <div class="secnd">
      {{masg.secondLevelName}}
    </div>
    <div class="goodsname">
      {{masg.productName}}
    </div>
    <div class="price">
      <span class="pricespan">￥{{masg.productDefPrice}}/</span>
      <span class="spec" >{{masg.productDefFormat}}</span>
    </div>
  
    <div>
      <transition name="tiled">
        <div  v-if="masg.close==1" class="buy" @click.stop="buy"  title="btnn">  
            立即购买
        </div>
      </transition>
      <transition name="fade">
        <div v-if="masg.close==2" class="size" >
          <drop @dotransmit='dotransmit' @doamount ='doamount' :defau='defau'  :colors='Colors' />
          <div class="clear"> 
            <div v-if="tab==0" class="purchase btnr " @click.stop="none" >暂时缺货</div>
            <div v-if="tab>0" class="purchase btnr " @click.stop='tobuy' >立即购买</div>
             <div v-if="tab==0" class="shoppingcat  btnr"  @click.stop="none">暂时缺货</div>
            <div v-if="tab>0" class="shoppingcat  btnr" @click.stop="shoppingcart" >加入购物袋</div>
          </div>
        </div>
      </transition> 
    </div>
  </div>
</template>
<style scoped>

.goods {
  width: 25%;
  height: 540px;
  margin:30px 0 0  0; 
}
.banner {
  width:100%;
  cursor: pointer;
}
.price {
  color: #999999;
  font-size: 18px;
  line-height: 30px;
  height: 30px;
}
.dd{
  width: 17px;
  position: relative;
  bottom: 20px;
  cursor: pointer;
}
.secnd {
  color: #999999;
  font-size: 20px;
  line-height: 30px;
  height: 30px;
  font-weight:500; 
}
.goodsname {
  font-size: 16px;
  line-height: 30px;
  font-size: 16px;
  color: #000;
}
.buy {
  width: 144px;
  height: 44px;
  line-height: 44px;
  border: 1px solid #000;
  font-size: 14px;
  margin: auto;
  cursor: pointer;
}
.buy:hover {
  border: 1px solid rgb(156, 134, 60);
  color:  rgb(156, 134, 60);
}
.siz {
  transition: height 1s;
}
.size select {
  width: 50%;
  height:44px;
  outline: none;
}
/* 立即购买 */
.purchase {
  width: 100%;
  height: 44px;
  background: #000;
  color: white;
  line-height: 44px;
  font-size: 14px;
  margin: 10px auto;
  cursor: pointer;
}
/* 加入购物袋 */
.shoppingcat{
  width: 100%;
  height: 44px;
  border:1px solid #000;
  color:#000;
  line-height: 44px;
  font-size: 14px;
  margin: 10px auto;
  cursor: pointer;
}
.shoppingcat:hover {
   border: 1px solid rgb(156, 134, 60);
  color:  rgb(156, 134, 60);
}
.left {
  float: left;
}
.right {
  float: right ;
}
.fade-enter-active  {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
 .tiled-enter-to {
  transition: opacity 1s;
}
 /* .tiled-leave-to {
  opacity: 0;
} */

</style>
<script>
import drop from './Buy.vue'
import { setInterval, setTimeout } from 'timers';
import { type } from 'os';
export default {

  name:'sgoods',
  props:[ 'masg'],
  components: {
    drop
  },
  data() {
    return {
       amount:1,
       transmit:'',
        Colors:[],
        defau:'',
        tab:0,
    }
  },
  created(){ 
  },
  mounted() {
    var _this = this
    //取消购买展示
    window.onclick = function(ev) {
      _this.masg.close = 1
      _this.$emit('dochange')
    }
  },

  methods:{
    //上传色号
    dotransmit(data){
      this.transmit=data;
      this.$http.get('/product/productformat?product_inf_id='+this.transmit)
      .then(res=>{
        // console.log(res.data)
        this.masg.productDefPic=res.data.data[0].productInfBpic
        this.tab=res.data.data[0].stockNum;
        // this.Colors=res.data.data[0].productInfSpic
         
      })
    },
    doamount(data){
      this.amount=data;
    },
    //无操作
    none(){
       this.masg.close = 2
    },
    //加载规格数据
    buy(){
      var uplode = this.masg.index;
      this.transmit=1;
      this.$emit('dochange',uplode)
      this.$http.get('/product/productPay?product_id='+this.masg.productId)
      .then(res=>{
          this.Colors = res.data.data.list;
          this.defau = res.data.data.list[0];
       
      })
    },
    //加入购物车
    shoppingcart(){
      this.masg.close=1;
       
      
      let that = this;
      console.log(this.amount,this.transmit)
      // console.log(this.transmit,this.amount)
     let postData = this.$qs.stringify({
                   product_inf_id:this.transmit,
                  //  userToken:'11',
                   product_num:this.amount
                })
      this.$http.post('/shopping/addtocart',postData)
      .then(res=>{
        console.log(res.data)
        if(res.data.code==1){
          this.$modal({
            msg:'加入购物袋成功',
            type:'successful'
          })
        }else if (res.data.code==-1){
           this.$modal({
            msg:'购物袋数量上限',
            type:'fail'
          })
        }
        this.amount=1
      })
       .catch(err=>{
         console.log('3333333')
       })
    },
    //详情
    todetail() {
      this.$router.push('/detail/'+this.masg.productId)
    },
    //购买
    tobuy(){
       let settlementData=[]
       let temp={
                  productInfId:this.masg.productId,
                  proNum:this.amount
                }
         settlementData.push(temp)
         console.log(settlementData);
     this.$router.push({
       name:'toorder',
       params: {
         settlementData:settlementData
       }
     })
    }
  }
}
</script>