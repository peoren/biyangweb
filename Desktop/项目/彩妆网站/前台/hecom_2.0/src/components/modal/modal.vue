<template>
<transition name="bounce">
    <div class="modal" v-if="isShow">
        <div class="con_box" >
            <div class="context">
                <!-- <h6>{{text.type}}</h6> -->
                <span class="iconfont icon-chenggong" v-show="text.type=='successful'"></span>
                <span class="iconfont icon-gantanhao" v-show="text.type=='fail'"></span>
                <p>{{text.msg}}</p>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
export default {
    data(){
        return{
            isShow:true,
            text:{
                // type:'提示',              
                msg:'确定删除此条信息？',
                type:'successful',
                
            }
        }
    },
    methods:{
        
    },
    created(){
        
    }
}
</script>
<style scoped>
.modal{
    /* background-color:rgba(0, 0, 0, 0.6); */
    width: 100%;height: 100%; position: fixed;top: 0;
    
    }
.con_box{
    border: 1px solid #ccc;
    width: 200px;height: 130px;
    background-color: white;
    position: absolute;
    top: 0;bottom: 0;left: 0;right: 0;
    margin: auto;
    /* border-radius: 5px; */
    text-align: center
    }
.context{
    /* padding: 10px; */
    /* width: 350px;
    height: 250px; */
    }

.context p{
    font-size: 18px;
    /* padding: 15px; */
    margin-top: 20px;
    text-align: center;

}
.icon-chenggong,
.icon-gantanhao{
    display: inline-block;
  font-size: 35px;
  margin-top: 20px;
  color: rgb(93, 184, 93);  
}
.icon-gantanhao{
    color: brown;
}
/* 动画 */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

/* .btn{
    margin-top: 30px;
    text-align: right;
    }
.btn span{
    box-sizing: border-box;
    display: block;
    width: 151px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
}
.btn span:nth-child(1){
    background: #000;
    color: #fff;
    margin-bottom: 10px;
    }
.btn span:nth-child(2){
    background: #fff;
    color: #000;
    border: 1px solid #000;
    } */
</style>