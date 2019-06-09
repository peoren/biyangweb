<template>
    <div class="preview">
        <div class="preview-one">
            <img :src="getShopUrl[getchoose].product_inf_bpic" alt="">
        </div>
        <div class="preview-two" v-if="getShopUrl[getchoose].product_inf_fpic">
            <img :src="getShopUrl[getchoose].product_inf_fpic" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name: 'preview',
    data(){
        return{
          
        }
    },
    computed:{
       getchoose:function(){
           return this.$store.state.detail.nowColor
       },
        getShopUrl:function(){
            return this.$store.state.detail.data.goodsDataList
        }
    },
}
</script>
<style scoped>
    .preview{
        width: 50%;
        float: left;
    }
    .preview-one{
        position: relative;
        width: 100%;
        height: 0;
        padding: 100% 0 0;
        box-sizing: content-box;
    }
    .preview-one img{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .preview-two{
        width: 100%;
    }
    .preview-two img{
        width: 100%;
    }
</style>


