<template>
  <div class="integral">
    <div class="title">我的积分</div>
    <div class="integralhead">
      <ul>
        <li>消费日期</li>
        <li>商品名称</li>
        <li>数量</li>
        <li>金额</li>
        <li>产生积分</li>
        <!-- <li>积分余额</li> -->
      </ul>
    </div>
    <div class="integrallist">
       <div v-if="userintegral.length==0" class="no">
            您还没有产生积分的订单
          </div>
      <ul v-for="(ele,index) in userintegral" :key="index" v-else-if="userintegral.length>0">
        <li>{{ele.orderPaytime}}</li>
        <li>{{ele.productName}}</li>
        <li>{{ele.orderInfNum}}</li>
        <li>{{ele.productInfPrice}}</li>
        <li>{{count(ele.orderInfNum,ele.productInfPrice)}} </li>
        <!-- <li>{{ele.user_integral}}</li> -->
      </ul>
    </div>
  <!-- <Panel/> -->
  </div>
</template>

<script>
//@ is an alias to /src
import Panel from './Panel.vue'

export default {
  name: "integral",
  data() {
    return {
      userintegral: [
      ],
    };
  },
  created(){
    this.getData();
  },
  methods:{
    //获取数据
     getData(){
       let postData = this.$qs.stringify({
        userToken:sessionStorage.getItem("user_id")
    });
    this.$http
      .post("/pinformation/myintegrals", postData)
      .then(res => {
        this.userintegral = res.data.data;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        console.log("请求失败");
      });
    },
     //计算积分
     count(a,b){
      
          var c=parseInt(a)*parseInt(b)
          if(Boolean(c)==false){
            c=0;
          }
          return c
    },
  },
  components:{
    Panel
  }
};
</script>
<style scoped>

.no{
  font-size: 18px;
  width: 200px;
  padding-top:50px;
  margin: 0 auto; 
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #000;
}
.integral {
  padding-bottom: 50px;
  margin-left: 30px;
  min-width: 738px;
  max-width: 1050px;
  color: #000;
}
.title {
  text-align: left;
  font-size: 24px;
  color: #000;
  line-height: 24px;
}
.integralhead {
  border-bottom: 1px solid #a0a0a0;
  border-top: 1px solid #a0a0a0;
  padding: 20px 0;
  margin-top: 10px;
}
.integralhead li {
 
  display: inline-block;
  font-size: 12px;
  line-height: 18px;
  color: #a0a0a0;
}
.integrallist ul {
  border-bottom: 1px solid #a0a0a0;
}
.integrallist li {
  display: inline-block;
  list-style: none;
  padding: 20px 0;
  font-size: 12px;
}

.integralhead li,
.integrallist li {
  text-align: left;
  /* width: 140px; */
  /* width: calc(16% - 4.8px); */
  width: calc(18%);
}
.integrallist li:first-child{
  width: 28%;
  box-sizing: border-box;
}
.integralhead li:first-child {
  /* width: 140px; */
  width: 28%;
  /* width: calc(20% - 6px); */
  padding-left: 20px;
  box-sizing: border-box;
}
/* .integrallist li:nth-child(1) {
  width: calc(20% - 6px);
} */
.integralhead li:nth-child(6),
.integrallist li:nth-child(6) {
  /* width: 140px; */
    width: 16%;
  /* width: calc(16% - 4.8px); */
  margin-bottom: 8px;
}
</style>
