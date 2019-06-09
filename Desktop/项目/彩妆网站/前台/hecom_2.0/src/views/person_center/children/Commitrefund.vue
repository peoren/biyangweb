<template>
  <div class="commitrefund">
    <div>
      <p>等待商家确认</p>
      <p>
        剩余时间：
        <span class="red">{{timeText}}</span>
      </p>
    </div>
    <div class="crhead">
      <p>
        您已成功发起
        <span v-if="refundorder[0].order_state == 6">退货退款</span>
        <span v-if="refundorder[0].order_state == 7">退款</span>
        申请，请耐心等待商家处理
      </p>
    </div>
    <ul>
      <li>商家同意或者超时未处理，系统将退款给您</li>
      <li>如果商家拒绝，您可以修改退款申请后再次发起，商家会重新处理</li>
    </ul>
    <!-- <div class="change">
      <div @click="truntorefund">
        <span>修改申请</span>
      </div>
    </div> -->
    <div class="info">
      <div>退款信息</div>
      <ul v-for="(ele,index) in goodsnew" :key="index">
        <li class="fl">
          <img :src="ele.productDefPic" alt>
        </li>
        <li class="fll">
          <p>{{ele.secondlevelEname}}</p>
          <p>{{ele.productName}}</p>
        </li>
      </ul>
      <div>
        <span>退款原因:</span>
        <span>{{refundorder[0].refund_reason}}</span>
      </div>
      <div>
        <span>退款金额:</span>
        <span>¥ {{refundorder[0].goods_price}}</span>
      </div>
      <div>
        <span>申请退款时间</span>
        <span>{{refundorder[0].goods_refundtime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "commitrefund",
  data() {
    return {
      isdetail: null,
      startTime: "2019-4-24 12:55:45",
      timeText: "",
      timer: null,
      goodsnew: [],
      refundorder: [
        {
          order_id: 123456,
          order_state: 7,
          goods_Ename: "Hydro-Softening Lotion",
          goods_Cname: "光采保湿露（湿润型）",
          goods_price: 234.99,
          goods_refundtime: "2014-02-14 12:09",
          goods_src: "dingdan.png",
          goods_src_new: "",
          refund_reason: "多拍/错拍不想要"
        }
      ]
    };
  },
  created() {
    this.startTime = sessionStorage.getItem("refundtime");
    for (let index = 0; index < this.refundorder.length; index++) {
      this.refundorder[index].goods_src_new = require("@/assets/" +
        this.refundorder[index].goods_src);
    }
    // let orderNum = sessionStorage.getItem("orderNum");
    var isdetail = sessionStorage.getItem("isDetail");
    if (isdetail == 1) {
      this.getorderDetail(sessionStorage.getItem("orderone"));
    } else {
      this.isdetail = JSON.parse(isdetail);
      this.goodsnew.push(this.isdetail.emm[0]);
      this.price = this.goodsnew[0].orderMoney;
      console.log(this.goodsnew);
    }
    let _this = this;
    var orderIdm = sessionStorage.getItem("RefundOrderNum");
    var orderInfIdm = sessionStorage.getItem("RefundOrderNumtwo");
    let postData = this.$qs.stringify({
      orderInfId: orderInfIdm,
      orderId: orderIdm
    });
    this.$http
      .get("/orders/selectrefund", postData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getorderDetail(orderone) {
      console.log(orderone);
      let _this = this;
      let postData = _this.$qs.stringify({
        // userToken: sessionStorage.getItem("user_id"),
        orderNum: orderone
      });
      _this.$http
        .post("/pinformation/orderinfo", postData)
        .then(res => {
          console.log(res);
          _this.goodsnew = res.data.data;
          console.log(_this.goodsnew);
        })
        .catch(err => {
          console.log(err);
        });
    },
    time(time) {
      var _that = this;
      var time = _that.startTime;
      var endDate =
        new Date(time.replace(/-/g, "/")).getTime() + 48 * 60 * 60 * 1000;
      var nowDate = new Date().getTime();
      var residue = endDate - nowDate; //计算剩余的毫秒数
      if (residue < 0) {
        _that.timeText = "已成功退款";
        return;
      }
      var days = parseInt(residue / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      var hours = parseInt((residue / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
      var minutes = parseInt((residue / 1000 / 60) % 60, 10); //计算剩余的分钟
      var seconds = parseInt((residue / 1000) % 60, 10); //计算剩余的秒数
      days = checkTime(days);
      hours = checkTime(hours);
      minutes = checkTime(minutes);
      seconds = checkTime(seconds);
      _that.timeText =
        days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
      function checkTime(i) {
        //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
    },
    truntorefund() {
      this.$router.push({ name: "refund" });
      console.log(sessionStorage.getItem("RefundOrderNum"));
    }
  },
  mounted() {
    var _that = this;
    _that.timer = setInterval(_that.time, 1000);
  },
  beforeDestory() {
    clearInterval(_that.timer).bind(this);
  }
};
</script>

<style scoped>
.red {
  color: #ff4400;
}
.commitrefund {
  margin-left: 30px;
}
.commitrefund > div:first-child {
  background: #f4f4f4;
  color: #2c3e50;
  padding: 20px 20px;
  text-align: left;
  font-size: 18px;
}
.crhead span,
.commitrefund > div:first-child span {
  color: rgb(238, 101, 101);
}
.crhead {
  color: #2c3e50;
  text-align: left;
  margin: 20px 0;
}
.commitrefund > ul {
  color: #a0a0a0;
  text-align: left;

  /* list-style: ; */
}
.commitrefund > ul > li {
  list-style-type: circle;
  margin: 10px 20px;
}
.change {
  overflow: hidden;
}
.change > div {
  width: 137px;
  height: 35px;
  background: #000;
  float: right;
  margin: 20px 0;
}
.change span {
  color: #fff;
  line-height: 35px;
}
.info {
  text-align: left;
}
.info > div {
  margin: 10px 0;
}
.info span {
  font-size: 12px;
  color: #a0a0a0;
}
.info > ul {
  border-top: 1px solid #a0a0a0;
  border-bottom: 1px solid #a0a0a0;
  margin-top: 10px;
  overflow: hidden;
}
.fl {
  float: left;
  width: 20%;
}
.fll {
  float: left;
  margin-top: 6%;
}
.fll > p {
  margin-bottom: 20px;
}
.fl > img {
  width: 100%;
}
</style>
