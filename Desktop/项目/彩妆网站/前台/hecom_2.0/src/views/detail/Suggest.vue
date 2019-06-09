<template>
    <div class="suggest">
        <div class="todetail"  :class="{onpase:isOn}" @click="detailchange" ref="todetail">
            <p class="detitle">产品详情<span v-if="isOn">+</span><span v-else>-</span></p>
            <p>{{this.$store.state.detail.data.product[0].product_description}}</p>
        </div>
        <div class="touse"  :class="{usepase:useOn}" @click="usechange" ref="touse">
            <p class="usetitle">如何使用<span v-if="useOn">+</span><span v-else>-</span></p>
            <p>{{this.$store.state.detail.data.product[0].product_method}}</p>
        </div>
    </div>
    
</template>
<script>
export default {
    name:'suggest',
    data(){
        return{
            isOn:true,
            useOn:true
        }
    },
    methods:{
       detailchange:function(){
           this.isOn = !this.isOn; 
            if(this.isOn==false) {
                 this.$refs.todetail.style.maxHeight='200px';
                //  console.log(this.$refs.todetail.style.height)
            }else{
                this.$refs.todetail.style.maxHeight='40px'
            }
       },
       usechange:function(){
           this.useOn = !this.useOn;
           if(this.useOn==false) {
                 this.$refs.touse.style.maxHeight='200px';
                //  console.log(this.$refs.touse.style.height)
            }else{
                this.$refs.touse.style.maxHeight='40px'
            }
       } 
    }
}
</script>
<style scoped>
   .suggest{
       width: 280px;
       /* height: 100px; */
   }
   .todetail,.touse{
       cursor: pointer;
       line-height: 29px;
       color: #666;
       user-select:none;
       transition: max-height ease  .3s;
       overflow: hidden;
   }
   .todetail p span,.touse p span{
       float: right;
   }
   .todetail p,.touse p{
        padding-top: 10px;
   }
   .todetail .detitle,.touse .usetitle{
       border-bottom: solid 1px #999;
       padding-top: 10px;
       font-weight: 300;
       /* margin-top: 20px; */
   }
   .onpase,.usepase{
       max-height: 40px;
       transition: max-height ease .3s;
       overflow: hidden;
   }
</style>


