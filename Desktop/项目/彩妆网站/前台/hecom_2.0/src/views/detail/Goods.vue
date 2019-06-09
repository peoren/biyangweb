<template>
    <div class="goods">
       <div class="pic">
           <img :src="this.$store.state.detail.data.recommendList[id].productPic" alt="">
       </div>
       <p class="slogan">{{this.$store.state.detail.data.recommendList[id].secondlevelEname}}</p>
       <p class="title">{{this.$store.state.detail.data.recommendList[id].productName}}</p>
       <div class="btn" @click="knowmore">查看详情</div>
    </div>
</template>
<script>
export default {
    name:'goods',
    props:["id"],
    created(){
        console.log(this.$store.state.detail.data.recommendList[this.id].product_Id)
    },
    methods:{
        knowmore:function(){
            this.$router.push('/detail/'+this.$store.state.detail.data.recommendList[this.id].productId)
        }
    }
}
</script>
<style scoped>
   .goods{
      float: left;
      box-sizing: border-box;
      padding: 0 10px;
      width: 25%;
   }
   .pic{
       position: relative;
       width: 100%;
       padding: 100% 0 0;
   }
   .pic img{
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
   }
   .slogan{
       width: 100%;
       height: 20px;
       font-size: 18px;
       line-height: 20px;
       color: #999;
       text-align: center;
       margin-top: 20px;
       font-weight: 500;
   }
   .title{
       width: 100%;
       height: 16px;
       font-size: 16px;
       line-height: 16px;
       color: #000;
       text-align: center;
       margin: 10px 0;
       font-weight: 300;
   }
   .btn{
       cursor: pointer;
       width: 144px;
       height: 44px;
       margin: 5px auto 0;
       border: solid 1px #333 ;
       line-height: 44px;
       text-align: center;
       font-size: 14px;
       color: #333;
       user-select:none;
   }
   .btn:hover{
       border: solid 1px #999 ;
       color: #999;
   }
</style>


