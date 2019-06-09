<template>
  <div v-if='show' class="home clear">
    <div @click='goto(0)' class="img">
        <img :src="banner[0].img_add" alt=""/>
    </div>
    <div @click='goto(1)' class="img">
        <img :src="banner[1].img_add" alt=""/>
    </div>
    <div @click='goto(2)' class="img">
        <img :src="banner[2].img_add" alt=""/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      banner:[],
      show:false
    }
  },
  created() {
    
    // this.$http.get('/index/getallsources')
    // .then(res => {
      for(let i = 0; i < 3; i++) {
        this.banner.push({
          img_add:require(`@/assets/home/${i+1}.jpg`),
          product_id:i+1,
        })
      }
      this.show = true
      // this.show = true
    // })
    // .catch(err => {
    //   console.log(err,'err')
    // })

    
  },
  methods: {
    goto(i) {
      this.$router.push('/detail/' + this.banner[i].product_id)
    },
  },
};
</script>

<style>
  .home {
    margin-top: 130px;
  }
  .img {
    float: left;
  }
  img {
    width: 100%;
    min-width:1024px;
    height: auto;
    vertical-align: middle;
  }
</style>
