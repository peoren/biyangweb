<template>
    <div class="pic-wrap">
        <img :src="url" alt="">
    </div>
</template>
<script>
export default {
    name:'loding',
    data(){
        return{
            url:require('@/assets/loding.gif')
        }
    }
}
</script>
<style  scoped>
.pic-wrap{
    width: 80%;
    height: auto;
    margin: 0 auto;
}
.pic-wrap img{
    width: 100%;
    height: auto;
    vertical-align: middle;
}
</style>

