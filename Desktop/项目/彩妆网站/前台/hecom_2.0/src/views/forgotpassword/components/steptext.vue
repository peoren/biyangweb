<template>
    <div class="steptext">
        <span :class='{on:index==1}'>1.填写账户名</span>
        <span>></span>
        <span :class='{on:index==2}'>2.身份验证</span>
        <span>></span>
        <span :class='{on:index==3}'>3.设置新密码</span>
        <span>></span>
        <span :class='{on:index==4}'>4.完成</span>
    </div>
</template>
<script>
export default {
    props:['index'],
}
</script>
<style scoped>
.steptext{
    width:550px;
    color: #aeaeae;
    text-align: left;
    border-bottom: 1px solid #a0a0a0;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.steptext span{
    padding-right: 30px;
}
.on {
    color: #454545;
}
</style>
