<template>
    <div class="tablehead clear">
        
        <div class="head">
            <div class="radiobox" @click="chAllSelect">
                <div class="radio" v-show="select">

                </div>
            </div>
            <span>商品</span>
            <span>价格</span>
            <span>数量</span>
            <span>总计</span>
        </div>

    </div>
</template>
<script>

export default {
    data:function(){
        return{
            select:false
        }
    },
    methods:{
        chAllSelect(){
            this.select=!this.select
            this.$store.commit('shopping_cart/chgoodsstate',this.select)
        }
    }
}
</script>
<style scoped>
.tablehead{
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    /* background: rgb(60, 50, 205); */
    border-top: 1px solid #a0a0a0;
    border-bottom: 1px solid #a0a0a0;
    padding: 15px 0;
    text-align: left;
}
span{
    display: inline-block;
    width: 14%;
    height: 18px;
    color: #a0a0a0;
    font-size: 12px;
}
span:nth-of-type(1){
    width: 30%;
    margin-left: calc(28% - 17px)
}
.radiobox{
    float: left;
    width: 15px;
    height: 15px;
    display: inline-block;
    background: #fff;
    border: 1px solid #a0a0a0
}
.radio{
    width: 13px;
    height: 13px;
    background: #a0a0a0;
    margin: 1px 0 0 1px;
}
.head{
    /* float: left; */
}
</style>

