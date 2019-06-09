<template>
<!-- 商品分类页 -->
  <div class="classify" >
    <div class="title">
      <a href="" @click.stop.prevent ='toHome'>首页</a>>>
      <a href="" v-if="num==0"  class="new">{{zhi}}</a>
      <a href="" @click.stop.prevent ='tolast' :price=price v-if="num==1">{{zhi}}</a>
      <span v-if="num==1">>></span>
      <a href="" v-if="num==1" class="new">{{zhi2}}</a>
    </div>
    <img class="banner" :src="banner" alt="">
    <div class="backgrund">
      <div class="box clear" >
        <down  @sort='sort'  :optionchange='optionchange'/>
      </div>
    </div>
    <div class="clear box allgoods">
     <goods @dochange='zzy' @suc='change' class="left" :masg='m' v-for="(m,index) in masgs" :key="index"  ></goods>
    </div> 
    <div v-if="state>0" class="box" >
      <Panel class="cutter" :state='state' :pagemark='pagemark' :reset='reset' :sorting='sorting' @dopage='dopage' />
    </div>
    
    <!-- <transition name="fade">
      <div class="suc clear" v-if="flage==1">
        <img src="../../assets/foundation/banner/yes.png" alt="">
        <p>已成功加入购袋!</p>
      </div>
    </transition> -->
    
  </div>
</template>
<style  scoped>
  .allgoods{
    margin: 0 0 40px 0;
  }
  .cutter {
    margin: auto;
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
   
   
    .title {
      height: 40px;
      padding-left:20px; 
      text-align: left;
      line-height: 40px;
      margin-top: 130px;
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
      position: relative;
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
      height: 40px;
      position: relative;
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
       zhi:'',
       zhi2:'',
       num:0,
       parameter:'',
       price:0,
       page:0,
       pagemark:'',
       arr:[],
       state:0,
       thepage:'',
       banner:'',
       sorting:0,
       reset:0,
       optionchange:1,
       value:[
         '唇部彩妆','光耀底妆', '面部彩妆','眼部彩妆', '产品功效','护理类型','化妆工具'
       ],
     
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
    //切换按钮
   zzy(data){
     for(var i=0;i<this.masgs.length;i++){
       if(i==data){
         this.$set(this.masgs[i],'close','2')
       }else{
         this.$set(this.masgs[i],'close','1')
       }
    }
   },
   //加入购物袋
   change(data){
    //  this.flage=1;
    //  setTimeout(()=>{
    //   this.flage = data;
    //  },1500)
    // 添加模态框           
      this.$modal({
          // type:'提示',
          msg:'添加购物车成功',
          type:'successful'
      })
   },
   //返回首页
   toHome(){
     this.$router.push({path:'/a'})
   },
   //返回上一级菜单
   tolast(){
      this.$router.push("/classify/" + this.price)
      // console.log(this.$router.push("/classify/" + this.price))
   },
   dopage(data){
     this.masgs = data;
      for(var i =0;i<this.masgs.length;i++){
          this.$set(this.masgs[i],'close','1')
          this.$set(this.masgs[i],'index',i)
        }
    //  console.log(data)
   },
   //排序
   sort(data){
    var roll =0;
     this.reset++;
     if(data=='排序'){
       roll =0;
       this.sorting = roll;
     }else if (data == '价格从高到低'){
       roll=2;
        this.sorting = roll;
     }else if(data=='价格从低到高'){
       roll=1;
        this.sorting = roll;
     }
     let that = this;
      this.$http.get('/product/orderfirst?orderType='+roll+'&goodsLevel='+this.parameter)
      .then(res=>{

        // console.log(res.data.data);
       
        this.masgs = res.data.data;
        for(var i =0;i<that.masgs.length;i++){
          this.$set(that.masgs[i],'close','1')
          this.$set(that.masgs[i],'index',i)
        }
        // console.log(this.masgs)
      })
   }
 },
 computed:{

 },
 //页面渲染
 beforeCreate(){
   
 },
 created(){
   const mark=this.$route.params.id;
    this.pagemark = mark;
      const arr=mark.split('-');
     this.price = arr[0];
  
      let that = this;
     this.parameter=mark;
    
      this.$http.get('/product/getallgoods?type_id='+mark)
      .then(res=>{
         if(arr.length>1){
           this.banner = res.data.data.firstPic
          //  console.log(res.data)
           this.thepage= res.data.data.secondName
            this.zhi2=this.thepage
           this.masgs = res.data.data.pageInfo
           if(res.data.data.pageState%16==0){
            this.state = res.data.data.pageState/16 -1
           }else {
             this.state = parseInt(res.data.data.pageState/16)
           }
            
         }else {
            console.log(res.data)
           this.masgs = res.data.data.pageInfo
           if(res.data.data.pageState%16==0){
             this.state = res.data.data.pageState/16 -1
           }else {
             this.state = parseInt(res.data.data.pageState/16)
           }
            
            this.banner = res.data.data.firstPic 
            
         }
         
          // this.masgs = res.data.data.pageInfo
          //  console.log(res.data.data)
         
       for(var i =0;i<that.masgs.length;i++){
          this.$set(that.masgs[i],'close','1')
          this.$set(that.masgs[i],'index',i)
        }
        // console.log(this.masgs)
      })
    
 },
 //渲染上一级菜单和当前分类
mounted (){
  const mark=this.$route.params.id;
  this.pagemark=mark;
  const arr=mark.split('-');
   this.price= arr[0];
  if(arr.length<2){
    this.zhi=this.value[arr[0]-1];
    this.num = 0;
  }else {
     this.zhi=this.value[arr[0]-1];
     this.num = 1;
     this.zhi2=this.thepage
  }
  // console.log(this.$route.params.id)
},
//监听路由变化
 watch: {
    $route:function(){
      const mark=this.$route.params.id;
      this.pagemark=mark;
      const arr=mark.split('-');
     this.price = arr[0];
      this.optionchange++;//路由变化重置排序
      let that = this;
     this.parameter=mark;
     this.reset=1;
      this.$http.get('/product/getallgoods?type_id='+mark)
      .then(res=>{
         if(arr.length>1){//判断是否是二级分类
            // console.log(res.data)
           this.masgs = res.data.data.pageInfo//加载商品
             this.banner = res.data.data.firstPic
              this.thepage= res.data.data.secondName//二级分类名
                this.zhi2=this.thepage
             if(res.data.data.pageState%16==0){//判断是否有分页
             this.state = res.data.data.pageState/16 -1
           }else {
             this.state =parseInt(res.data.data.pageState/16)
           }
         
           
         }else {
            // console.log(res.data)
           this.masgs = res.data.data.pageInfo
           if(res.data.data.pageState%16==0){
             this.state = res.data.data.pageState/16 -1
           }else {
             this.state = parseInt(res.data.data.pageState/16)
           }
           this.banner = res.data.data.firstPic     
         } 
       for(var i =0;i<this.masgs.length;i++){//给商品添加控制展示规格的flage
          this.$set(that.masgs[i],'close','1')
          this.$set(that.masgs[i],'index',i)
        }
        // console.log(this.masgs)
      })
     if(arr.length == 1){
          this.zhi=this.value[arr[0]-1];
          this.num = 0;
      }else {
     this.zhi=this.value[arr[0]-1];
     this.num = 1;
     this.zhi2=this.thepage;
      }
      
    },
    
    deep: true,
    immediate: true
    }
  
}

</script>
