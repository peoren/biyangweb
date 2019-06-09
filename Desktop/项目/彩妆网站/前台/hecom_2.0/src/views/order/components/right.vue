<template>
    <div class="right">
        <helpbox />
        <billbox />
    </div>
</template>
<script>
import helpbox from '@/views/shopping_cart/components/helpbox.vue'
import billbox from '@/views/order/components/billbox.vue'
export default {
    name:'right',
    components:{
        helpbox,
        billbox
    }
}
</script>
<style scoped>
.right{
    width: 24%;
    float: right;
}
</style>

