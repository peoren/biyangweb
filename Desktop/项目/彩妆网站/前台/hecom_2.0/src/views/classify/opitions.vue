<template>
    <div class="count" @click.stop="changeCount(cindex)" >
        <span class="countnum">{{msg}}</span>
    </div>
</template>
<script>
export default {
    name:'options',
    props:['msg','cindex'],
    methods:{
        
        changeCount:function(cindex){
            this.$emit('changeCount',cindex);
        }
    }
}
</script>
<style scoped>
   .count{
       width: 100%;
       height: 40px;
       box-sizing: border-box;
        text-align: center;
   
   }
  
   .count:hover{
       background: #eee;
   }
   .count span{
       line-height: 40px;
       color: #999;
   }
</style>