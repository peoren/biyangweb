<template>
  <div class="address-wrap">
    <transition name="slide-fade">
      <div class="addAdress-flat" v-show="show">
        <form>
          <div class="reception-address clear">
            <span class="hint-msg">所在地区：</span>
            <v-distpicker
              :placeholders="placeholders"
              :province="userMsg.addressProvince"
              :city="userMsg.addressCity"
              :area="userMsg.addressCounty"
              @province="selectedProvince"
              @city="selectedCity"
              @area="selectedCounty"
            ></v-distpicker>
          </div>
          <div class="msg-item clear">
            <div>详细地址：</div>
            <input
              type="text"
              style="width:345px;"
              v-model="userMsg.addressDtaddress"
              @change="inspectTwo(userMsg.addressDtaddress)"
            >
            <span class="red">{{hintMsg.address}}</span>
          </div>
          <!-- <div class="msg-item clear">
            <div>邮政编码：</div>
            <input type="text" v-model="userMsg.postCode" @change="postcode">
            <span class="red">{{hintMsg.email}}</span>
          </div>-->
          <div class="msg-item clear">
            <div>收货人姓名：</div>
            <input type="text" v-model="userMsg.addressName" @change="inspect(userMsg.addressName)">
            <span class="red">{{hintMsg.name}}</span>
          </div>
          <div class="msg-item clear">
            <div>手机号码：</div>
            <input type="text" @input="phoneNumber" v-model="userMsg.addressPhone" maxlength="11">
            <span class="red">{{hintMsg.phone}}</span>
          </div>
          <div class="checked">
            <input type="checkbox" @click="setDefalut" ref="addressDefault" >是否设为默认地址
          </div>
          <div class="btn-wrap clear">
            <button type="button" @click="confirm">确认收货地址</button>
            <a href @click.prevent="resetForm">取消</a>
          </div>
        </form>
      </div>
    </transition>
    <div class="them clear">
      <span>收货地址</span>
      <button type="button" @click="addOne">+新增收货地址</button>
    </div>
    <ul class="clear">
      <li>地址</li>
      <li>收货人</li>
      <li>联系电话</li>
      <li>操作</li>
    </ul>
    <!-- 没有数据时显示u -->
    <div v-if="addressList.length==0" class="no">
       您还没有添加任何地址
      </div>
    <ul v-for="item in  addressList" :key="item.id" class="clear" v-else-if="addressList.length>0">
      <li>{{item.addressProvince+item.addressCity+item.addressCounty+item.addressDtaddress}}</li>
      <li>{{item.addressName}}</li>
      <li>{{item.addressPhone}}</li>
      <li>
        <a
          href="#"
          :class="{default:!item.addressDefault}"
          @click.prevent="defalutAdress(item)"
        >{{item.name}}</a>
        <a href="#" @click.prevent="editAddress(item)">编辑</a>
        <a href="#" @click.prevent="delAdress(item.addressId)">删除</a>
      </li>
    </ul>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import Loding from "@/components/Loding.vue";
export default {
  name: "site",
  components: {
    VDistpicker,
    Loding
  },
  data() {
    return {
      hintMsg: {
        phone: "",
        name: "",
        address: ""
      },
      placeholders: {
        province: "------- 省 --------",
        city: "--- 市 ---",
        area: "--- 区 ---"
      },
      userMsg: {
        addressProvince: "",
        addressCity: "",
        addressCounty: "",
        addressPhone: null,
        addressDtaddress: null,
        addressName: null,
        addressDefault: 1,
        addressId: null
      },
      show: 0,
      eidt: 0,
      add: 0,
      addressList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //输入框收货人验证
    inspect(value) {
      if (value.replace(/\s+/g, "").length == 0) {
        this.hintMsg.name = "请填写收货人";
      } else {
        this.hintMsg.name = "";
      }
    },
    //输入框详细地址验证
    inspectTwo(value) {
      if (value.replace(/\s+/g, "").length == 0) {
        this.hintMsg.address = "请填写详细地址";
      } else {
        this.hintMsg.address = "";
      }
    },
    //获取地址选择的省 的值
    selectedProvince(data) {
      this.userMsg.addressProvince = data.value;
    },
    //获取地址选择的市 的值
    selectedCity(data) {
      this.userMsg.addressCity = data.value;
    },
    //获取地址选择区/县的值
    selectedCounty(data) {
      this.userMsg.addressCounty = data.value;
    },
    //重置表单，改变新增地址的显示状态
    resetForm() {
      this.userMsg.addressProvince = "";
      this.userMsg.addressCity = "";
      this.userMsg.addressCounty = "";
      this.userMsg.postCode = null;
      this.userMsg.addressPhone = null;
      this.userMsg.addressDtaddress = null;
      this.userMsg.addressName = null;
      this.$refs.addressDefault.checked = false;
      this.userMsg.addressId = null;
      this.show = 0;
      this.hintMsg.address = "";
      this.hintMsg.phone = "";
      this.hintMsg.name = "";
    },
    //电话号码验证
    phoneNumber() {
      var reg = /^1(3|4|5|7|8|9)\d{9}$/;
      if (!reg.test(this.userMsg.addressPhone)) {
        this.hintMsg.phone = "手机号码错误";
      } else {
        this.hintMsg.phone = "";
      }
    },
    //是否设为默认地址勾选
    setDefalut() {
      if (arguments[0].target.checked) {
        this.userMsg.addressDefault = 0;
      } else {
        this.userMsg.addressDefault = 1;
      }
    },
    //确认地址修改
    confirm() {
        console.log(this.userMsg.addressDefault)
      if (
        this.userMsg.addressProvince != "" &&
        this.userMsg.addressProvince != "------- 省 --------"
      ) {
        if (
          this.userMsg.addressCity != "" &&
          this.userMsg.addressCity != "--- 市 ---"
        ) {
          if (
            this.userMsg.addressPhone != "" &&
            this.userMsg.addressPhone != null
          ) {
            if (
              this.userMsg.addressDtaddress != "" &&
              this.userMsg.addressDtaddress != null
            ) {
              if (
                this.userMsg.addressName != "" &&
                this.userMsg.addressName != null
              ) {
                this.changeAddress();
              } else {
                this.$confirm({
                  type: "提示",
                  msg: "请填写收货人",
                  btn: {
                    ok: "确定",
                    no: ""
                  }
                })
                  .then(() => {})
                  .catch(() => {});
              }
            } else {
              this.$confirm({
                type: "提示",
                msg: "请填写详细地址",
                btn: {
                  ok: "确定",
                  no: ""
                }
              })
                .then(() => {})
                .catch(() => {
                  console.log("no");
                });
            }
          } else {
            this.$confirm({
              type: "提示",
              msg: "请填写正确的电话号码",
              btn: {
                ok: "确定",
                no: ""
              }
            })
              .then(() => {})
              .catch(() => {});
          }
        } else {
          this.$confirm({
            type: "提示",
            msg: "请选择市",
            btn: {
              ok: "确定",
              no: ""
            }
          })
            .then(() => {})
            .catch(() => {
              console.log("no");
            });
        }
      } else {
        this.$confirm({
          type: "提示",
          msg: "请选择省份",
          btn: {
            ok: "确定",
            no: ""
          }
        })
          .then(() => {})
          .catch(() => {});
      }
    },
    //编辑收货地址
    editAddress(item) {
      var _that = this;
      _that.eidt = 1;
      _that.show = 1;
      _that.add = 0;
      _that.userMsg.addressProvince = item.addressProvince;
      _that.userMsg.addressCity = item.addressCity;
      _that.userMsg.addressCounty = item.addressCounty;
      _that.userMsg.postCode = item.postCode;
      _that.userMsg.addressPhone = item.addressPhone;
      _that.userMsg.addressDtaddress = item.addressDtaddress;
      _that.userMsg.addressName = item.addressName;
      _that.userMsg.addressId = item.addressId;
      if (item.addressDefault == 0) {
        _that.$refs.addressDefault.checked = true;
        _that.userMsg.addressDefault = 0;
      }
    },
    //点击新增收货地址
    addOne() {
      this.resetForm();
      this.show = 1;
      this.add = 1;
      this.eidt = 0;
    },
    //删除收货地址
    delAdress(id) {
       this.$confirm({
            type: "提示",
            msg: "确定删除当前地址？",
            btn: {
              ok: "确定",
              no: "取消"
            }
          })
            .then(() => {
               var _that = this;
      let postData = this.$qs.stringify({
        userToken: sessionStorage.getItem("user_id"),
        addressId: id
      });
      this.$http
        .post("/pinformation/deladdress", postData)
        .then(res => {
          _that.getData();
        })
        .catch(err => {
           this.$confirm({
            type: "提示",
            msg: "操作失败请稍后再试",
            btn: {
              ok: "确定",
              no: ""
            }
          })
            .then(() => {})
            .catch(() => {});
        });
            })
            .catch(() => {});
     
    },
    //获取地址数据
    getData() {
      var _that = this;
      let postData = this.$qs.stringify({
        userToken:  sessionStorage.getItem("user_id"),
      });
      this.$http
        .post("/pinformation/myaddress", postData)
        .then(res => {
          this.addressList = res.data.data;
          console.log(res.data.data);
          for (let i = 0; i < _that.addressList.length; i++) {
            if (_that.addressList[i].addressDefault == 0) {
              _that.addressList[i].name = "默认地址";
            } else {
              _that.addressList[i].name = "设为默认地址";
            }
          }
        })
        .catch(err => {
          console.log(err);
          console.log("请求失败");
        });
    },
    //添加或者修改地址
    changeAddress() {
      if(this.hintMsg.phone!=''){
          this.$confirm({
            type: "提示",
            msg: "请输入正确的电话号码",
            btn: {
              ok: "确定",
              no: ""
            }
          })
          return
      }else if(this.hintMsg.name!=''){
          this.$confirm({
            type: "提示",
            msg: "请输入收货人姓名",
            btn: {
              ok: "确定",
              no: ""
            }
          })
          return
      }else if(this.hintMsg.address !=""){
         this.$confirm({
            type: "提示",
            msg: "请输入详细地址",
            btn: {
              ok: "确定",
              no: ""
            }
          })
          return false
      }


      var _that = this;
      var url;
      if (this.userMsg.addressCounty == "--- 区 ---") {
        this.userMsg.addressCounty = "";
      }
      if (this.eidt == 1) {
       
        url = "/pinformation/updateaddress";
        var postData = this.$qs.stringify({
          userToken: sessionStorage.getItem("user_id"),
          addressProvince: this.userMsg.addressProvince,
          addressCity: this.userMsg.addressCity,
          addressCounty: this.userMsg.addressCounty,
          addressDtaddress: this.userMsg.addressDtaddress,
          addressName: this.userMsg.addressName,
          addressDefault: this.userMsg.addressDefault,
          addressPhone: this.userMsg.addressPhone,
          addressId: this.userMsg.addressId
        });
      } else if (this.add == 1) {
        url = "/pinformation/insertaddress";
        var postData = this.$qs.stringify({
          userToken:  sessionStorage.getItem("user_id"),
          addressProvince: this.userMsg.addressProvince,
          addressCity: this.userMsg.addressCity,
          addressCounty: this.userMsg.addressCounty,
          addressDtaddress: this.userMsg.addressDtaddress,
          addressName: this.userMsg.addressName,
          addressDefault: this.userMsg.addressDefault,
          addressPhone: this.userMsg.addressPhone
        });
      }
      this.$http
        .post(url, postData)
        .then(res => {
        location.reload();
        })
        .catch(err => {
           this.$confirm({
            type: "提示",
            msg: "操作失败请稍后再试",
            btn: {
              ok: "确定",
              no: ""
            }
          })
            .then(() => {})
            .catch(() => {});
          console.log(err);
        });
    },
    //将地址设为默认地址
    defalutAdress(a) {
      var _that = this;
      let postData = this.$qs.stringify({
        userToken: sessionStorage.getItem("user_id"),
        addressId: a.addressId
      });
      this.$http
        .post("/pinformation/upaddressdefault", postData)
        .then(res => {
          console.log("修改成功");
          _that.getData();
        })
        .catch(err => {
          console.log(err);
          console.log("请求失败");
        });
    }
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
.red {
  color: #ff4400;
  font-size: 0.5em;
}
/* 动画 */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
/* 样式 */
a {
  color: #424242;
}
.distpicker-address-wrapper {
  float: left;
}
.address-wrap {
  width: 95%;
  margin-left: 30px;
  height: 300px;
}

.clear::before,
.chear::after {
  content: "";
  display: table;
}
.clear::after {
  clear: both;
}
.them {
  padding-bottom: 15px;
  border-bottom: solid 1px #a0a0a0;
  margin-bottom: 20px;
}
.them span {
  font-size: 24px;
  float: left;
}
.them button {
  width: 135px;
  height: 35px;
  border: solid 1px #000000;
  cursor: pointer;
  background: #ffffff;
  float: right;
  color: #000000;
  outline: none;
}
ul li {
  float: left;
  font-size: 14px;
}
ul {
  width: 100%;
}
li > a {
  display: block;
  width: 100%;
  font-size: 12px;
}
li {
  padding: 10px 0;
  width: 16%;
  vertical-align: top;
}
ul li:first-child {
  width: 50%;
}
ul {
  margin-top: 10px;
  border: solid 1px #a0a0a0;
}
.default {
  background: #8c7517;
  content: "默认地址";
  color: #ffffff;
  padding: 5px 0;
}
.msg-item {
  margin-top: 10px;
}
.reception-address .hint-msg,
.msg-item div {
  float: left;
  width: 15%;
  text-align: right;
  height: 33px;
  line-height: 33px;
}
.reception-address .hint-msg {
  margin-right: 25px;
}

.msg-item span {
  float: left;
  height: 33px;
  line-height: 33px;
  margin-left: 10px;
}
.msg-item input {
  float: left;
  width: 220px;
  height: 30px;
  margin-left: 25px;
  outline: none;
  text-indent: 1em;
  border: 1px solid #00000026;
}
div.phone div:first-child {
  margin-right: 10px;
}

.addAdress-flat {
  width: 95%;
  margin-bottom: 50px;
}
.checked {
  text-align: left;
  margin-top: 30px;
}
.checked input {
  margin-left: 100px;
}
.btn-wrap {
  margin-top: 30px;
}
.btn-wrap button {
  float: left;
  height: 40px;
  width: 180px;
  margin-left: 60px;
  outline: none;
  border: none;
  background: #000000;
  color: #ffffff;
  cursor: pointer;
}
.btn-wrap a {
  float: left;
  margin-left: 20px;
  height: 40px;
  line-height: 40px;
}
</style>
