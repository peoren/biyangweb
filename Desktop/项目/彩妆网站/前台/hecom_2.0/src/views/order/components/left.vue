<template>
  <div class="left">
    <maplist/>
    <site :address="address" :addressDefault="addressDefault"/>
    <ex/>
    <payway/>
    <invoive/>
    <goods :shopCart="shopCart"/>
    <settlement
      :afterUseIn="afterUseIn"
      :shopCarCartTotalprice="shopCarCartTotalprice"
      :userIntegral="userIntegral"
      :shopCarPrice="shopCarPrice"
    />
  </div>
</template>
<script>
import site from "@/views/order/components/address.vue";
import ex from "@/views/order/components/ex.vue";
import payway from "@/views/order/components/payway.vue";
import invoive from "@/views/order/components/invoive.vue";
import goods from "@/views/order/components/goods.vue";
import settlement from "@/views/order/components/settlement.vue";
import maplist from "@/views/order/components/maplist.vue";
export default {
  name: "left",
  components: {
    maplist,
    site,
    ex,
    payway,
    invoive,
    goods,
    settlement
  },
  data: function() {
    return {
      shopCart: "",
      address: "",
      addressDefault: "",
      afterUseIn: "",
      shopCarCartTotalprice: "",
      userIntegral: "",
      shopCarPrice: ""
    };
  },
  methods: {
    //获取页面数据
    pagedata() {
       this.$route.params
       this.$store.commit('order_form/setproductInfId', this.$route.params.settlementData)
    },
    //获取后台数据
    postaddress() {
      
      let that = this;
      // console.log(this.$route.params.settlementData);
      
      let data=JSON.stringify(
            this.$route.params.settlementData
            
        )
      let postData = this.$qs.stringify({
        settlementData:data
      })
        // console.log(data);
        
        // userToken: sessionStorage.getItem("user_id"),

        // userToken: "670d64d2b83e4a2cab5a4bf67a7630b3"
      this.$http.post("/shopping/buynow", postData)
        .then(function(res) {
          console.log(res.data);
          if (res.data.code == 1) {
            // console.log(res.data.data);
            if(!res.data.data.addressList.length){
              // console.log('地址为空');
              that.address = [];
              that.addressDefault = {};
            }else{
              that.address = res.data.data.addressList;
              that.addressDefault = res.data.data.defaultAddress;
            }
            
            that.shopCart = res.data.data.showCartAttrList;

            that.afterUseIn = res.data.data.afterUseIn;
            that.shopCarCartTotalprice = res.data.data.shopCarPriceWithMail;
            that.userIntegral = res.data.data.userIntegral;
            that.shopCarPrice = res.data.data.shopCarPrice;
          } else {
          }
        })
        .catch(err => {
          console.log(err, "错误");
        });
    }
  },
  created() {
    this.pagedata();
    this.postaddress();
  }
};
</script>
<style scoped>
.left {
  width: 75%;
  float: left;
}
</style>

