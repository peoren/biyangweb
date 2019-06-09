<template>
  <div class="userinfo">
    <div class="title">会员信息修改</div>
    <div class="information">
      <form action>
        <div class="email">
          <span>邮箱:</span>
          <input type="text" v-model="user.userEmail" class="emall">
          <!-- <input type="text" value="1"> -->
        </div>
        <div class="phone">
          <span>手机:</span>
          <span>{{user.userPhone}}</span>
        </div>
        <div class="name">
          <span>姓名:</span>
          <input type="text" v-model="user.userName" class="u-na">
        </div>
        <div class="gender">
          <span>性别:</span>
          <input type="radio" name="gender" value="女" v-model="user.userSex" @click="user.userSex='女'">
          <label for="woman" >女</label>
          <input type="radio" name="gender" value="男" v-model="user.userSex"  @click="user.userSex='男'">
          <label for="man">男</label>
        </div>
        <div class="birth">
          <span>生日:</span>
          <input
            :disabled="dis"
            type="text"
            @input="checkDate(user.userBrith)"
            v-model="user.userBrith"
            placeholder="日期格式：2000.1.1"
          >
          <span class="hint">{{hint}}</span>
        </div>
        <div class="preservation">
          <a href="#" @click.prevent="setData">
            <button type="button">
              <span>保存</span>
            </button>
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "userinfo",
  data() {
    return {
      user: [],
      dis: false,
      hint: "",
      date: true,
    };
  },
  created() {
    this.getData();
   
  },
  methods: {
    //日期格式验证
    checkDate(a) {
      var _that = this;
      var regex = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/gi;
      if (regex.test(a) == false) {
        this.hint = "请输入正确的日期格式";
        this.date = false;
      } else {
        this.hint = "";
        this.date = true;
      }
    },
    //获取数据
    getData() {
      var _that = this;
      let postData = this.$qs.stringify({
        userToken:sessionStorage.getItem("user_id")
      });
      this.$http
        .post("/pinformation/myinformation", postData)
        .then(res => {
          _that.user = res.data.data[0];
          if (_that.user.userBrith != null && _that.user.userBrith.length > 0) {
            _that.dis = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存个人信息修改
    setData() {
      var _that = this;
      console.log(_that.user.userBrith)
      // return
      if (_that.date == false || _that.user.userBrith==''|| _that.user.userBrith==null ||_that.user.userBrith.length==0) {
        this.$confirm({
          type: "提示",
          msg: "请输入正确的生日信息",
          btn: {
            ok: "确定",
            no: ""
          }
        })
          .then(() => {})
          .catch(() => {});
        return
      }
      let postData = this.$qs.stringify({
        userToken: sessionStorage.getItem("user_id"),
        userEmail: _that.user.userEmail,
        userName: _that.user.userName,
        userSex: _that.user.userSex,
        userBrith: _that.user.userBrith
      });
      this.$http
        .post("/pinformation/changeinfo", postData)
        .then(res => {
           this.$confirm({
          type: "提示",
          msg: "修改成功",
          btn: {
            ok: "确定",
            no: ""
          }
        })
         _that.getData();
        })
        .catch(err => {
          console.log(err);
          this.$confirm({
          type: "提示",
          msg: "操作失败请稍后再试！",
          btn: {
            ok: "确定",
            no: ""
          }
        })
        });
    }
  }
};
</script>

<style scoped>
.u-na,
.emall,
.birth input{
  width: 200px;
}
.hint {
  color: #f40;
  font-size: 10px;
}
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  margin: 0 3px;
  display: block;
}
.userinfo {
  text-align: left;
  padding-bottom: 50px;
  margin-left: 30px;
  min-width: 738px;
  max-width: 1050px;
}
.title {
  text-align: left;
  overflow: hidden;
  font-size: 24px;
  color: #000;
  line-height: 24px;
  padding-bottom: 10px;
  border-bottom: 1px solid #a0a0a0;
}
.information {
  margin-top: 20px;
  font-size: 12px;
  color: #0f0c1d;
}
form > div {
  line-height: 36px;
  text-indent: 23px;
}
form > div > span:first-child {
  margin-right: 70px;
}
.sub > span:first-child {
  margin-right: 25px;
}
form > div > input {
  /* vertical-align: text-top; */
  outline: medium none;
  border: 1px solid #ccc;
  line-height: 21px;
  height: 21px;
}
.gender > input {
  width: 12px;
  height: 12px;
  vertical-align: text-bottom;
}
.gender > label {
  margin-right: 30px;
}

.gender > input {
  margin-right: 5px;
}

.preservation {
  width: 181px;
  height: 45px;
  margin-top: 30px;
  border: 1px solid #0f0c1d;
  text-align: center;
  line-height: 45px;
  background: #0f0c1d;
  margin-left: 23px;
}
.preservation button > span {
  width: 100%;
  height: 45px;
  line-height: 45px;
}
.preservation button {
  border: 0 none;
  background-color: transparent;
  cursor: pointer;
  display: block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  color: #fff;
  font-size: 14px;
  letter-spacing: 5px;
}
</style>
