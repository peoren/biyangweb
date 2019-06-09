<template>
  <div class="neworder">
    <div class="title">
      <div>最近的订单</div>
    </div>
    <div class="orderhead">
      <ul>
        <li>订单号</li>
        <li>金额</li>
        <li>下单时间</li>
        <li>订单状态</li>
        <li>支付方式</li>
        <li>操作</li>
      </ul>
    </div>
    <div v-if="useorder.length==0" class="no">您还购买过商品</div>
    <div class="orderlist" v-else-if="useorder.length>0">
      <ul v-for="(orderone,index) in useorder" :key="index">
        <!-- 订单号 和 数量-->
        <li>
          <div>
            <span>+ 订单号:</span>
            <span :title="orderone.orderNum">{{orderone.orderNum}}</span>
          </div>
          <div>
            <span>{{orderone.orderSize}}</span>
            件商品
          </div>
        </li>
        <!-- 订单金额 -->
        <li>
          <span>{{orderone.orderMoney}}</span>
        </li>
        <!-- 创建订单时间 -->
        <li>
          <span>{{orderone.orderDetime}}</span>
        </li>
        <!-- 订单状态 -->
        <li>
          <a href="#" v-if="orderone.orderState==0">
            <span style="color:#464646">等待付款</span>
          </a>
          <span v-else-if="orderone.orderState==1">付款成功</span>
          <span v-else-if="orderone.orderState==2">交易取消</span>
          <span v-else-if="orderone.orderState==3">订单完成</span>
          <a href="#" v-else-if="orderone.orderState==5">
            <span>发货中</span>
          </a>
          <a href="#" v-else-if="orderone.orderState==6">
            <span>退货中</span>
          </a>
          <a href="#" v-else-if="orderone.orderState==7">
            <span>退款中</span>
          </a>
          <span v-else-if="orderone.orderState==8">退款成功</span>
        </li>
        <!-- 支付方式 -->
        <li>支付宝</li>
        <!-- 操作 -->
        <li>
          <a href="#" v-if="orderone.orderState==0" class="pointer">
            <span>去支付</span>
          </a>
          <p @click="toorderdetatil(orderone.orderNum)" class="pointer">查看订单</p>
          <!-- <router-link to="/person_center/orderdetail"></router-link> -->
          <p
            v-if="orderone.orderState==0"
            @click="cancleorder(orderone.orderNum)"
            class="pointer"
          >取消订单</p>
          <p
            v-else-if="orderone.orderState==1"
            @click="refundmoney(orderone.orderId,orderone.orderNum)"
            class="pointer"
          >申请退款</p>
          <p
            v-else-if="orderone.orderState==5"
            @click="refundGoods(orderone.orderId,orderone.orderNum)"
            class="pointer"
          >申请退货退款</p>
          <p v-if="orderone.orderState==6" @click="cancleRG(orderone.orderNum)" class="pointer">取消退货</p>
          <p v-if="orderone.orderState==7" @click="cancleRM(orderone.orderNum)" class="pointer">取消退款</p>
          <p
            v-if="orderone.orderState==8 | orderone.orderState==2 | orderone.orderState==3"
            @click="delorder(orderone.orderNum)"
            class="pointer"
          >删除</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { constants } from "crypto";
export default {
  name: "neworder",
  props: {
    response: {
      type: Number,
      default: function() {
        return null;
      }
    }
  },
  created() {
    this.getorderData();
  },
  data() {
    return {
      useorder: [],
      orderNumss: null
    };
  },
  // mounted() {orderone
  //   sessionStorage.setItem("userToken",  sessionStorage.getItem("user_id"));
  // },
  methods: {
    getorderData() {
      let _this = this;
      // let postData = _this.$qs.stringify({
      //   userToken: null
      // });
      _this.$http
        .post("/pinformation/myorders")
        .then(res => {
          console.log(res.data.data);
          _this.useorder = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    toorderdetatil(orderNum) {
      sessionStorage.setItem("orderNum", orderNum);
      this.$router.push({ name: "orderdetail" });
    },
    cancleorder(num) {
      this.orderNumss = num;
      this.$emit("cancleorder", "是否取消该条订单");
    },
    delorder(num) {
      this.orderNumss = num;
      this.$emit("delorder", "是否删除该条订单");
    },
    refundmoney(num, orderone) {
      sessionStorage.setItem("orderone", orderone);
      this.orderNumss = num;
      sessionStorage.setItem("RefundOrderNum", num);
      sessionStorage.setItem("RefundOrderState", 1);
    //  sessionStorage.setItem("isDetail",1)
      this.$emit("refundmoney", "是否申请退款");
    },
    refundGoods(num, orderone) {
      sessionStorage.setItem("orderone", orderone);
      this.orderNumss = num;
      sessionStorage.setItem("RefundOrderNum", num);
      sessionStorage.setItem("RefundOrderState", 1);
      // sessionStorage.setItem("isDetail",1)
      this.$emit("refundGoods", "是否申请退货退款");
    },
    cancleRG(num) {
      this.orderNumss = num;
      sessionStorage.setItem("RefundOrderNum", num);
      sessionStorage.setItem("RefundOrderState", 1);
      this.$emit("cancleRG", "是否取消退货退款申请");
    },
    cancleRM(num) {
      this.orderNumss = num;
      sessionStorage.setItem("RefundOrderNum", num);
      sessionStorage.setItem("RefundOrderState", 1);
      this.$emit("cancleRM", "是否取消退款申请");
    },
    formatDate: function() {
      let date = new Date();
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  watch: {
    response: {
      handler(newName, oldName) {
        // 取消订单
        if (newName == 10) {
          let _this = this;
          let postData = _this.$qs.stringify({
            // userToken: sessionStorage.getItem("user_id"),
            orderNum: _this.orderNumss
          });
          _this.$http
            .post("/pinformation/cancelorder", postData)
            .then(res => {
              console.log(res)
              _this.getorderData();
            })
            .catch(err => {
              console.log(err);
            });
          // 删除订单
        } else if (newName == 20) {
          let _this = this;
          let date = _this.formatDate();
          let postData = _this.$qs.stringify({
            // userToken: sessionStorage.getItem("user_id"),
            orderNum: this.orderNumss,
            orderDeltime: date
          });
          _this.$http
            .post("/pinformation/delorder", postData)
            .then(res => {
              console.log(res);
              _this.getorderData();
            })
            .catch(err => {
              console.log(err);
            });
          // 申请退款
        } else if (newName == 30) {
          sessionStorage.setItem("isDetail", 1);
          console.log(sessionStorage.getItem("isDetail"))
          sessionStorage.setItem("RefundOrderNum", this.orderNumss);
          sessionStorage.setItem("RefundWay", 1);
          sessionStorage.setItem("RefundOrderState", 1);

          this.$router.push({ name: "refund"});
          // 申请退货退款
        } else if (newName == 40) {
          sessionStorage.setItem("isDetail", 1);
          sessionStorage.setItem("RefundOrderNum", this.orderNumss);
          sessionStorage.setItem("RefundWay", 0);
          sessionStorage.setItem("RefundOrderState", 1);
          this.$router.push({ name: "refund"});
        } else if (newName == 50) {
          console.log("取消退款");
          let _this = this;
          let postData = _this.$qs.stringify({
            orderNum: this.orderNumss
          });
          _this.$http
            .post("/pinformation/cancelrefund", postData)
            .then(res => {
              _this.getorderData();
            })
            .catch(err => {
              console.log(err);
            });
        } else if (newName == 60) {
          console.log("取消退货退款");
          let _this = this;
          let postData = _this.$qs.stringify({
            orderNum: this.orderNumss
          });
          _this.$http
            .post("/pinformation/cancelregood", postData)
            .then(res => {
              _this.getorderData();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.getorderData();
        }
      }
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.no {
  font-size: 18px;
  width: 200px;
  padding-top: 50px;
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
  margin-left: 30px;
}
.title {
  overflow: hidden;
}
.title > div {
  float: left;
  font-size: 24px;
  color: #000;
  line-height: 24px;
}

.orderhead {
  border-bottom: 1px solid #a0a0a0;
  border-top: 1px solid #a0a0a0;
  padding: 20px 0;
  margin-top: 10px;
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
  /* width: 200px; */
  width: 23%;
}
.orderlist li:first-child > div:last-child {
  margin-left: 65px;
  margin-top: 8px;
  display: inline-block;
}
.orderlist li:first-child > div:first-child {
  height: 20px;
  overflow-x: hidden;
}
.orderlist li:first-child > div:first-child > span {
  height: 20px;
  line-height: 20px;
  float: left;
}
.orderlist li:first-child > div:first-child > span:last-child {
  width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
}
.orderlist li:last-child > p {
  margin-bottom: 8px;
}
.orderhead li:nth-child(2) {
  /* width: 110px; */
  width: 12%;
}
.orderhead li:nth-child(3) {
  /* width: 150px; */
  width: 21%;
}
.orderhead li:nth-child(4) {
  /* width: 140px; */
  width: 14%;
}
.orderhead li:nth-child(5) {
  /* width: 140px; */
  width: 14%;
}
.orderhead li:nth-child(6) {
  /* width: 110px; */
  width: 12%;
}
.orderlist li:nth-child(2) {
  /* width: 110px; */
  width: 12%;
}
.orderlist li:nth-child(3) {
  /* width: 150px; */
  width: 21%;
}
.orderlist li:nth-child(4) {
  /* width: 140px; */
  width: 14%;
}
.orderlist li:nth-child(5) {
  /* width: 140px; */
  width: 14%;
}
.orderlist li:nth-child(6) {
  /* width: 110px; */
  width: 12%;
}
.orderlist li:nth-child(6) > a {
  display: block;
  margin-bottom: 8px;
}
</style>
