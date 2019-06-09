<template>
  <div class="refund" >
    <div class="title" v-if="refundway == 1">申请退款</div>
    <div class="title" v-if="refundway == 0">申请退货退款</div>
    <div class="refundhead">
      <ul v-for="(ele,index) in goodsnew" :key="index">
        <li class="fl">
          <img :src="ele.productDefPic" alt>
        </li>
        <li class="fll">
          <p>{{ele.productName}}</p>
          <p>{{ele.secondlevelEname}}</p>
        </li>
        <li class="fll">
          <p>规格:{{ele.productFormat}}</p>
          <p>总金额:¥{{ele.productInfPrice * ele.orderInfNum }}</p>
        </li>
      </ul>
    </div>
    <div class="refundbody">
      <div class="bodyone">
        <div class="fll">退款原因</div>
        <div class="fr selectbox">
          <select v-if="refundway == 1" v-model="refundreason">
            <option value="0" disabled selected>请选择</option>
            <option v-for="(ele,index) in selectlistone" :key="index" :value="ele">{{ele}}</option>
          </select>
          <select v-if="refundway == 0" v-model="refundreason">
            <option value="0" disabled selected>请选择</option>
            <option v-for="(ele,index) in selectlisttwo" :key="index" :value="ele">{{ele}}</option>
          </select>
        </div>
        <div class="inputreason" v-if="refundreason == '其他'">
          <input type="text" v-model="refundinputR" placeholder="请输入其他原因">
        </div>
      </div>
      <div class="bodytwo">
        <span>退款金额:</span>
        <span class="red">¥ {{price}}</span>
        <p v-if="last">最多{{price + 20}}，包含邮费¥20.00</p>
        <p v-else>最多{{price}}，包含邮费¥0.00</p>
      </div>
      <div class="bodythree">
        <span>退款说明:</span>
        <input type="text" v-model="inputtext" class="whatinput" placeholder="请填写退款说明">
      </div>
      <div class="bodyfour">
        <form enctype="multipart/form-data">
          <div class="form-group">
            <label class="control-label">上传凭证</label>
            <div class="control-form">
              <p class="help-block">(建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传4张)</p>
              <ul class="upload-imgs">
                <li v-if="imgLen>=4 ? false : true">
                  <input
                    type="file"
                    class="upload"
                    @change="addImg"
                    ref="inputer"
                    multiple
                    accept="image/png, image/jpeg, image/gif, image/jpg"
                  >
                  <a class="add">
                    <i class="iconfont icon-plus"></i>
                    <p>点击上传</p>
                  </a>
                </li>
                <li v-for="(value, key) in imgs" :key="key">
                  <p class="img">
                    <img :src="getObjectURL(value)">
                    <a class="close" @click="delImg(key)">×</a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="refundbottom">
      <div @click="submit">提交</div>
    </div>
    <div class="refundcancle">
      <div v-if="refundway == 1" @click="clearSessionorder">取消退款</div>
      <div v-if="refundway == 0" @click="clearSeddionordera">取消退货退款</div>
    </div>
  </div>
</template>

<script>
import { constants } from "crypto";
import { copyFile } from "fs";
export default {
  name: "refund",
  data() {
    return {
      isdetail: null,
      orderone: null,
      goods: [
        {
          goods_Ename: "Hydro-Softening Lotion",
          goods_Cname: "光采保湿露（湿润型）",
          goods_price: 234.99,
          order_discount: 13.99,
          goods_count: 1,
          goods_src: "dingdan.png",
          goods_src_new: "",
          order_express_m: 20
        }
      ],
      goodsnew: [],
      selectlistone: [
        "拍多了不想要",
        "未安约定发货",
        "快递/物流无跟踪记录",
        "空包裹",
        "快递/物流一直未送到",
        "货物破损已拒签",
        "其他"
      ],
      selectlisttwo: [
        "商品规格与描述不符",
        "颜色/型号与描述不符",
        "做工粗糙/有瑕疵",
        "质量问题",
        "商品少件(含缺少配件)",
        "收到商品时有破损/污渍/变形/异味",
        "发票问题",
        "发错商品",
        "其他"
      ],
      orderDetail: null,
      last: false,
      price: 0,
      refundway: null,
      RefundOrderState: null,
      inputtext: "",
      refundreason: 0,
      refundinputR: null,
      formData: null,
      imgs: {},
      imgLen: 0,
      // 存储退货退款数据
      str: {}
      //   state:1,  //退款
      //   state: 0 //退货
    };
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
          _this.price = _this.goodsnew[0].orderMoney
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearSessionorder() {
      this.$emit("clearSessionorder", "是否在此取消退款申请");
    },
    clearSeddionordera() {
      this.$emit("clearSeddionordera", "是否在此取消退货退款申请");
    },
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      if (len > 4) {
        alert("最多可上传4张，您还可以上传" + (4 - oldLen) + "张");
        return false;
      }
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 5 * 1024 * 1024) {
          alert("请选择5M以内的图片！");
          return false;
        }
        this.imgLen++;
        this.$set(
          this.imgs,
          this.fil[i].name + "?" + new Date().getTime() + i,
          this.fil[i]
        );
      }
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    delImg(key) {
      this.$delete(this.imgs, key);
      this.imgLen--;
    },
    submit() {
      var NumId = null;
      this.formData = new FormData();
      for (let key in this.imgs) {
        let name = key.split("?")[0];
        this.formData.append("userfile", this.imgs[key], name);
      }
      // 退款
      if (sessionStorage.getItem("RefundWay") == 1) {
        this.$emit("oktorefund", "确定在此提交退款申请");
        let date = this.formatDate();
        sessionStorage.setItem("refundtime", date);
        sessionStorage.setItem("refundRe", this.refundreason);

        if (sessionStorage.getItem("RefundOrderState") == 1) {
          console.log("id");
          this.str.orderId = sessionStorage.getItem("RefundOrderNum");
          this.str.orderInfId = null;
        } else if (sessionStorage.getItem("RefundOrderState") == 0) {
          console.log("xq");
          this.str.orderId = sessionStorage.getItem("RefundOrderNum");
          this.str.orderInfId = sessionStorage.getItem("RefundOrderNumtwo");
        }
        this.str.refundReason = this.refundreason;
        this.str.refundTime = date;
        this.str.refundInstructions = this.inputtext;
        this.str = JSON.stringify(this.str);
        sessionStorage.refundstr = this.str;
      } else if (sessionStorage.getItem("RefundWay") == 0) {
        // 退货
        this.$emit("oktorefund", "确定在此提交退货退款申请");
        let date = this.formatDate();
        if (sessionStorage.getItem("RefundOrderState") == 1) {
          console.log("id");
          this.str.orderId = sessionStorage.getItem("RefundOrderNum");
          this.str.orderInfId = null;
        } else if (sessionStorage.getItem("RefundOrderState") == 0) {
          console.log("xq");
          this.str.orderId = sessionStorage.getItem("RefundOrderNum");
          this.str.orderInfId = sessionStorage.getItem("RefundOrderNumtwo");
          console.log(this.str.orderId, this.str.orderInfId, "???");
        }
        this.str.refundReason = this.refundreason;
        this.str.refundTime = date;
        this.str.refundInstructions = this.inputtext;
        this.str = JSON.stringify(this.str);
        sessionStorage.refundstr = this.str;
      }
      
      // this.$http.post('/opinion/feedback', this.formData,{
      //   headers: {'Content-Type': 'multipart/form-data'}
      // }).then(res => {
      //   this.alertShow=true;
      // });
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

  created() {
    if (this.last) {
      this.price += 20;
    }

    this.refundway = sessionStorage.getItem("RefundWay");
    this.RefundOrderState = sessionStorage.getItem("RefundOrderState");


    this.orderone = sessionStorage.getItem("orderone");
    var isdetail = sessionStorage.getItem("isDetail");

    if (isdetail == 1) {
      this.getorderDetail(this.orderone);
    }else {
      console.log('daozheli')
      this.isdetail = JSON.parse(isdetail);
      this.goodsnew.push(this.isdetail.emm[0]);
      this.price = this.goodsnew[0].orderMoney
      console.log(this.goodsnew)
    }

  }
};
</script>

<style scoped>
.whatinput {
  width: 520px;
}
.inputreason {
  padding-top: 80px;
  height: 40px;
  margin-bottom: 10px;
}
.inputreason > input {
  height: 40px;
  outline: none;
  width: 500px;
  text-indent: 10px;
  font-size: 14px;
}
.selectbox {
  /* //用div的样式代替select的样式 */
  width: 200px;
  height: 40px;
  border-radius: 5px;
  /* //盒子阴影修饰作用,自己随意 */
  /* box-shadow: 0 0 5px #ccc; */
  position: relative;
  margin-right: 10px;
}
.selectbox > select {
  text-align: center;
  background: #fff;
  border: 1px solid #a0a0a0;
  /* //清除select聚焦时候的边框颜色 */
  outline: none;
  /* //将select的宽高等于div的宽高 */
  width: 100%;
  height: 40px;
  line-height: 40px;
  /* //隐藏select的下拉图标 */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* //通过padding-left的值让文字居中 */
  text-align: center;
  text-align-last: center;
}
.selectbox > select > option {
  position: relative;
  outline: none;
}
.selectbox:after {
  content: "";
  width: 14px;
  height: 8px;
  /* background: url(img/xiala.png) no-repeat center; */
  /* //通过定位将图标放在合适的位置 */
  position: absolute;
  right: 20px;
  top: 45%;
  /* //给自定义的图标实现点击下来功能 */
  pointer-events: none;
}

.upload-imgs {
  margin: 10px 0 30px 0;
  overflow: hidden;
  font-size: 0;
}
.upload-imgs li {
  position: relative;
  width: 118px;
  height: 118px;
  font-size: 14px;
  display: inline-block;
  padding: 10px;
  margin-right: 25px;
  border: 1px dashed #ccc;
  text-align: center;
  vertical-align: middle;
}
.upload-imgs li:hover {
  border-color: #a0a0a0;
}
.upload-imgs .add {
  display: block;
  background-color: #ccc;
  color: #ffffff;
  height: 94px;
  padding: 8px 0;
}
.upload-imgs .add .iconfont {
  padding: 10px 0;
  font-size: 40px;
}
.upload-imgs li:hover .add {
  background-color: #a0a0a0;
}
.upload-imgs li .upload {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 118px;
  height: 118px;
}
.upload-imgs .img {
  position: relative;
  height: 94px;
  line-height: 94px;
}
.upload-imgs .img > img {
  vertical-align: bottom;
  width: 94px;
  height: 94px;
}
.upload-imgs .img .close {
  display: none;
}
.upload-imgs li:hover .img .close {
  display: block;
  position: absolute;
  right: -6px;
  top: -10px;
  line-height: 1;
  font-size: 22px;
  color: #aaa;
}
.upload-imgs li > input {
  opacity: 0;
}
.upload-imgs .add > p {
  line-height: 94px;
}
.refund {
  margin: 0 auto;
  min-width: 716.8px;
  max-width: 1008px;
  text-align: left;
  margin-left: 30px;
}
.title {
  text-align: left;
  font-size: 24px;
  color: #000;
  line-height: 24px;
}
.refundhead {
  border-bottom: 1px solid #a0a0a0;
  border-top: 1px solid #a0a0a0;
  padding: 20px 0;
  margin-top: 10px;
}
.fl {
  float: left;
  width: 20%;
}
.fll {
  float: left;
}
.fr {
  float: right;
}
.refundhead > ul > li:first-child > img {
  width: 100%;
}
.refundhead > ul {
  overflow: hidden;
  font-size: 14px;
}
.inputfile {
  position: absolute;
  clip: rect(0 0 0 0);
}
.btn-choose {
  line-height: 30px;
  text-align: center;
  width: 100px;
  display: inline-block;
  margin-left: 100px;
  background: #a0a0a0;
  font-size: 14px;
}
.refundhead > ul > li:nth-child(2) {
  margin: 6%;
}
.refundhead > ul > li:last-child {
  margin: 6%;
}
p {
  line-height: 30px;
}
.bodyone,
.bodytwo,
.bodythree,
.bodyfour {
  padding: 20px 0;
  font-size: 16px;
  overflow: hidden;
  border-bottom: 1px solid #a0a0a0;
  color: #2c3e50;
  /* padding-bottom: 10px; */
}
.bodyfour {
  padding-bottom: 0;
}
.bodyfour div {
  margin: 10px 0;
}
.bodyone > .fll {
  line-height: 40px;
}
.bodyone > .fr > select {
  font-size: 16px;
  width: 200px;
  height: 40px;
  text-align: right;
  outline: none;
}
.red {
  color: red;
}
.bodytwo > p {
  font-size: 12px;
}
.bodythree > input {
  outline: none;
  border: none;
  height: 20px;
  display: inline-block;
  margin-left: 10px;
  font-size: 16px;
  color: #2c3e50;
  /* color: #a0a0a0;   */
}
.refundcancle div,
.refundbottom div {
  width: 137px;
  height: 35px;
  background: #000;
  text-align: center;
  /* margin-right: 20px; */
  margin-top: 20px;
  line-height: 35px;
  color: #fff;
  float: left;
}
.refundcancle div {
  float: right;
}
</style>
