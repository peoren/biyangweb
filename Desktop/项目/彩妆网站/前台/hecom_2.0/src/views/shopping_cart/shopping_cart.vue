<template>
    <div id="shopcart" class="clear">
        <shopcartleft />
        <shopcartright />
    </div>
</template>
<script>
import shopcartleft from '@/views/shopping_cart/shopcartleft.vue'
import shopcartright from '@/views/shopping_cart/shopcartright.vue'
// import icfont from '@/components/iconfont-cart.css'
export default {
    components:{
        shopcartleft,
        shopcartright
    }
}
</script>
<style scoped>
#shopcart{
    width: 80%;
    min-height: 769px;
    max-width: 1440px;
    min-width: 1024px;
    /* background: rgb(70, 67, 73); */
    margin: 0 auto;
    /* height: 50px; */
    margin-top: 130px;
}
</style>
