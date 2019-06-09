<template>
  <div class="orderdetail" v-if="order.length>=1">
    <div class="order-speed">
      <div class="order-head">
        <ul v-if="order[0].orderState == 2" class="colorgray">
          <li>已作废</li>
        </ul>
        <ul v-else>
          <li v-if="order[0].orderState == 0" class="colorgray">提交订单</li>
          <li v-else>提交订单</li>
          <li>
            <img :src="url" alt>
          </li>
          <li v-if="order[0].orderState == 1" class="colorgray">付款成功</li>
          <li v-else>付款成功</li>
          <li>
            <img :src="url" alt>
          </li>
          <li v-if="order[0].orderState== 6 " class="colorgray">退货</li>
          <li v-else-if="order[0].orderState == 7 ">退货</li>
          <li v-if="order[0].orderState== 6 | order[0].orderState == 7 ">
            <img :src="url" alt>
          </li>
          <li v-if="order[0].orderState == 7 " class="colorgray">退款</li>
          <li v-else-if="order[0].orderState == 6">退款</li>
          <li v-else-if="order[0].orderState == 5" class="colorgray">发货中</li>
          <li
            v-if="order[0].orderState == 1 | order[0].orderState == 0 | order[0].orderState == 3"
          >发货</li>
          <li v-if="order[0].orderState == 8">退款成功</li>
          <li>
            <img :src="url" alt>
          </li>
          <li v-if="order[0].orderState == 3 | order[0].orderState == 8" class="colorgray">订单完成</li>
          <li v-else>完成</li>
        </ul>
      </div>
      <div class="order-num">
        <div>
          <span>{{order[0].orderPaytime}}</span>
          <span>订单创建成功！</span>
        </div>
        <!-- <div v-if="order[0].orderState == 3">
          <span>{{order[0].goods_endtime}}</span>
          <span>订单已完成</span>
        </div>-->
        <!-- <div v-else-if="order[0].orderState == 3">
          <span>{{order[0].goods_refundtime}}</span>
          <span>已完成退款</span>
        </div>
        <div v-else-if="order[0].orderState == 2">
          <span>{{order[0].goods_endtime}}</span>
          <span>订单取消(订单支付超时，自动取消)</span>
        </div>-->
      </div>
      <div class="order-detail">
        <div>
          <span>订单号:</span>
          <span>{{order[0].orderNum}}</span>
        </div>
        <div>
          <span>订单金额:</span>
          <span>{{order[0].orderMoney}}</span>
        </div>
        <div>
          <span>订单状态:</span>
          <span v-if="order[0].orderState == 1">付款成功</span>
          <span v-else-if="order[0].orderState == 0">未付款 [未发货]</span>
          <span v-else-if="order[0].orderState == 2">交易取消</span>
          <span v-else-if="order[0].orderState == 3">订单完成</span>
          <span v-else-if="order[0].orderState == 5">发货中</span>
          <span v-else-if="order[0].orderState == 6">退货中</span>
          <span v-else-if="order[0].orderState == 7">退款中</span>
          <span v-else-if="order[0].orderState == 8">退款成功</span>
        </div>
        <div v-if="order[0].orderState == 0">
          <p>说明: 您选择了支付宝支付付款，请尽快扫码付款。</p>
        </div>
      </div>
      <div class="subtn">
        <div>
          <a href="#" v-if="order[0].orderState == 0||order[0].orderState == 2">去付款</a>
          <a href="/person_center/commitrefund" v-else-if="order[0].orderState == 6">查看退货进度</a>
          <a href="/person_center/commitrefund" v-else-if="order[0].orderState == 7">查看退款进度</a>
          <a href="/" v-else>继续购物</a>
        </div>
      </div>
    </div>
    <div class="orderInfo">
      <div class="orderInfo_inner">
        <div class="orderInfoTit">收货信息</div>
        <div class="orderInfoList">
          <div class="orderInfoItem">
            <span>收货人:</span>
            <span>{{order[0].addressName}}</span>
          </div>
          <div class="orderInfoItem">
            <span>联系电话:</span>
            <span>{{order[0].addressPhone}}</span>
          </div>
          <div class="orderInfoItem">
            <span>收货地址:</span>
            <span>{{order[0].addressProvince}}{{order[0].addressProvince}}{{order[0].addressCity}}{{order[0].addressCounty}}{{order[0].addressDtaddress}}</span>
          </div>
        </div>
      </div>
      <div class="orderInfo_inner">
        <div class="orderInfoTit">配送方式</div>
        <div class="orderInfoList">
          <div class="orderInfoItem">
            <span>配送方式:</span>
            <span>快递</span>
          </div>
          <div class="orderInfoItem">
            <span>运费:</span>
            <span>¥ 20.00</span>
          </div>
        </div>
      </div>
      <div class="orderInfo_inner">
        <div class="orderInfoTit">支付方式</div>
        <div class="orderInfoList">
          <div class="orderInfoItem">
            <span>支付方式:</span>
            <span>支付宝支付</span>
          </div>
        </div>
      </div>
    </div>
    <div class="myCar">
      <div class="myCar-head">
        <ul>
          <li>商品清单</li>
          <li>价格</li>
          <li>数量</li>
          <li>总计</li>
        </ul>
      </div>
      <div class="myCar-list">
        <ul v-for="(ele,index) in order" :key="index">
          <li>
            <a href="#">
              <img :src="ele.productDefPic" alt>
            </a>
            <div>
              <div>{{ele.secondlevelEname}}</div>
              <div>{{ele.productName}}</div>
              <div>
                <span>{{ele.productFormat}}</span>
              </div>
            </div>
          </li>
          <li>
            <span>¥{{ele.productInfPrice}}</span>
          </li>
          <li>
            <span>{{ele.orderInfNum}}</span>
          </li>
          <li>
            <span>¥{{ele.productInfPrice * ele.orderInfNum}}</span>
            <p
              v-if="order[0].orderInfState == 3 "
              @click="refundGoods(ele.orderInfId,ele.orderId)"
              class="pointer"
            >申请退货退款</p>
            <p
              v-else-if="order[0].orderInfState == 2"
              @click="refundmoney(ele.orderInfId,ele.orderId)"
              class="pointer"
            >申请退款</p>
            <p
              v-else-if="order[0].orderInfState == 5"
              @click="cancleM(ele.orderInfId,ele.orderId)"
              class="pointer"
            >取消退款申请</p>
            <p
              v-else-if="order[0].orderInfState == 4"
              @click="cancleG(ele.orderInfId,ele.orderId)"
              class="pointer"
            >取消退货退款申请</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="orderBottom">
      <div class="priceTop">
        <div class="PriceEnd">
          <div>
            <label>商品总金额：</label>
            <span class="ProRegularNum">¥{{order[0].orderMoney+integral(order[0].orderUsein-20)}}</span>
          </div>
          <div>
            <label>运费：</label>
            <span class="ProRegularNum">¥ 20.00</span>
          </div>
          <div>
            <label>订单优惠：</label>-
            <span class="ProRegularNum">¥ {{integral(order[0].orderUsein)}}</span>
          </div>
          <div>
            <label>实际支付金额：</label>
            <span class="ProRegularNum">¥{{order[0].orderMoney}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { constants } from "crypto";
export default {
  name: "orderdetail",
  props: {
    response: {
      type: Number,
      default: function() {
        return null;
      }
    }
  },
  data() {
    return {
      url: require("@/assets/bigjiantou.png"),
      order: [],
      orderId: null,
      orderInfId: null
    };
  },
  computed: {
    integral(num) {
      return function(num) {
        if (num == undefined) {
          console.log("//");
        }
        if (num == null) {
          return "";
        }
        return parseInt(num / 100);
      };
    }
  },
  created() {
    let orderNum = sessionStorage.getItem("orderNum");
    console.log(orderNum);
    this.getorderDetail(orderNum);
  },
  mounted() {
    for (let index = 0; index < this.order.length; index++) {
      this.order[index].productDefPic = require("@/assets/" +
        this.order[index].productDefPic);
    }
  },
  methods: {
    getorderDetail(orderNum) {
      console.log(orderNum);
      let _this = this;
      let postData = _this.$qs.stringify({
        // userToken: sessionStorage.getItem("user_id"),
        orderNum: orderNum
      });
      _this.$http
        .post("/pinformation/orderinfo", postData)
        .then(res => {
          console.log(res);
          _this.order = res.data.data;
          sessionStorage.setItem("orderone", orderNum);
          sessionStorage.orderDetail = JSON.stringify(_this.order);
        })
        .catch(err => {
          console.log(err);
          console.log("err");
        });
    },
    refundmoney(orderInfId, orderId) {
      sessionStorage.setItem("RefundOrderNum", orderId);
      sessionStorage.setItem("RefundOrderNumtwo", orderInfId),
        sessionStorage.setItem("RefundOrderState", 0);
        console.log('dohere')
      for (var i = 0; i < this.order.length; i++) {
        if (this.order[i].orderInfId == orderInfId) {
          var emm = this.order;
          this.order[i] = JSON.stringify({ emm });
          sessionStorage.setItem("isDetail", this.order[i]);
        }
      }
      this.$emit("refundmoney", "是否申请退款");
    },
    refundGoods(orderInfId, orderId) {
      sessionStorage.setItem("RefundOrderNum", orderId);
      sessionStorage.setItem("RefundOrderNumtwo", orderInfId);
      sessionStorage.setItem("RefundOrderState", 0);

      for (var i = 0; i < this.order.length; i++) {
        if (this.order[i].orderInfId == orderInfId) {
          var emm = this.order;
          this.order[i] = JSON.stringify({ emm });
          sessionStorage.setItem("isDetail", this.order[i]);
        }
      }
      this.$emit("refundGoods", "是否申请退货退款");
    },
    cancleM(orderInfId, orderId) {
      this.orderInfId = orderInfId;
      this.orderId = orderId;
      this.$emit("cancleM", "是否取消已购该商品的退款申请");
    },
    cancleG(orderInfId, orderId) {
      this.orderInfId = orderInfId;
      this.orderId = orderId;
      this.$emit("cancleG", "是否取消已购该商品的退货退款申请");
    }
  },
  watch: {
    response: {
      handler(newName, oldName) {
        if (newName == 30) {
          console.log("nenen?")
          sessionStorage.setItem("RefundWay", 1);
          this.$router.push({ name: "refund" });
        } else if (newName == 40) {
          sessionStorage.setItem("RefundWay", 0);
          this.$router.push({ name: "refund" });
        } else if (newName == 70) {
          // 取消发送退款请求
          console.log(this.orderInfId, this.orderId);
          let _this = this;
          let postData = _this.$qs.stringify({
            orderInfId: this.orderInfId,
            orderId: this.orderId
          });
          _this.$http
            .post("/pinformation/orderinfrefund", postData)
            .then(res => {
              console.log(res);
              let orderNum = sessionStorage.getItem("orderNum");
              _this.getorderDetail(orderNum);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (newName == 80) {
          // 取消发送退货退款请求
          console.log(this.orderInfId, this.orderId);
          let _this = this;
          let postData = _this.$qs.stringify({
            orderInfId: this.orderInfId,
            orderId: this.orderId
          });
          _this.$http
            .post("/pinformation/orderinfregood", postData)
            .then(res => {
              console.log(res);
              let orderNum = sessionStorage.getItem("orderNum");
              _this.getorderDetail(orderNum);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("do nothing");
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
* {
  margin: 0;
  padding: 0;
}
.orderdetail {
  margin-left: 30px;
  min-width: 738px;
  max-width: 1050px;
}
.colorgray {
  color: #454545;
}
.order-speed {
  background: #fafafa;
  text-align: left;
}
.order-head {
  padding-left: 20px;
  color: #a0a0a0;
  padding-top: 28px;
  padding-left: 20px;
}
.order-head > ul {
  overflow: hidden;
  font-size: 24px;
}
.order-speed ul > li {
  float: left;
}
.order-speed ul > li > img {
  margin: 2px 20px;
  width: 9px;
  height: 23px;
}
.order-num {
  border-bottom: 1px solid #a0a0a0;
  padding: 20px 0 30px 0;
  margin-left: 20px;
  color: #585858;
  font-size: 12px;
}
.order-num > div > span {
  display: inline-block;
  margin-right: 15px;
  /* font-size: 12px; */
}
.order-detail {
  margin: 0 20px;
  /* border-top: 1px solid #a0a0a0; */
  font-size: 12px;
  color: #595959;
  line-height: 27px;
  padding-top: 20px;
}
.order-detail > div > span:first-child {
  letter-spacing: 3px;
  display: inline-block;
  width: 104px;
}
.subtn {
  padding-left: 20px;
  padding-top: 14px;
  padding-bottom: 30px;
  height: 35px;
}
.subtn > div {
  width: 137px;
  height: 35px;
  background: #000;
  text-align: center;
  margin-right: 20px;
}
.subtn > div > a {
  color: #fff;
  white-space: nowrap;
  vertical-align: middle;
  text-decoration: none;
  font-size: 12px;
  line-height: 35px;
  height: 35px;
}
.orderInfo {
  margin: 20px 0 30px 0;
  text-align: left;
}
.orderInfo_innder {
  margin-bottom: 30px;
}
.orderInfoTit {
  padding: 15px 0 15px 23px;
  border-top: 1px solid #a0a0a0;
  border-bottom: 1px solid #a0a0a0;
  color: #a0a0a0;
  font-size: 12px;
}
.orderInfoList {
  padding: 20px 0px 0px 23px;
}
.orderInfoItem {
  margin-bottom: 15px;
}
.orderInfoItem > span {
  display: inline-block;
  font-size: 12px;
  color: #464646;
}
.orderInfoItem > span:first-child {
  width: 105px;
}
ul {
  width: 100%;
  border-top: 1px solid #a0a0a0;
  border-bottom: 1px solid #a0a0a0;
  padding: 15px 0 15px 23px;
  color: #a0a0a0;
  display: block;
  font-size: 12px;
  overflow: hidden;
  box-sizing: border-box;
}
.myCar {
  width: 100%;
  text-align: left;
}
.myCar-list li {
  float: left;
  color: #464646;
}
.myCar-list > ul > li:first-child,
.myCar-head > ul > li:first-child {
  width: 58%;
}
.myCar-list > ul > li,
.myCar-head > ul > li {
  width: 14%;
  float: left;
  vertical-align: top;
}
.myCar-list img {
  width: 23%;
  float: left;
  margin-right: 40px;
  display: block;
  border: 0;
}
.myCar-list li > div {
  margin-top: 6px;
  float: left;
  color: #464646;
}
.myCar-list li > div > div:nth-child(2) {
  font-size: 14px;
  margin: 6px 0;
}
.myCar-list > ul > li:nth-child(2) {
  padding-top: 8px;
  font-size: 12px;
}
.myCar-list > ul > li:nth-child(3) > span {
  margin-top: 7px;
  display: block;
  margin-left: 7px;
}
.myCar-list > ul > li:last-child {
  padding-top: 8px;
  font-size: 12px;
}
.myCar-list > ul > li:last-child > p {
  margin-top: 30px;
  color: #2c3e50;
}
.orderBottom {
  padding-bottom: 150px;
}
.priceTop {
  overflow: hidden;
  border-bottom: 1px solid #a0a0a0;
  padding: 25px 0;
}

.PriceEnd {
  float: right;
  font-size: 12px;
}
</style>
