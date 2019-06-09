<template>
<!-- 颜色选择组件 -->
    <div class="allcolor"  @click.stop="changeColor(zindex)" >
        <div class="colorpic" :style="'background:'+zz.productInfSpic"></div>
        <span class="colorname">#{{zz.productFormat}}</span>
    
    </div>
</template>
<script >
export default {
    name:'allcolor',
    props:["zz","zindex"],
    data(){
        return{
            arr:[]
        }
    },
    methods:{
        // 点击时通过触发父组件的方法，修改选中的颜色
        changeColor(){
            this.arr.push(this.zindex)
            this.arr.push(this.zz.productInfId)  
              this.$emit('changeChoosed',this.arr)
              
        },
     
    },
}
</script>
<style scoped>
   .allcolor{
       width: 100%;
       height: 44px;
       box-sizing: border-box;
       padding: 12px;
       transition:all 1s;
   }
   .allcolor:hover{
       background: #eee;
   }
   .allcolor .colorpic{
       width: 20px;
       height: 20px;
       background: rgb(65, 52, 52);
       float: left;
       margin-right: 10px;
   }
   .allcolor span{
       line-height: 20px;
       color: #999;
   }
</style>


