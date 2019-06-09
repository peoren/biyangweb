<template>
    <div class="allcolor" @click="changeColor(zindex)" >
        <div class="colorpic" :style="'background:'+this.$store.state.detail.data.goodsDataList[zindex].product_inf_spic"></div>
        <span class="colorname">#{{this.$store.state.detail.data.goodsDataList[zindex].product_format}}</span>
        <!-- geAllcolors[this.$store.state.detail.nowColor].product_format -->
        <span class="iconfont icon-xiala"></span>
    </div>
</template>
<script>
export default {
    name:'allcolor',
    props:["zz","zindex"],
    methods:{
        //点击时通过触发父组件的方法，修改选中的颜色
        changeColor:function(index){
            // this.$emit('changechoosed',index)
            this.$emit('changeChoosed',index);
            console.log(index);
        }
    }
}
</script>
<style scoped>
   .allcolor{
       width: 100%;
       height: 44px;
       box-sizing: border-box;
       padding: 12px 0 12px 8px;
   }
   .allcolor:hover{
       background: #eee;
   }
   .allcolor .colorpic{
       width: 20px;
       height: 20px;
       background: rgb(65, 52, 52);
       float: left;
       margin-right: 4px;
   }
   .allcolor span{
       line-height: 20px;
       color: #999;
   }
</style>


