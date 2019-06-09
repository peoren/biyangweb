<template>
  <div class="personal-page-wrap">
    <div class="left-nav" v-if="user != null">
      <ul class="user-msg-hear">
        <li>
          <h5>欢迎回来：{{user.userName+sex}}</h5>
        </li>
        <li>会员状态：注册会员</li>
        <li>账户总积分：{{user.userIntegral}}分</li>
      </ul>
      <ul class="user-msg-middle">
        <li>
          <router-link to="/person_center">我的订单</router-link>
        </li>
        <li>
          <router-link :to="{name:'integral'}">积分信息</router-link>
        </li>
        <li>
          <router-link :to="{name:'comment'}">我的评论</router-link>
        </li>
      </ul>
      <ul class="user-msg-footer">
        <li>
          <router-link :to="{name:'wishlist'}">我的心愿单</router-link>
        </li>
        <li>
          <router-link :to="{name:'userinfo'}">个人信息</router-link>
        </li>
        <li>
          <router-link :to="{name:'address'}">收货地址</router-link>
        </li>
        <li>
          <router-link :to="{name:'changepassword'}">安全中心</router-link>
        </li>
      </ul>
    </div>
    <div class="component-wrap">
      <Loding v-if="loding"/>
      <router-view
        @cancleorder="changeConfirm"
        @refundmoney="changeConfirm"
        @refundGoods="changeConfirm"
        @delorder="changeConfirm"
        @cancleRG="changeConfirm"
        @cancleRM="changeConfirm"
        @clearSessionorder="changeConfirm"
        @clearSeddionordera="changeConfirm"
        @oktorefund="changeConfirm"
        @cancleM="changeConfirm"
        @cancleG="changeConfirm"
        :response="response"
      ></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Loding from "@/components/Loding.vue";
import { constants } from "crypto";
export default {
  name: "home",
  components: {
    Loding
  },
  data() {
    return {
      loding: false,
      confirmState: false,
      response: null,
      user: null,
      sex: ""
    };
  },
  created() {
    this.getData();
  },
  beforeCreated() {
    this.loding = true;
  },
  beforeCreated() {
    this.loding = false;
  },
  mounted() {
    var name = this.$route.fullPath.split("/")[2];
    this.$router.push({ name: name });
  },
  methods: {
    //获取数据
    getData() {
      var _that = this;
      let postData = this.$qs.stringify({
        userToken: sessionStorage.getItem("user_id")
      });
      this.$http
        .post("/pinformation/myinformation", postData)
        .then(res => {
          if (res.data.code == -1) {
            this.$router.push("/");
          }
          _that.user = res.data.data[0];
          if (_that.user.userSex == "男") {
            _that.sex = "先生";
          } else {
            _that.sex = "女士";
          }
        })
        .catch(err => {
          console.log(err);
          console.log("请求失败");
        });
    },
    changeConfirm(data) {
      let _this = this;
      this.confirmState = true;
      this.$confirm({
        type: "提示",
        msg: data,
        btn: {
          ok: "确定",
          no: "取消"
        }
      })
        .then(() => {
          let _this = this;
          _this.confirmState = false;
          if (data == "是否取消该条订单") {
            _this.response = 10;
          } else if (data == "是否删除该条订单") {
            _this.response = 20;
          } else if (data == "是否申请退款") {
            _this.response = 30;
          } else if (data == "是否申请退货退款") {
            _this.response = 40;
          } else if (data == "是否取消退款申请") {
            _this.response = 50;
          } else if (data == "是否取消退货退款申请") {
            _this.response = 60;
          } else if (data == "是否在此取消退款申请") {
            if (sessionStorage.getItem("RefundOrderState") == 1) {
              var postData = _this.$qs.stringify({
                orderNum: sessionStorage.getItem("RefundOrderNum")
              });
              _this.$http
                .post("/pinformation/cancelrefund", postData)
                .then(res => {
                  _this.response = 1001;
                  console.log("res", res);
                  _this.$router.push({ name: "myorder" });
                })
                .catch(err => {
                  console.log(err);
                  _this.response = 1001;
                });
            } else if (sessionStorage.getItem("RefundOrderState") == 0) {
              var postData = _this.$qs.stringify({
                orderInfId: sessionStorage.getItem("RefundOrderNum")
              });
              _this.$http
                .post("/pinformation/orderinfrefund", postData)
                .then(res => {
                  _this.response = 1001;
                  console.log("res", res);
                  _this.$router.push({ name: "myorder" });
                })
                .catch(err => {
                  console.log(err);
                  _this.response = 1001;
                });
            }
          } else if (data == "是否在此取消退货退款申请") {
            if (sessionStorage.getItem("RefundOrderState") == 1) {
              var postData = _this.$qs.stringify({
                orderNum: sessionStorage.getItem("RefundOrderNum")
              });
              _this.$http
                .post("/pinformation/cancelrefund", postData)
                .then(res => {
                  _this.response = 1001;
                  console.log("res", res);
                  _this.$router.push({ name: "myorder" });
                })
                .catch(err => {
                  console.log(err);
                  _this.response = 1001;
                });
            } else if (sessionStorage.getItem("RefundOrderState") == 0) {
              var postData = _this.$qs.stringify({
                orderInfId: sessionStorage.getItem("RefundOrderNum")
              });
              _this.$http
                .post("/pinformation/orderinfrefund", postData)
                .then(res => {
                  _this.response = 1001;
                  console.log("res", res);
                  _this.$router.push({ name: "myorder" });
                })
                .catch(err => {
                  console.log(err);
                  _this.response = 1001;
                });
            }
          } else if (data == "确定在此提交退款申请") {
            var str = sessionStorage.refundstr;
            str = JSON.parse(str);
            var postData = _this.$qs.stringify({
              orderInfId: str.orderInfId,
              orderId: str.orderId,
              refundInstructions: str.refundInstructions,
              refundReason: str.refundReason,
              refundTime: str.refundTime
            });
            _this.$http
              .post("/pinformation/askforrefund", postData)
              .then(res => {
                _this.response = 1001;
                console.log("reshere", res);
                _this.$router.push({ name: "commitrefund" });
              })
              .catch(err => {
                console.log(err);
                _this.response = 1001;
              });
          } else if (data == "确定在此提交退货退款申请") {
            var str = sessionStorage.refundstr;
            str = JSON.parse(str);
            console.log(str, "detail,person,RG");
            let postData = _this.$qs.stringify({
              orderId: str.orderId,
              orderInfId: str.orderInfId,
              refundInstructions: str.refundInstructions,
              refundReason: str.refundReason,
              refundTime: str.refundTime
            });
            _this.$http
              .post("/pinformation/askforregood", postData)
              .then(res => {
                _this.response = 1001;
                console.log("res", res);
                _this.$router.push({ name: "commitrefund" });
              })
              .catch(err => {
                console.log(err);
                _this.response = 1001;
              });
          } else if (data == "是否取消已购该商品的退款申请") {
            this.response = 70;
          } else if (data == "是否取消已购该商品的退货退款申请") {
            this.response = 80;
          } else {
            this.response = 1001;
          }
          setTimeout(function() {
            _this.response = 1001;
          }, 1000);
        })
        .catch(() => {
          this.confirmState = false;
          this.response = 1001;
        });
    }
  }
};
</script>
<style scoped>
.personal-page-wrap {
  font-size: 14px;
  width: 80%;
  min-width: 1024px;
  max-width: 1440px;
  margin: 50px auto;
  height: 100%;
  margin-top: 130px;
}
.personal-page-wrap::before,
.personal-page-wrap::after {
  content: "";
  display: table;
}
.personal-page-wrap::after {
  clear: both;
}
.personal-page-wrap .component-wrap {
  float: right;
  width: 74%;
  padding-top: 50px;
}
.personal-page-wrap .left-nav {
  padding-top: 30px;
  width: 25%;
  float: left;
  background: #f5f5f5;
  height: 100%;
}
.left-nav ul {
  width: 200px;
  margin: 0 auto;
  padding-bottom: 30px;
}
.left-nav ul li {
  margin-top: 20px;
  text-align: left;
  padding-left: 30px;
}
.personal-page-wrap .user-msg-hear li {
  margin-top: 10px;
  font-size: 10px;
}
.personal-page-wrap .user-msg-hear li:first-child {
  margin-bottom: 45px;
  padding: 0;
  text-align: center;
}
.user-msg-middle {
  padding-top: 10px;
  border-top: solid 1px #0000003f;
  border-bottom: solid 1px #0000003f;
}
.user-msg-footer {
  padding-top: 10px;
}
.user-msg-middle a:hover,
.user-msg-footer a:hover {
  text-shadow: 0 0 30px #000000;
}
.personal-page-wrap a {
  color: inherit;
}
</style>
