<template>
    <div class="four">
        <div class="text clear">
           <div style="float:left">
               <img src="@/assets/order/yes.png" alt="">
            </div>
           <div>
               新密码已经设置成功
           </div>
        </div>
        <div class="registerbox">
        <input @click='tologin' type="button" value="立即登录" class="register"> 
        </div> 
    </div>
</template>
<script>
export default {
    methods:{
        tologin() {
            this.$store.state.home.showLogin = true
        },
    }
}
</script>
<style scoped>
.four{
    width: 550px;   
}
.text{
    text-align: left;
    padding-left: 140px;
    margin: 20px auto 0;
}  
.registerbox{
    margin: 20px auto;
} 
.register{
    width: 274px;
    height: 55px;
    background: #000000;
    border: none;
    color: #ffffff;
    cursor: pointer;
}
</style>
