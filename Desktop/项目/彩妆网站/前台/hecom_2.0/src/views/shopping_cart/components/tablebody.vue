<template>
    <div class="tablebody">
    <transition-group name="list-complete" tag="p">
        <div class="tablebody_contain"  v-for="(gd,index) in goodsdata" :key="index">
            <div class="radiobox" @click.stop="gd.select=!gd.select">
                <div class="radio" v-show="gd.select" >

                </div>
            </div>
            <img :src="gd.proInfPic" alt="">
            <div class="goodsname">
                <p id="goodsclassify">{{gd.secondlevelEname}}</p>
                <p id="goodsname">{{gd.proName}}</p>
                <p id="goodssize">{{gd.proFormat}}</p>
                <span id="shopremove" @click="goodsRemove(index)" >移出</span>
                
                <span id="heartadd" @click="insertfavorite(index)" v-show="!gd.favoriteFlag">加入心愿单</span>
                <span v-show="gd.favoriteFlag" id="favorite">
                    <span>已收藏 | </span>
                    <span @click="removefavorite(index)">移出</span>
                </span>
            
            </div>
            <div class="goodsprice">
                <p>￥{{gd.proPrice}}</p>
            </div>
            <!-- <transition name="fade"> -->
                <selectorlist :goodsdata='goodsdata[index]' :index='index' @chchangeGoodNum='changeGoodNum'  :key='index' />
            <!-- </transition> -->
            <div class="goodsallprice">
                ￥{{gd.proPrice*gd.proNum}}
            </div>
        </div>
    </transition-group>
        <p class="allprice">
            总金额:￥{{allprice}}
        </p>

    </div>
</template>
<script>
import selectorlist from '@/views/shopping_cart/components/selectorlist.vue'

export default {
    name:'tablebody',
    components:{
        selectorlist,
        
    },
    data:function(){
        return {
            proInfPic:'',
            goodsdata:'',
            myfavorite:'',
            integral:''
            // favoriteFlag:''
        }
    },
    methods:{
        /**
         * 设置ajax返回的数据，并且将数据转换出来
         */
        getData:function(){
            let localdata=[{
                proInfId:1,
                proNum:10,
                proName:'肌肤之钥立体紧颜精华乳',
                proPrice:2380,
                proFormat:'40ml',
                secondlevelEname:'the serum',
                proInfPic:'https://www.cledepeau-beaute.com.cn/public/images/f7/46/b2/e337d87ec2c984660b6ab97d0147006cd89a33f8.png?1545374980#h'
                
            },
            {
                proInfId:2,
                proNum:1,
                proName:'晶致肌活精华露',
                proPrice:1100,
                proFormat:'40ml',
                secondlevelEname:'the serum',
                proInfPic:'https://www.cledepeau-beaute.com.cn/public/images/f7/46/b2/e337d87ec2c984660b6ab97d0147006cd89a33f8.png?1545374980#h'
            },
                {
                proInfId:3,
                proNum:1,
                proName:'光采保湿露(湿润型) 12mL',
                proPrice:50,
                proFormat:'40ml',
                secondlevelEname:'the serum',
                proInfPic:'https://www.cledepeau-beaute.com.cn/public/images/f7/46/b2/e337d87ec2c984660b6ab97d0147006cd89a33f8.png?1545374980#h'
            },
            
            ]
            localdata=JSON.stringify(localdata);
            localStorage.setItem('showpagedata',localdata)
            this.goodsdata=JSON.parse(localStorage.getItem('showpagedata'));//存入goodsdata  
        },
        /**
         * 监听selectorlist传来index,和n，修改goodsdata对应的数量
         * n:是selectorlist中选中的vlaue
         * index:因为不能同时监听，所以将点击的Index值传入子组件然后一起传给父组件
         */
        changeGoodNum:function(n,index){           
            
            let postData=this.$qs.stringify({
                // userToken:sessionStorage.getItem('user_id'),
                product_inf_id:this.goodsdata[index].proInfId,
                proNum:n
            })
             this.$http.post('/shopping/changepronum',postData) 
                .then(res => {
                    // console.log(res)
                    
                    if(res.data.code == 1) {
                        // console.log(res.data.data);
                        //改变文件内的数据
                        this.$set(this.goodsdata[index],'proNum',n)
                        
                    }else {

                    }
                })
                .catch(err => {
                    console.log(err,'123错误') 
                })
            
        },
        // 加载所有数据
        data(){
            const that=this
            // let userToken=sessionStorage.getItem('user_id')
            // console.log(userToken);
            
            let postData=this.$qs.stringify({
                
            })
             this.$http.post('/shopping/showcart',postData) 
                .then(res => {
                    if(res.data.code == 1) {
                        // console.log(res.data);
                        if(!res.data.data.product.length){
                            that.$router.push('/clear_shopping_cart')
                            return false
                        }
                        
                        // console.log(res.data.data);
                        that.goodsdata=res.data.data.product
                        that.integral=res.data.data.userInte
                        // 为每个商品设置select值
                        for(let i in that.goodsdata){
                            that.$set(that.goodsdata[i],'select',false)
                        }
                        // 将数据提交到仓库
                        that.$store.state.shopping_cart.goodsdata=that.goodsdata
                        that.getfavorite()
                        
                    }else {
                        this.$router.push('/')
                    }
                })
                .catch(err => {
                    console.log(err,'错误') 
                })
              
        },
        // 取得所有心愿单数据
        getfavorite(){
            let postData=this.$qs.stringify({
                
            })
            this.$http.post('/pinformation/myfavorite',postData)
               .then(res => {
                    if(res.data.code == 1) {
                        // console.log(res.data.data);
                        this.myfavorite=res.data.data
                        
                        
                        this.setfavoriteFlag()
                    }else {
                        
                        this.$router.push('/')
                    }
                })
                .catch(err => {
                    console.log(err,'错误') 
                }) 
        },
        // 给数据设置favoriteFlag
        setfavoriteFlag(){
            // console.log(this.goodsdata,this.myfavorite);
            // console.log(this.myfavorite[j].productId);
            for(let i in this.goodsdata){
                this.$set(this.goodsdata[i],'favoriteFlag',false)
                for(let j in this.myfavorite){
                    if(this.goodsdata[i].productId==this.myfavorite[j].productId){
                            this.$set(this.goodsdata[i],'favoriteFlag',true)
                        }
                        
                        
                }
                  
            }
                 
        },
        goodsRemove:function(index){
            let that =this
            this.$confirm({
            // type:'提示',
            msg:'确认清除该商品',
            btn:{
                ok:'确认',
                no:'取消'
            }
                }).then(() => {
                let postData=this.$qs.stringify({
                    
                    // userToken:sessionStorage.getItem('user_id'),
                    product_inf_id:this.goodsdata[index].proInfId
                })
                this.$http.post('/shopping/delone',postData) 
                    .then(res => {
                        // console.log(res)
                        
                        if(res.data.code == 1) {
                            // console.log(res.data.data);
                            
                            that.goodsdata.splice(index,1)
                            that.$modal({
                                msg:'移出成功',
                                type:'successful'
                            })
                            if(!this.goodsdata.length){
                                that.$router.push('/clear_shopping_cart/')
                            }
                        }else {

                        }
                    })
                    .catch(err => {
                        console.log(err,'错误') 
                    })
            })
            .catch(() => {
                    console.log('清除该商品失败');
                })
        },
        // 加入心愿单
        insertfavorite:function(index){
            
            // let userToken=sessionStorage.getItem('user_id')
             let postData=this.$qs.stringify({
                // userToken:userToken,
                productId:this.goodsdata[index].productId
            })
             this.$http.post('/pinformation/insertfavorite',postData) 
                .then(res => {
                    if(res.data.code == 1) {
                        // 改变状态
                        this.goodsdata[index].favoriteFlag=true
                        // 添加模态框           
                        this.$modal({
                            // type:'提示',
                            msg:'加入心愿单成功',
                            type:'successful'
                        })
                                
                    }else {
                    }
                })
                .catch(err => {
                    console.log(err,'错误') 
                })
        },
        // 移出心愿单
        removefavorite:function(index){
            // let userToken=sessionStorage.getItem('user_id')
             let postData=this.$qs.stringify({
                // userToken:userToken,
                productId:this.goodsdata[index].productId
            })
             this.$http.post('/pinformation/delfavorite',postData) 
                .then(res => {
                    // console.log(res)
                    if(res.data.code == 1) {
                        
                        this.goodsdata[index].favoriteFlag=false
                        // 添加模态框           
                        this.$modal({
                            // type:'提示',
                            msg:'移出心愿单成功',
                            type:'successful'
                        })
                        
                        // this.$router.push('/clear_shopping_cart')
                    }else {

                    }
                })
                .catch(err => {
                    console.log(err,'错误') 
                })
        },
        
    },
    computed:{
        /**
         * 计算总金额
         * 遍历goodsdata计算总金额,
         * 在story中加入总价格和积分
         */
        allprice(){
            let allprice=0
            let integral=this.integral
            for( let i in this.goodsdata){
                if(this.goodsdata[i].select){
                    allprice+=this.goodsdata[i].proPrice*this.goodsdata[i].proNum
                }
                
            }
            //加入总价和积分
            this.$store.commit('shopping_cart/changeAllPri',allprice)
            this.$store.commit('shopping_cart/changeIntegral',integral) 
            return allprice
        },
        // setgoodsdata(){
        //     const {goodsdata} =this
        //     this.$store.state.shopping_cart.goodsdata=this.goodsdata
        // }
        
    },
    created(){
        /**
         * 从后台得到的数据写入goodsdata
         */
        // this.getData()
        this.data()
        /**
         * 计算总价
         */
        // this.getAllPrice()
    },
    watch:{
        goodsdata:{
            handler(newVal,oldVal){
                this.$store.state.shopping_cart.goodsdata=this.goodsdata
            },
            deep:true
        }
    }
} 
</script>
<style scoped>
.tablebody{
    width: 100%;
    color: #464646;

}
/*
    表格内容：包括组件的内容
*/

.tablebody_contain{
    height: 245px;
    padding: 15px 0px;
    /* background: lightcoral; */
    text-align: left;
    font-size: 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #a0a0a0;
    
}
.tablebody_contain>div{
    float: left;
}
img{
    display: block;
    float: left;
    width: 23%;
    margin-right: calc(5% - 17px)
}
.tablebody_contain>.goodsname{
    width: 30%;
    color: #000;
    font-size: 14px;
    margin-top: 6px;
}

.goodsprice{
    width: 14%;
}
.goodsallprice{
    margin-left: 7px;
    width: 14%;
}
#goodsname{
    font-size: 16px;
    margin: 6px 0px;
}
#goodssize{
    height: 20px;
    line-height: 18px;
    letter-spacing: 1px;
}
#shopremove,
#heartadd{
    display: block;
    float: left;
    height: 21px;
    font-size: 14px;
    border-bottom: 1px solid #a0a0a0;
    margin-top: 110px;
    cursor: pointer;
}
#shopremove{
    margin-right: 60px;
}
#favorite{
    margin-top: 110px;
    display: inline-block;
}
#favorite span:nth-of-type(2){
    cursor: pointer;
}
/* 总金额 */
.allprice{

    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 14px;
    color: #000;
    display: block;
    width: 100%;
    text-align: right;
}
/* radiobox */
.radiobox{
    float: left;
    width: 15px;
    height: 15px;
    display: inline-block;
    background: #fff;
    border: 1px solid #a0a0a0;
    position: relative;
    top: 50%;
    margin-top: -8px;
}
.radio{
    width: 13px;
    height: 13px;
    background: #a0a0a0;
    margin: 1px 0 0 1px;
}
/* 动画 */
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
