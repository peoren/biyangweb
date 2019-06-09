<template>
    <div class="goodsnum" :class="{goodsnumactive:this.numflag}" @click="changeNumFlag()">
        <div class="goodsnumbox">
            <span>{{this.goodsdata.proNum}}</span><span class="iconfont icon-dayuhao"></span>
        </div>
        <div class="goodsnumbox" v-for="n in 5" :key="n" @click="changeGoodNum(n)">
            <span :key="n">{{n}}</span>
        </div>
    </div>
</template>
<script>

export default {
    data:function(){
        return {
            numflag:false,  
        }
    },
    props:['goodsdata','index'],
    methods:{
        /**
         * 改变下拉框的样式flag
         */
        changeNumFlag:function(){
            this.numflag=!this.numflag;
        },
        /**
         * 给父子件传值
         * n:点击的span的值 
         */
        changeGoodNum:function(n){     
            this.$emit('chchangeGoodNum',n,this.index)
            console.log(this.goodsdata,n);
            
        }
    },
    
}
</script>
<style scoped>
.goodsnum{
    float: left;
    box-sizing: border-box;
    width: 8%;
    overflow: hidden;
    margin-right: 5%;
    border:1px solid #a0a0a0;
    line-height: 31px;
    position: relative;
    left: -2%;
    height: 29px;
    
    transition: height .3s;
}

.goodsnumbox{
    box-sizing: border-box;
    width: 100%;
    padding:0 6px;
}
.goodsnumactive{
    height: 188px;

}
.icon-dayuhao{
    display: inline-block;
    transform:scale(0.8);
    color: #000;
    float: right;
    /* position: absolute;
    right: 6px; */
}
</style>
