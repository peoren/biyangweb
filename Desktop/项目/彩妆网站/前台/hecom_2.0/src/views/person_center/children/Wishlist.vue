<template>
  <div class="wishlist">
    <div class="title">
      <div>心愿单</div>
      <!-- <a href="#">
        查看更多
        <li>></li>
      </a> -->
    </div>
    <div v-if="wish.length==0" class="no">
       您的心愿单里还没有商品
      </div>
    <ul v-else-if="wish.length >= 1">
      <li v-for="(ele,index) in wish" :key="index">
        <a href="#">
          <div>
            <img alt="Vue logo" :src="ele.productInfBpic">
          </div>
          <div></div>
          <div>{{ele.productName}}</div>
          <div>￥{{ele.productInfPrice}}</div>
        </a>
        <a href="#" @click.prevent="del(ele.productId)">删除</a>
      </li>
    </ul>
    <!-- <Panel/> -->
  </div>
</template>

<script>
import Panel from "@/views/person_center/children/Panel.vue";
export default {
  name: "wishlist",
  data() {
    return {
      wish: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取数据
    getData() {
      let postData = this.$qs.stringify({
        userToken: sessionStorage.getItem("user_id")
      });
      this.$http
        .post("/pinformation/myfavorite", postData)
        .then(res => {
          this.wish = res.data.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          console.log("请求失败");
        });
    },
    //删除数据
    del(id) {
      var _that = this;
      let postData = this.$qs.stringify({
        userToken: sessionStorage.getItem("user_id"),
        productId: id
      });
      this.$http
        .post("/pinformation/delfavorite", postData)
        .then(res => {
          console.log(res)
          _that.getData();
        })
        .catch(err => {
          console.log(err);
          this.$confirm({
            type: "提示",
            msg: "操作失败请稍后再试！",
            btn: {
              ok: "确认",
              no: ""
            }
          })
            .then(() => {            
            })
            .catch(() => {
            });
        });
    }
  },
  components: {
    Panel
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
ul {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
a {
  text-decoration: none;
  color: #000;
}
.wishlist {
  text-align: left;
  padding-bottom: 50px;
  margin-left: 30px;
  min-width: 738px;
  max-width: 1050px;
}
.title {
  overflow: hidden;
  padding-bottom: 10px;
  border-bottom: 1px solid #a0a0a0;
}
.title > div {
  float: left;
  font-size: 24px;
  color: #000;
  line-height: 24px;
}
.title > a {
  float: right;
  font-size: 12px;
  line-height: 24px;
  padding-top: 5px;
  color: #000;
}
.title li {
  display: inline-block;
  margin-left: 3px;
}
ul img {
  width: 100%;
  height: auto;
}
ul > li {
  float: left;
  text-align: center;
  width: 25%;
  font-size: 12px;
}
ul > li div:nth-child(2) {
  margin-top: 5px;
  color: #a0a0a0;
  height: 30px;
  line-height: 15px;
}
ul > li div:nth-child(3) {
  color: #000;
  margin: 4px 0;
  height: 30px;
  line-height: 15px;
}
ul > li div:last-child {
  height: 19px;
  color: #a0a0a0;
  letter-spacing: 1px;
}
li > a:last-child {
  line-height: 30px;
  color: #a1a1a1;
  text-decoration: underline;
  white-space: pre;
}
</style>
