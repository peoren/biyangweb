<template>
    <div class="discuss clear">
        <h3>商品评论</h3>
        <div class="discusstitle clear">
            <span class="producttitle">{{this.$store.state.detail.data.product[0].product_name}}</span>
            <span class="star">
                <i  v-for="(review,l) in Math.floor(this.$store.state.detail.data.level)"  :key="l" class="iconfont icon-wujiaoxing"></i>
            </span>
            <span class="personcount">总评分</span>
            
            
        </div>
        <div  v-for="(item,index) in this.discuss" :key="index" class="discussslip clear">
            <div class="item-grade">
                <span class="username">{{item.user_name}}</span>
                <span class="userstar">
                    <i  v-for="(item,i) in Math.floor(item.evaluate_level)"  :key="i" class="iconfont icon-wujiaoxing"></i>
                </span>
            </div>
            <div class="item-detail">
                <p class="discusstext">{{item.evaluate_text}}</p>
                <div class="pic">
                    <div v-for="(discusspic,j) in pic" :key="j" class="picitem">
                        <img :src="discusspic.picsrc" alt="">
                    </div>
                </div>
            </div>
            
        </div>
        <div class="lodingbtn">
            <button type="button">更多评论</button>
        </div>
    </div>
</template>
<script>


export default {
    name:'discuss',
    methods:{
        addavailablecount:function(index){
           this.discuss[index].availablecount++
        }
    },
    data(){
        return{
            // reviewcount:5,
            // discuss:this.$store.state.detail.data.evaluate,
            pic:[{picsrc:"https://www.cledepeau-beaute.com.cn/public/images/22/0a/6f/2ecc3e84bcdbcfda480e2419f569001594f1cc7b.png?1468487804#h"},
            {picsrc:"https://www.cledepeau-beaute.com.cn/public/images/22/0a/6f/2ecc3e84bcdbcfda480e2419f569001594f1cc7b.png?1468487804#h"},
            {picsrc:"https://www.cledepeau-beaute.com.cn/public/images/22/0a/6f/2ecc3e84bcdbcfda480e2419f569001594f1cc7b.png?1468487804#h"}
            ],
        }
    },
    computed:{
        discuss:function(){
            return this.$store.state.detail.data.evaluate
            
        }
    },
    created:function(){
        console.log(this.$store.state.detail.data.evaluate)
    }
}
</script>
<style scoped>
  .discuss{
      float: left;
      width: 100%;
      box-sizing: border-box;
  }
   .discuss h3{
      width: 100%;
      font-size: 28px;
      font-weight: 300;
      color: #333;
      line-height: 40px;
      text-align: center;
      margin: 85px 0 55px;
  }
  .discusstitle{
      padding: 50px 60px;
      line-height: 20px;
      border-top: solid 1px #999;
  }
  .producttitle{
      font-size: 18px;
      color: #000;
      width: 200px;
      vertical-align: middle;
  }
  .personcount,.star{
      float: right;
      font-size: 14px;
      line-height: 20px;
  }
  .discussslip{
      padding: 40px 60px;
      box-sizing: border-box;
      width: 100%;
      border-top: solid 1px #999;
  }
  .item-grade{
      width: 15%;
      float: left;
      padding-right: 30px;
  }
  .username{
      font-size: 14px;
      color: #000;
      display: inline-block;
      width: 50%;
  }
  .userstar i{
      font-size: 10px;
  }
  .item-detail{
      float: left;
      width: 50%;
  }
  .discusstext{
      font-size: 16px;
      color: #666;
      padding-left: 10px;
      line-height: 16px;
  }
  .pic{
      margin-top: 30px;
  }
  .picitem{
      position: relative;
      width: 20%;
      height: 0;
      padding: 20% 0 0;
      margin: 10px;
      border: solid 1px #666;
      float: left;
  }
  .picitem img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
  .item-available{
      width: 30%;
      float: right;
      padding: 50px 0;
      background: #f8f8f8;
  }
  .item-available p:first-child{
      width: 100%;
      text-align: center;
      padding-bottom: 20px;
      font-size: 14px;
      color: #666;
  }
  .item-available p:last-child{
      width: 100%;
      text-align: center;
      padding-top: 20px;
      font-size: 14px;
      color: #666;
  }
  .avaliBtn{
      text-align: center;
  }
  .avaliBtn button{
      cursor: pointer;
      width: 35%;
      height: 44px;
      background: #000;
      border: none;
      outline: none;
      color: #fff;
      font-size: 16px;
  }
  .avaliBtn button+button{
      margin-left: 15px;
  }
  .avaliBtn button:hover{
      background:#fff;
      border: solid 1px #000;
      color: #000;
  }
  .lodingbtn{
      width: 100%;
      text-align: center;
      padding-bottom: 50px;
  }
  .lodingbtn button{
      cursor: pointer;
      width: 180px;
      height: 44px;
      background: #fff;
      border: solid 1px #000;
      font-size: 14px;
      color: #000;
      outline: none;
  }
  .lodingbtn button:hover{
      font-size: 14px;
      color: #fff;
      background: #000;
  }
</style>


