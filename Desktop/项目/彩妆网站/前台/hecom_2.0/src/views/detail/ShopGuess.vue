<template>
    <div class="shopGuess clear">
        <h3>推荐商品</h3>
        <div class="goodspic clear">
            <goods v-for="(item,index) in this.shopGuesss" :key="index" :id="index"></goods>
        </div>
    </div>
    
</template>
<script>
import goods from '@/views/detail/Goods.vue'
export default {
    name:'shopGuess',
    components:{
       goods, 
    },
    computed: {
        shopGuesss () {
        return this.$store.state.detail.data.recommendList
        }
    },
    created:function(){
        // this.$store.commit('detail/setPrevUrl')
        // console.log(this.$store.state.detail.num)
    },
    mounted: function(){
        // console.log(this.$store.state.detail.url)
    //   this.$store.commit('setPrevUrl', 10);
    },
}
</script>

<style scoped>
  .shopGuess{
      float: left;
      width: 100%;    
  }
  h3{
      width: 100%;
      font-size: 28px;
      font-weight: 300;
      color: #333;
      line-height: 40px;
      text-align: center;
      margin-bottom: 55px;
  }
</style>


