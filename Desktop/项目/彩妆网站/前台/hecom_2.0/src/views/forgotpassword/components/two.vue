<template>
  <div class="two">
    <p class="p1">为保障您的账户安全，请先验证您的身份</p>
    <div>
      <div class="select">
        <input @click="toph" type="radio" name="select" id="phone" value="phone" v-model="type">
        <label for="phone">手机验证</label>
      </div>
      <div class="select">
        <input id="email" @click='toemai' type="radio" name="select" value="email" v-model="type">
        <label for="email">邮箱验证</label>
      </div>
    </div>
    <!-- 手机 -->
    <div class="check clear" v-show="check1">
      <input disabled type="text" name id="numbox" v-model="number1">
      <button class="send" @click="checkbutton1">{{notice1}}</button>
    </div>
    <!-- 邮箱 -->
    <div class="check clear" v-show="check2">
      <input disabled type="text" name id="numbox" v-model="number2">
      <button class="send" @click="checkbutton2">{{notice2}}</button>
    </div>
    <div style="position: relative;">
      <input @keydown.enter="next" type="text" name id class="testnum" placeholder="输入验证码" v-model="num">
      <div class="notice" v-show="notice3">{{noticetext}}</div>
    </div>
    <input type="button" value="下一步" class="next" @click="next">
  </div>
</template>
<script>
// import login from '@/components/header/header.vue'
export default {
  data() {
    return {
      number1: sessionStorage.getItem('forget_phone'),
      number2: sessionStorage.getItem('forget_email'),
      type: "phone",
      notice1: "发送验证码",
      notice2: "发送验证邮件",
      notice3: false,
      noticetext: "",
      num: "",
      check1:true,
      check2:false,
      time1:60,
      time2:60,
      can1:true,
      can2:true,
      errshow:false,
      err:true
    };
  },
  methods: {
    next() {
      var _this=this
      if (this.num == "") {
        this.notice3 = true;
        this.noticetext = "请输入验证码！";
      } else {
        // 手机验证码
          let postData = this.$qs.stringify({
                  valicode:_this.num,
              })
            this.$http.post('/login/checkcode',postData) 
            .then(res => {
              console.log(res)
                if(res.data.code == 1) {
                  this.notice3 = false;
                  this.$router.push("three");
                  this.indexfn(3)
                }else if(res.data.code == -1) {
                  this.notice3 = true;
                  this.noticetext = "验证码错误！";
                }
            })
            .catch(err => {
                console.log(err,'err')
            })
      }
    },
    indexfn(i) {
        this.$emit('indexfn',i)
    },
    toph() {
        this.check1 = true
        this.check2 = false
    },
    toemai() {
        this.check1 = false
        this.check2 = true
    },
    checkbutton1(){
      var _this = this
        if (!this.can1) return  //改动的是这两行代码
            let postData = this.$qs.stringify({
                    userAccess:_this.number1,
                })
              this.$http.post('/login/sendcode',postData) 
              .then(res => {

              })
              .catch(err => {
                  
              })
            this.can1 = false
            this.notice1 = this.time1
            let clock1 = window.setInterval(() => {
              this.time1--
              this.notice1 = this.time1
              if (this.time1 == 0) {
              window.clearInterval(clock1)
              this.notice1 = '重发验证码'
              this.time1 = '60'
              this.can1 = true  //这里重新开启
        }
      },1000)
    },
    checkbutton2(){
      var _this = this
        if (!this.can2) return  //改动的是这两行代码
          let postData = this.$qs.stringify({
                    userAccess:_this.number2,
                })
              this.$http.post('/login/sendcode',postData) 
              .then(res => {

              })
              .catch(err => {
                  
              })
            this.can2 = false
            this.notice2 = this.time2
            let clock2 = window.setInterval(() => {
            this.time2--
            this.notice2 = this.time2
            if (this.time2 == 0) {
            window.clearInterval(clock2)
            this.notice2 = '重发验证邮件'
            this.time2 = '60'
            this.can2 = true  //这里重新开启
  }
 },1000)
  },
  }
}
</script>
<style scoped>
.two{
    width: 550px;
    position: relative;
}
.select{
    padding: 0 50px;
    display: inline;
}
.check{
    margin-top: 20px;
    margin-left: 137.5px;
    position: relative;
}
#numbox{
    width: 190px;
    height: 46px;
    background: #ebebe4;
    border: 1px solid #a0a0a0;
    padding: 0 4px;
    float: left;
}
.send{
    float: left;
    width: 75px;
    height: 48px;
    font-size: 10px;
    border: 1px solid #a0a0a0;
    border-left: none;
    line-height: 48px;
    cursor: pointer;
}
.testnum{
    width: 266px;
    height: 46px;
    border: 1px solid #a0a0a0;
    padding: 0 4px;
    background: #fdfdfd;
    margin: 20px 0;
}
.next{
    width: 274px;
    height: 55px;
    background: #000000;
    border: none;
    color: #ffffff;
    cursor: pointer;
    margin-top: 10px;
}
.notice{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    color: red;
    font-size: 12px;
    text-align: left;
    margin: 0 auto;
    width: 269px;
    position: absolute;
    left: 145px;
    top: 68px;
}
.p1 {
  margin-bottom: 20px;
}
</style>

