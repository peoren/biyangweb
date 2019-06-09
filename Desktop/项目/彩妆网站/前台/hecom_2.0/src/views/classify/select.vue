<template>
<!-- 搜索分类页 -->
  <div class="classify" >
     <div class="error" v-if="state==0">
       <img id="err" src="../../assets/foundation/banner/error.png" alt="">
        <p class="cue">暂无此种商品，请返回首页</p>
        <p>{{timer}}s后自动返回首页</p>
          <div class="ret" @click.stop="back">返回首页</div>
    </div>
    <div v-if="state==1">
      <div class="clear first">
      <div class="title left" >
        <a href="" @click.stop.prevent="backfirst">首页</a>>>
        <a href="" class="new">搜索“<span>{{notice}}</span>”</a>
      <div class="right" >
        <down class="case"/>
      </div>
    </div>
    </div>
  
    <div  class="clear box">
      <goods @dochange='zzy' @suc='change' class="left" :masg='m' v-for="(m,index) in masgs" :key="index"  ></goods>
    </div> 
   
    
    <transition name="fade">
      <div class="suc clear" v-if="flage==1">
        <img src="../../assets/foundation/banner/yes.png" alt="">
        <p>已成功加入购袋!</p>
      </div>
    </transition>

    </div>
    
    
  </div>
</template>
<style  scoped>
.error p {
  font-size: 18px;
  line-height: 30px;
}
.ret {
  width: 160px;
  height: 40px;
  border: 1px solid #000;
  text-align: center;
  line-height: 40px;
  margin:20px  auto  40px;
  cursor: pointer;
  
}
.ret:hover {
 border: 1px solid rgb(156, 134, 60);
  color:  rgb(156, 134, 60);
}
#err {
  width: 100%;
  margin-top:60px;
}
.case {
  position: absolute;
  top: 4px;
  right: 10%;
  text-align: center;
  line-height: 40px;
}
    .suc {
      width:200px;
      height: 80px;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.267);
      text-align: center;
      position: fixed;
      color: white;
      line-height: 40px;
      top: 100px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .fade-enter-active, .fade-leave {
      transition: opacity 0.8s;
    }
    .fade-enter, .fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .suc img {
      margin: 10px 0 0;
      width: 30px;
      vertical-align:middle;
    }
    select {
      width: 140px;
      height: 44px;
      color: #a0a0aa;
      line-height: 44px;
      outline: none;
      position: absolute;
      right: 10%;
    }
    .first {
      height: 44px;
      width: 100%;
      margin-top: 130px;
      position: relative;
      padding: 5px;
      background: #fafafa;
    }
    .title {
      height: 40px;
      padding-left:20px; 
      text-align: left;
      line-height: 40px;
      
    }
    a {
      color: #7c7c7c;
      font-size:12px; 
    }
    a:hover {
      color: rgb(156, 134, 60);
    }
    .new {
     color: rgb(156, 134, 60);
    }
    .box {
      width:80%;
      min-width: 1024px;
      margin: auto;
    }
    .right {
      float: right;
    }
    .banner {
      width: 100%;
      vertical-align:middle;
    }
    .left  {
      float: left;
    }
    .backgrund{
      background: #fafafa;
      padding: 5px;
    }
    .classify {
      background: white;
    }
</style>
<script>
import down from './down.vue'
import goods from './sgoods.vue'
import Panel from './Panel.vue'
import { setTimeout } from 'timers';
export default {
  name:'classify',
   data(){
     return{
       notice:'',
       timer:3,
       page:0,
       time:'',
       state:1,
       flage:0,
       masgs:[],
      
     }
   },
  components: {
    goods,
    Panel,
    down
    
  },
 methods:{
   zzy(data){
     
     for(var i=0;i<this.masgs.length;i++){
       
       if(i==data){
         this.$set(this.masgs[i],'close','2')
       }else{
         this.$set(this.masgs[i],'close','1')
       }
    }
    
   },
   change(data){
     this.flage=1;
     setTimeout(()=>{
      this.flage = data;
     },1500)
   },
   
   timeChange(){
    this.timer=this.timer-1;
    
   },
   back(){
     this.$router.push({path:'/a'})
   },
   backfirst(){
     this.$router.push({path:'/a'})
   }
 },
 //渲染页面
 created(){
   const mars = this.$route.params.val;
   this.notice = mars;
   let that = this;
     let postData = this.$qs.stringify({
                    parameter:mars
                })
      this.$http.post('/search/search',postData)
      .then(res=>{
        console.log(res)
          if(res.data.data.length==0){
          this.state= 0;
          this.time = setInterval(this.timeChange, 1000);
            setTimeout(()=>{
            this.$router.push({path:'/a'})
          },3000)
          
      
        }else {
          this.state= 1;
          that.masgs = res.data.data
          for(var i =0;i<that.masgs.length;i++){
          that.$set(that.masgs[i],'close','1')
          this.$set(that.masgs[i],'index',i)
        }
        }  
      })
     
 },
 mounted(){
 },
 watch:{
   
    $route:function(){
       let that = this;
      const mars = this.$route.params.val;
      this.notice = mars;
     
      let postData = this.$qs.stringify({
                    parameter:mars
                })
     this.$http.post('/search/search',postData)
      .then(res=>{
        // console.log(res)
        // console.log(res.data.code);
        // this.state= res.data.code;
       if(res.data.data.length==0){
          this.state= 0;
          this.time = setInterval(this.timeChange, 1000);
            setTimeout(()=>{
            this.$router.push({path:'/a'})
          },3000)
          
      
        }else {
            this.state= 1;
           that.masgs = res.data.data
          for(var i =0;i<that.masgs.length;i++){
          that.$set(that.masgs[i],'close','1')
          this.$set(that.masgs[i],'index',i)
        }
        }
      })
    }
 },
 beforeDestroy() {
      clearInterval(this.time);
    }
}
</script>
