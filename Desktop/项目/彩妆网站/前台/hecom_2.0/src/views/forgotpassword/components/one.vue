<template>
    <div class="one">
        <div class="numberbox">
        <input @keydown.enter="next" type="text" name="" id="number" placeholder="手机号码/邮箱地址" v-model="number">
        <div class="notice" v-show="notice">{{noticetext}}</div>
        </div>
        <input type="button" value="下一步" class="next" @click="next">
        <div class="remember">
            <span>记起密码？</span> 
            <a @click='tologin' href="javascript:;">登录</a>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            number:'',
            notice:false,
            noticetext:'',
        }
    },
    methods:{
        next(){
            var _this = this
            if(this.number == ''){
                this.notice = true;
                this.noticetext = '请填写您的账户名'
            }else{
                let postData = this.$qs.stringify({
                    userAccess:this.number
                })
                this.$http.post('/login/getuser',postData)
                .then(res => {
                    console.log(res.data)
                    if(res.data.code == -1) {
                        _this.notice = true;
                        _this.noticetext = '该账户不存在，请检查'
                    }else if(res.data.code == 1){
                        _this.notice = false;
                        _this.$router.push('/forgotpassword/two');
                        _this.indexfn(2)
                        sessionStorage.setItem('forget_phone',res.data.data.userphone)
                        sessionStorage.setItem('forget_email',res.data.data.useremail)
                    }
                })
                .catch(err => {
                    console.log(err,'err')
                })
            }
        },
        tologin() {
            this.$emit('tologin')
        },
        indexfn(i) {
            this.$emit('indexfn',i)
        }
    }
}
</script>
<style scoped>
    .one{
        width: 550px;
    }
    .one input{
        display: block;
        margin: 0 auto;
        
    }
    .numberbox{
        margin: 30px auto 30px;
        position: relative;

    }
    #number{
        width: 257px;
        height: 49px;
        background: #f8f8f8;
        padding: 1px 4px;
        border: 1px solid #a0a0a0;    
    }
    .next{
        width: 269px;
        height: 55px;
        background: #000000;
        border: none;
        color: #ffffff;
        cursor: pointer;
    }
    .remember{
        width: 269px;
        text-align: left;
        margin: 30px auto;
        color: #999999;
        font-size: 14px;
    }
    .remember span{
        padding-right: 5px;
    }
    .remember a{
        color: #454545;
        cursor: pointer;
    }
    .notice{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        color: red;
        font-size: 12px;
        text-align: left;
        margin: 0 auto;
        width: 269px;
        position: absolute;
        left: 145px;
    }
</style>

