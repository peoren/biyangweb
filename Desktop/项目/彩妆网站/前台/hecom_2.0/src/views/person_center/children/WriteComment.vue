<template>
  <div class="content-wrap">
    <!-- {{$route.params.itemData}} -->
    <h5>评价订单</h5>
    <p class="order-nmber">
      订单号：
      <span>{{goodsMsg.orderNum}}</span>
      <span>{{goodsMsg.orderPaytime}}</span>
    </p>
    <div class="form-wrap">
      <div class="left-msg">
        <a href="#xiangqinye" class="pic-wrap">
          <img :src="goodsMsg.productInfBpic" alt>
        </a>
        <!-- <p>enhling</p> -->
        <h6>{{goodsMsg.productName}}</h6>
        <p>￥{{goodsMsg.productInfPrice}}</p>
      </div>
      <form action class="userInfo" enctype="multipart/form-data">
        <div class="comment_start">
          您的评价：
          <span class="iconfont icon-wujiaoxing" :class="{current:start>=1}" @click="start=1"></span>
          <span class="iconfont icon-wujiaoxing" :class="{current:start>=2}" @click="start=2"></span>
          <span class="iconfont icon-wujiaoxing" :class="{current:start>=3}" @click="start=3"></span>
          <span class="iconfont icon-wujiaoxing" :class="{current:start>=4}" @click="start=4"></span>
          <span class="iconfont icon-wujiaoxing" :class="{current:start>=5}" @click="start=5"></span>              
        </div>
        <div>
            <p>请描述您的购物体验：</p>
            <textarea name="" id="" cols="30" rows="10" placeholder="您的宝贵意见将会是我们持续进步的动力" v-model="userInfo"></textarea>
        </div>
        <div class="btn-wrap">
          <button type="button" @click="upComment">提交</button>
        </div>
        <div>
          <div class="form-group">
            <label class="control-label">评论图片</label>
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
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowComment",
  data() {
    return {
      formData: new FormData(),
      imgs: {},
      imgLen: 0,
      goodsMsg:{},
      start: 0,
      userInfo:''
    };
  },
  created() {
    this.goodsMsg = this.$route.params.itemData;
    console.log(this.goodsMsg)
  },
  methods: {
    getCommentGoods(){
      this.$http.post('/login', {
        username: this.username,
        userpass: this.userpass,
        userToken:sessionStorage.getItem('user_id')
      })
        .then((res) => {
          console.log(res.data);
          if(res.data.state == 200) {
            // 保存登陆状态
            localStorage.setItem('userToken', res.data.userToken);
            // 使用 this.$router 对象
            this.$router.push('/');
          } else {
            alert('账号或者密码错误。')
          }
        })
        .catch(err => {
          console.log(err)
          alert('登录失败')
        })
    },
    // 上传图片处理
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
      for (let key in this.imgs) {
        let name = key.split("?")[0];
        this.formData.append("multipartFiles", this.imgs[key], name);
      }
      console.log(this.formData);
      // this.$http.post('/opinion/feedback', this.formData,{
      //   headers: {'Content-Type': 'multipart/form-data'}
      // }).then(res => {
      //   this.alertShow=true;
      // });
    },
    //时间处理函数
      formatDate() {
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
    },
    //上传评论
    upComment(){
      var _that = this;
      var time=_that.formatDate();
      let postData = this.$qs.stringify({
        userToken:sessionStorage.getItem("user_id"),
        orderNum:_that.goodsMsg.orderNum,
        evaluateText:_that.userInfo,
        productName:_that.goodsMsg.productName,
        evaluateTime:time,
        evaluateLevel:_that.start,
        orderInfId:_that.goodsMsg.orderInfId,
        });
      this.$http
        .post("/pinformation/insertcomments", postData)
        .then(res => {
          console.log(res)
           this.$confirm({
            type: "提示",
            msg: "操作成功",
            btn: {
              ok: "确认",
              no: ""
            }
          })
            .then((
            ) => { 
              _that.$router.push({name:'comment'})           
            })
            .catch(() => {
            });
        })
        .catch(err => {
          console.log(err);
          console.log("请求失败");
           this.$confirm({
            type: "提示",
            msg: "操作失败请稍后再试！",
            btn: {
              ok: "确认",
              no: ""
            }
          })
             
        });
    }
  },
  
  
};
</script>
<style scoped>
.help-block{
  color: #ff4400;
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
  float: left;
  padding: 10px;
  margin-right: 10px;
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
  width: 80px;
  height: 80px;
}
.upload-imgs .img .close {
  display: none;
  cursor: pointer;
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
.content-wrap {
  margin-top: -20px;
  margin-left: 30px;
  text-align: left;
}
.order-nmber {
  font-size: 12px;
  padding: 8px 0;
  border-bottom: solid 1px #a0a0a0;
  border-top: solid 1px #a0a0a0;
}
.order-nmber span:last-child {
  margin-left: 45px;
}
h5 {
  font-size: 16px;
  padding: 10px 0;
}
.form-wrap {
  margin-top: 20px;
}
.form-wrap::before,
.form-wrap::after {
  content: "";
  display: table;
}
.form-wrap::after {
  clear: both;
}
.left-msg {
  text-align: center;
  float: left;
}
.left-msg img {
  width: 200px;
  height: 200px;
}
.left-msg p {
  margin: 5px 0;
  font-size: 12px;
}
.userInfo{
  margin-left: 30px;
  float: left;
  width: 470px;
}
.comment_start{
  margin-bottom: 10px;
}
.comment_start span {
  color: #bbbbbb;
  margin-left: 5px;
  margin-bottom: -2px;
  cursor: pointer;
}
.comment_start .current {
  color: #333333;
}
form textarea{
  text-indent: 2em;
  padding-top: 5px;
  width: 100%;
  height: 100px;
  resize: none;
  margin-top: 10px;
  outline: none;
}
.btn-wrap{
  text-align: right;
  padding-right: 10px;
  margin-top: 20px;
}
.btn-wrap button{
  width: 120px;
  height: 35px;
  background: #bbbbbb;
  border: none;
  outline: none;
  box-shadow:0 0 10px  #333333;
  cursor: pointer;
}
/* 字体图标 */
</style>
