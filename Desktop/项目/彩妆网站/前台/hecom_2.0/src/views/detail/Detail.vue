<template>
<div class="detail clear">
    <div v-if="this.isGetdata===0" class="loading">
        正在加载
    </div>
    <div  v-else-if="this.isGetdata===1" class="normal">
        <!-- 头部层级导航 -->
        <div class="bread-crumbs">
            <span><a href="/">首页</a></span>
            <span>»</span>
            <span><a href="/">{{this.$store.state.detail.data.product[0].firstlevel_name}}</a></span>
            <span>»</span>
            <span><a href="/">{{this.$store.state.detail.data.product[0].secondlevel_name}}</a></span>
            <span>»</span>
            <span><a href="/">{{this.$store.state.detail.data.product[0].product_name}}</a></span>
        </div>
        <!-- 上方商品详情区域 -->
        <div class="top clear">
            <preview></preview>
            <imformation></imformation>
        </div>
        <!-- 中间推荐商品区域 -->
        <shopGuess />
        <!-- 评论区域 -->
        <discuss />
    </div>
    <div  v-else-if="this.isGetdata===-1" class="error">
        请求失败，请稍后再试
    </div>
    <router-view></router-view>
</div>
    
</template>
<script>
import preview from '@/views/detail/Preview.vue';
import imformation from '@/views/detail/Imformation.vue';
import shopGuess from '@/views/detail/ShopGuess.vue';
import discuss from './Discuss.vue';
import { mapActions } from 'vuex';
export default {
    name:'detail',
    components:{
        preview,
        imformation,
        shopGuess,
        discuss
    },
    data() {
        return{
           id:14
        }
    },
    methods:{
         ...mapActions([
      'detail/getdetailData',
    ]),
        // 实例
        cd() {
            this.$store.state.home.showLogin = true
        }
    },
    computed:{
        isGetdata:function(){
            return  this.$store.state.detail.RETURNCODE
        },
        // getstatus:function(){
        //     return this.$store.state.detail.isGetdata
        // },
       
    },
    created:function(){
        console.log(this.$route.params.id)
        let productID = this.$route.params.id
        this['detail/getdetailData'](productID);    
    },
    watch:{
        "$route.params"(){
            let productID = this.$route.params.id
            this['detail/getdetailData'](productID);   
        }
    },
}
</script>
<style scoped>
  .detail{
     margin: 0;
     padding: 0; 
     width: 80%;
     margin: 0 auto;
     min-width: 1024px;
     max-width: 1440px;
     text-align: left;
     line-height: 16px;
     box-sizing: border-box;
     vertical-align: middle;
     margin-top: 130px;
  }
  .bread-crumbs{
      font-size: 14px;
      color: #111;
      padding: 10px 0;
  }
  .bread-crumbs span:last-child a{
      color: rgb(143, 118, 85);
  }
  .bread-crumbs a{
      font-size: 12px;
      text-decoration: none;
      color: #111;
  }
  .top{
      width: 100%; 
  }
  .loading,.error{
      line-height: 200px;
      text-align: center;
  }
</style>


