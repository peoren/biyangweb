<template>
    <div class="buy" >
        <!-- 颜色选择框 -->
        <div class="colorchoose" :class="{collapse: isColl}" @click="isactive" ref="col">
            <!-- 默认选中的颜色 -->
            <div class="colorchoosed" >
                <div class="colorpic" :style="'background:'+geAllcolors[this.$store.state.detail.nowColor].product_inf_spic"></div>
                <span class="colorname">#{{geAllcolors[this.$store.state.detail.nowColor].product_format}}</span>
                <span class="iconfont icon-xiala"></span>
            </div>
            <!-- 调用组件生成的可选颜色 -->
            <allcolor v-for="(allColor,index) in geAllcolors" :key="index" :zz="allColor" :zindex="index" @changeChoosed="change"></allcolor>
        </div>
        <!-- 数量选择框 -->
        <div class="countchoose" :class="{countcollapse: iscountColl}" @click="iscountactive" ref="count">
            <!-- 默认数量，值为1 -->
            <div class="countchoosed">
                <span class="countnum">数量:{{this.$store.state.detail.count}}</span>
                <span class="iconfont icon-xiala"></span>
            </div>
            <count v-for="index in 5" :key="index" :cindex="index" @changeCount="changeCount"></count>
        </div>
        <!-- 购买和添加购物车区域 -->
        <btn :stock="geAllcolors[this.$store.state.detail.nowColor].stock_num"/>
        <!-- 添加到心愿dan -->    
        <div  class="loginlike">
            <span  v-if="onlike" class="onlike">已添加心愿单</span>
            <span   v-else class="outlike" @click="addlove">添加到心愿单</span>
            
        </div>
        <!-- <div v-else class="like">
            <span>添加到心愿单</span>
        </div> -->
    </div>
</template>
<script>
import allcolor from '@/views/detail/Allcolor.vue';
import count from '@/views/detail/Count.vue';
import btn from '@/views/detail/Btn.vue';
export default {
    name:'buy',
    components:{
        allcolor,
        count,
        btn
    },
    data() {
        return {
            isColl: true,
            iscountColl:true,
            // choosecolor:'',
            // choosename:'',
            
            stock:0,
            logined:true,
            onlike:false,  
        }
    },
    methods: {
        //通过点击来切换展开和收缩
        isactive() {
            this.isColl = !this.isColl;
            if(this.isColl==false) {
                 this.$refs.col.style.height=(this.geAllcolors.length+1)*44+'px'
                 console.log(this.$refs.col.style.height)
            }else{
                this.$refs.col.style.height='44px'
            }
            
        },
        iscountactive() {
            this.iscountColl = !this.iscountColl; 
            if(this.iscountColl==false) {
                 this.$refs.count.style.height=6*44+'px'
                //  console.log(this.$refs.col.style.height)
            }else{
                this.$refs.count.style.height='44px'
            }
        },
        //触发时修改选中的色号
        change(index){
            this.$store.state.detail.nowColor = index;
            // this.choosename = this.allColors[index].colorname;
        },
        changeCount(cindex){
            this.$store.state.detail.count = cindex;
        },
        addlove(){
            
            console.log('点击收藏')
            /* 获取参数 */
            let that = this
            let productId=this.$store.state.detail.data.product[0].product_id;
            let postData = this.$qs.stringify({
                    productId:productId,
                })
            this.$http.post('/pinformation/insertfavorite',postData)
            .then(res =>{
                console.log(res)
                if(res.data.code==1){
                     /* 如果返回值1，应该调用收藏成功 */
                     this.$modal({
                            // type:'提示',
                            msg:'加入心愿单成功',
                            type:'successful'
                        })
                     that.onlike = true;
                }else if(res.data.code==-1){
                    /* 如果返回值1，说明没登录 */
                    that.$store.state.home.showLogin = true
                }else{
                    /* 服务器报错 */
                }
            })
            .catch(err => {
                    console.log(err,'错误') 
            })     
        }
        
    },
    created:function(){
         let logined = sessionStorage.getItem('user_id');
         if(logined){
             console.log('点击收藏')
            /* 获取参数 */
            let that = this
            // let userToken = sessionStorage.getItem('user_id'),
            let product_Id=this.$store.state.detail.data.product[0].product_id;
            let postData = this.$qs.stringify({
                    productId:product_Id,
                })
            this.$http.post('/pinformation/comparewish',postData)
            .then(res =>{
                console.log(res)
                if(res.data.code==0){
                    /* 0代表没有收藏 */
                    that.onlike = false;
                    console.log('没有收藏')
                }else if(res.data.code==1){
                    /* 1代表已经收藏 */
                    that.onlike = true;
                    console.log('已经收藏')
                }else{
                    /* 服务器报错 */
                }
            })
            .catch(err => {
                    console.log(err,'错误') 
            })    
         }
    },
    computed:{
        geAllcolors:function(){
            return this.$store.state.detail.data.goodsDataList
        }
    },
    watch:{
        "$route.params"(){
           let logined = sessionStorage.getItem('user_id');
         if(logined){
             console.log('点击收藏')
            /* 获取参数 */
            let that = this
            // let userToken = sessionStorage.getItem('user_id'),
            let product_Id=this.$store.state.detail.data.product[0].product_id;
            let postData = this.$qs.stringify({
                    productId:product_Id,
                })
            this.$http.post('/pinformation/comparewish',postData)
            .then(res =>{
                console.log(res)
                if(res.data.code==0){
                    /* 0代表没有收藏 */
                    that.onlike = false;
                    console.log('没有收藏')
                }else if(res.data.code==1){
                    /* 1代表已经收藏 */
                    that.onlike = true;
                    console.log('已经收藏')
                }else{
                    /* 服务器报错 */
                }
            })
            .catch(err => {
                    console.log(err,'错误') 
            })    
         }
        }
    },
}
</script>
<style scoped>
   .buy{
       width: 280px;
       height: 210px;
       margin-top: 30px;
       position: relative;  
   }
   /* 颜色选择框的样式 */
   .colorchoose{
       width: 145px;
       box-sizing: border-box;
       border: solid 1px #999;
       cursor: pointer;
       position: absolute;
       top: 0;
       left: 0;
       background: #fff;
       z-index: 10;
       user-select:none;
       transition: height ease-in-out .3s;
       overflow: hidden;
   }
   .collapse {
       overflow: hidden;
       height: 44px;
   }
   .colorchoose .colorchoosed{
       width: 100%;
       height: 44px;
       box-sizing: border-box;
       padding: 12px 0 12px 8px;
   }
   .colorchoose .colorchoosed span{
       line-height: 20px;
       color: #999;
   }
   .colorpic{
       width: 20px;
       height: 20px;
       float: left;
       margin-right: 4px;
   }
   


   /* 数量选择框的样式 */
   .countchoose{
       position: absolute;
       top: 0;
       right: 0;
       width: 125px;
       /* height: 44px; */
       box-sizing: border-box;
       border: solid 1px #999;
       cursor: pointer;
       background: #fff;
       z-index: 10;
       user-select:none;
       transition: height ease-in-out .3s;
       overflow: hidden;
   }
   .countcollapse{
       overflow: hidden;
       height: 44px;
   }
   .countchoosed{
       width: 100%;
       height: 44px;
       box-sizing: border-box;
       padding: 12px;
       line-height: 20px;
       color: #999;
   }
   .countchoosed span:last-child{
       float: right;
   }
   .like{
       width: 100%;
       position: absolute;
       left: 0;
       top:152px;
       text-align: center;
       font-size: 14px;
       color: #666;
       line-height: 40px;
       user-select:none;
   }
   .like span{
       cursor: pointer;
       border-bottom: solid 1px #666;
   }
   .like span:hover{
       border-bottom: solid 1px #000;
       color: #000;
   }
   .loginlike{
       width: 100%;
       position: absolute;
       left: 0;
       top:152px;
       text-align: center;
       font-size: 14px;
       color: #666;
       line-height: 40px;
       user-select:none;
   }
   .onlike{
       border-bottom: solid 1px rgb(122, 105, 78);
       color: rgb(122, 105, 78);
   }
   .outlike{
       cursor: pointer;
       border-bottom: solid 1px #666;
   }
   .outlike:hover{
       border-bottom: solid 1px #000;
       color: #000;
   }


</style>


