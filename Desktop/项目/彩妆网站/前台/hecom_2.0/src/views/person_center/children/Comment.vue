
<template>
  <div id="comment-wrap">
    <div class="switcher">
      <button type="button" :class="{active:current==1}" @click="setclass">我的评论</button>
      <button type="button" :class="{active:current==2}" @click="setclassT">未评论商品</button>
    </div>
    <div class="child-msg">
      <!-- 未评论商品展示 -->
      <GoComment v-if="current==2" :commentlist="commentData"></GoComment>

      <!-- 已评论信息展示 -->

      <div class="mycomment" v-else-if="current==1">
         <div v-if="commentData.length==0" class="no">
            您还没有评论过商品
          </div>
        <div class="comment-item clear" v-for="(item,index) in commentData" :key="index" v-else-if="commentData.length>0">
          <div class="user-pic">
           {{item.userName}}：
            <!-- <img :src="userUrl" alt> -->
          </div>
          <div class="myMsg clear">
            <div class="start-wrap clear">
              <span class="iconfont icon-wujiaoxing" v-if="item.evaluateLevel>=1"></span>
              <span class="iconfont icon-wujiaoxing" v-if="item.evaluateLevel>=2"></span>
              <span class="iconfont icon-wujiaoxing" v-if="item.evaluateLevel>=3"></span>
              <span class="iconfont icon-wujiaoxing" v-if="item.evaluateLevel>=4"></span>
              <span class="iconfont icon-wujiaoxing" v-if="item.evaluateLevel>=5"></span>
              <span class="time">{{item.evaluateTime}}</span>
            </div>
            <div class="comment-content">
              {{item.evaluateText}}
            </div>
            <div class="comment-pic clear" v-for="(pic,index) in item.pic" :key="index">
              <img :src="pic.url" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoComment from "@/views/person_center/children/GoComment.vue";
export default {
  name: "comment",
  components: {
    GoComment
  },
  data() {
    return {
      // userUrl: require("@/assets/user.jpg"),
      commentData: [
        {
          o_id: 123456,
          o_count: 2,
          o_paytotal: 234.0,
          o_state: 0,
          o_starttime: "2019-02-14 13:20"
        }
      ],
      current: 1
    };
  },
  methods: {
    //展示状态选项切换
    setclass() {
      this.current = 1;
    },
    setclassT() {
      this.current = 2;
    },
    //获取数据
     getData(){
       let postData = this.$qs.stringify({
        userToken:sessionStorage.getItem("user_id")
    });
    this.$http
      .post("/pinformation/mycomments", postData)
      .then(res => {
        console.log(res)
       this.commentData = res.data.data;
      }) 
      .catch(err => {
        console.log(err);
        console.log("请求失败");
      });
    },
  },
  created(){
    this.getData();
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
.clear::before,
.clear::after {
  content: "";
  display: table;
}
.clear::after {
  clear: both;
}
#comment-wrap {
  text-align: left;
  margin-left: 30px;
  margin-bottom: 20px;
}
.switcher {
  border-bottom: 1px solid #a0a0a0;
  margin: 0 auto;
  min-width: 716.8px;
  max-width: 1008px;
  text-align: left;
  padding-bottom: 10px;
}
.switcher button {
  height: 44px;
  width: 125px;
  border:none;
  /* border: solid 1px #999999; */
  background: #f8f0f0;
  font-size: 16px;
  outline: none;
  cursor: pointer;
}
.switcher button:first-child {
  border-right: none;
}
.switcher button:last-child {
  border-left: none;
}
#comment-wrap .active {
  background: #9999996b;
}
.child-msg {
  margin-top: 20px;
  min-width: 716.8px;
  max-width: 1008px;
}

.user-pic {
  width: 100px;
  /* height: 50px; */
  /* line-height: 50px; */
  /* width: 10%; */
  float: left;
  border-radius: 50%;
  overflow: hidden;
  font-size: 12px;
  text-align: center;
}
.user-pic img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.mycomment .myMsg {
  float: left;
  width: 590px;
  margin-left: 20px;
  padding-bottom: 15px;

}
.start-wrap {
  margin-top: 5px;
}
.start-wrap .time {
  float: right;
  font-size: 10px;
}
.comment-pic {
  margin-top: 10px;
}
.comment-pic img {
  float: left;
  width: 80px;
  height: auto;
  margin-right: 10px;
}
.comment-content {
  margin-top: 10px;
}
.comment-item {
  margin-bottom: 15px;
    border-bottom: solid 1px #a0a0a0;
}
</style>



