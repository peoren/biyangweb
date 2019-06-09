    <template>
    <div class="three">
        <input @keydown.enter='sure' ref='pass' type="password" name="" id="pass" placeholder="新密码6-12个字符" v-model="newpass">
        <input @keydown.enter='sure' type="password" name="" id="pass" placeholder="确认新密码" v-model="surepass">
        <div v-show="different" class="different">{{errmsg}}</div>
        <input type="button" value="确定" class="sure" @click="sure">  
    </div>
</template>
<script>
export default {
    data(){
        return{
            newpass:'',
            surepass:'',
            different:false,
            errmsg:''
        }
    },
    methods:{
        indexfn(i) {
            this.$emit('indexfn',i)
        },
        sure(){
            var _this = this
            if(this.newpass != '' && this.surepass != '' && this.newpass == this.surepass && this.newpass.length > 5){
                // 请求修改密码
                 let postData = this.$qs.stringify({
                    newPwd:_this.newpass,
                    userAccess: sessionStorage.getItem('forget_phone')
                })
                this.$http.post('/login/setnewpwd',postData) 
                .then(res => {
                    console.log(res)
                    if(res.data.code == 1) {
                        this.$router.push("four");
                        this.different = false;
                        this.indexfn(4)
                    }else {
                        alert('未知错误')
                    }
                })
                // 成功后的处理
              
            }else if(this.newpass != '' && this.newpass != '' && this.newpass != this.surepass){
                this.different = true;
                this.errmsg = '密码不一致！'
            }
            else{
                if(this.newpass == ''){
                    this.$refs.pass.focus()
                    this.different = false;
                }
                if(this.newpass.length < 6) {
                    this.different = true;
                    this.errmsg = '新密码至少6个字符'
                }
            }
        }
    }
}
</script>
<style scoped>
.three{
    width: 540px;
    position: relative;
}
.input{
    width: 274px;
    height: 55px;
}
#pass{
    width: 266px;
    height: 55px;
    background: #fcfcfb;
    border: 1px solid #a0a0a0;
    padding: 0 4px;
    margin-top:30px;
}
.sure{
    width: 274px;
    height: 55px;
    background: #000000;
    border: none;
    color: #ffffff;
    cursor: pointer;
    margin-top:40px;
}
.different{
    position: absolute;
    left: 140px;
    color: red;
    font-size: 12px;
    bottom:70px;
}
</style>

