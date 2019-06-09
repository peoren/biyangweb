<template>
  <div class="child-msg-wrap">
    <div class="neworder">
      <div class="orderhead">
        <ul>
          <li>订单号</li>
          <li>商品名</li>
          <li style="text-align:center">下单时间</li>
          <li>订单状态</li>
          <li>支付方式</li>
          <li>操作</li>
        </ul>
      </div>
      <div v-if="commentlist.length==0" class="no">
       暂无未评论的商品
      </div>
      <div class="orderlist" v-if="commentlist.length>0">
        <ul v-for="(item,index) in commentlist" :key="index">
          <li>
            <div>
              + 订单号:
              <span :title="item.orderNum">{{splice(item.orderNum)}}....</span>
            </div>
          </li> 
          <li>
            <span>{{item.productName}}</span>
          </li>
          <li style="text-align:center;">
            <span>{{item.orderPaytime}}</span>
          </li>
          <li>
            <span>订单完成</span>
          </li>
          <li>支付宝</li>
          <li>
            <router-link :to='{name:"writecomment",params:{itemData:item}}'>去评论</router-link>
          </li>
          <!-- <div>{{item}}</div> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gocomment",
  data() {
    return {
      commentlist: []
    };
  },
  created() {
    this.getData();
  },
  methods:{
    //获取数据
    getData(){
       let postData = this.$qs.stringify({
        userToken: sessionStorage.getItem("user_id")
    });
    this.$http
      .post("/pinformation/nocomments", postData)
      .then(res => {
        this.commentlist=res.data.data;
        console.log(res)
      })
      .catch(err => {
        console.log(err);
        console.log("请求失败");
      });
    },
    //截取字符串
     splice(string){
        return string.substring(0,6)
    }
  },
  computed:{
   
  },
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
a {
  text-decoration: none;
  color: #000;
}
.neworder {
  margin: 0 auto;
  min-width: 716.8px;
  max-width: 1008px;
  text-align: left;
}

.orderhead {
  border-bottom: 1px solid #a0a0a0;
  border-top: 1px solid #a0a0a0;
  padding: 20px 0;
  margin-top: 40px;
}
.orderhead ul {
  overflow: hidden;
  height: 18px;
}
.orderhead li {
  float: left;
  list-style: none;
  color: #a0a0a0;
  font-size: 12px;
  line-height: 18px;
}
.orderhead ul > li:first-child {
  padding-left: 20px;
  width: 23%;
  box-sizing: border-box;
}
.orderlist ul {
  overflow: hidden;
  border-bottom: 1px solid #a0a0a0;
  font-size: 12px;
}
.orderlist li {
  float: left;
  list-style: none;
  color: #464646;
  font-size: 12px;
  padding: 20px 0;
}
.orderlist li:first-child {
  width: 23%;
}
.orderhead li:nth-child(2) {
  width: 12%;
}
.orderhead li:nth-child(3) {
  width: 17%;
}
.orderhead li:nth-child(4) {
  width: 16%;
}
.orderhead li:nth-child(5) {
  width: 16%;
}
.orderhead li:nth-child(6) {
  width: 12%;
}
.orderlist li:nth-child(2) {
  width: 12%;
}
.orderlist li:nth-child(3) {
  width: 17%;
}
.orderlist li:nth-child(4) {
  width: 16%;
}
.orderlist li:nth-child(5) {
  width: 16%;
}
.orderlist li:nth-child(6) {
  width: 12%;
}
.orderlist li:nth-child(6) > a {
  display: block;
  margin-bottom: 8px;
}
</style>
