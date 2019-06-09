<template>
    <div class="modulebg" :class='{"regsucc":addclass2}'>
        <div :class="{'openreg':addclass}" class="module clear">
            <p @click='cd' class="p1">注册</p>
            <p class="p2">基本信息</p>
            <input autofocus @blur='emailfn' v-model="email" placeholder="请输入邮箱" class="username" type="text">
            <p v-show="emailerr&&emailshow" class="err emailerr">{{emailmsg}}</p>
            <input @blur='userpassfn' v-model="userpass" placeholder="请填写密码，最少6个字符" class="userpass" type="password">
            <p v-show="userpasserr&&userpassshow" class="err userpasserr">密码格式不正确！最少6个字符！</p>
            <input @blur='surepassfn' v-model="surepass" placeholder="请确认密码" class="userpass" type="password">
            <p v-show="surepasserr&&surepassshow" class="err surepasserr">注意！2次密码不一致！</p>
            <div class="regdiv">
                <input @blur='phonefn' v-model="phone" placeholder="请输入11位的手机号码" class="phone userpass" type="text">
                <input @click="send" type="button" :value="sendmsg" name="" id="" class="canvas">
            </div>
            <p v-show="phoneerr&&phoneshow" class="err phoneerr">{{phonemsg}}</p>
            <input @blur='codefn' v-model="code" placeholder="请输入验证码" class="userpass" type="text">
            <p v-show="codeerr&&codeshow" class="err codeerr">验证码不正确！</p>
        </div>
        <div :class="{'openreg2':addclass}" class="module2">
            <div class="close" @click='close'>X</div>
            <p class="p2">更多信息</p>
            <p>姓名（2-10位）:</p>
            <input @blur='birthfn' v-model="birth" placeholder="请输入2-10位的字符串" class="userpass" type="text">
            <p v-show="birtherr&&birthshow" class="err birtherr">{{namemsg}}</p>
            <p class="check clear">
                <input @click='sexfn(0)' checked name="sex" id='man' type="radio"><label for="man">男士</label>
                <input @click='sexfn(1)' name="sex" id="woman" type="radio"><label for="woman">女士</label>
            </p>
            <p class="clear emailp">
                <input id="email" type="checkbox"><label for="email">愿意邮件接收信息</label>
            </p>
            <p class="clear intip">
                <input @click='readfn' id="inti" type="checkbox"><label for="inti">我已阅读并了解了<span class="inti">隐私保护条款</span></label>
            </p>
            <p v-show="readerr&&readshow" class="err readerr">请阅读隐私保护条款</p>
            <button @click='regfn' class="reg">立即注册</button>
            <button class="login" @click='login'>返回登录</button>
        </div>
    </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';
export default {
    // props:['showreg'],
    created() {
        // console.log(this.$store)
        // this.addclass2 = false
    },
    data() {
        return {
            addclass2:false,
            sendmsg:'验证码',
            addclass:false,
            email:'',
            userpass:'',
            surepass:'',
            phone:'',
            code:'',
            birth:'',
            sex:'男',
            namemsg:'姓名不能为空！',
            phonemsg:'请输入11位的手机号码！',
            emailmsg:'邮箱格式不正确！',
            emailerr:true,
            userpasserr:true,
            surepasserr:true,
            phoneerr:true,
            codeerr:true,
            birtherr:true,
            readerr:true,
            allflag:false,
            emailshow:false,
            userpassshow:false,
            surepassshow:false,
            phoneshow:false,
            codeshow:false,
            birthshow:false,
            readshow:false
        }
    },
    watch: {
        "$store.state.home.showReg"(newVal) {
            var _this = this
            // console.log(newVal,'132132465465416123132')
            if(newVal == false) {
                _this.addclass = false
            }
            if(newVal == true) {
                setTimeout(() => {
                    _this.addclass = true
                }, 10);
            }
        }
    },
    methods: {
        // 测试支付
        cd() {
            
            // this.addclass2 = true
            // this.$modal({
            //     // type:'提示',
            //     msg:'注册成功',
            //     type:'successful'
            // })
            // this.addclass = false
            // this.emailshow = false
            // this.userpassshow = false
            // this.surepassshow = false
            // this.phoneshow = false
            // this.codeshow = false
            // this.birthshow = false
            // this.readshow = false
            // setTimeout(() => {
            //     this.$store.state.home.showLogin = true
            //     this.$store.state.home.showReg = false
            //     this.addclass2 = false
            // }, 500);
        },
        close() {
            this.$store.state.home.showReg = false
            this.$store.state.home.showLogin = false
            this.emailshow = false
            this.userpassshow = false
            this.surepassshow = false
            this.phoneshow = false
            this.codeshow = false
            this.birthshow = false
            this.readshow = false
        },
        login() {
            this.addclass = false
            this.emailshow = false
            this.userpassshow = false
            this.surepassshow = false
            this.phoneshow = false
            this.codeshow = false
            this.birthshow = false
            this.readshow = false
            setTimeout(() => {
                this.$store.state.home.showLogin = true
                this.$store.state.home.showReg = false
            }, 500);
        },
        sexfn(i) {
            if(i == 0) {
                this.sex = '男'
            }else {
                this.sex = '女'
            }
        },
        // 邮箱
        emailfn() {
            var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            this.emailshow = true
            if(reg.test(this.email)) {
                this.emailerr = false
            }else {
                this.emailerr = true
            }
            console.log(this.email,this.emailerr)
        },
        // 密码
        userpassfn() {
            this.userpassshow = true
            if(this.userpass.length < 6) {
                this.userpasserr = true
            }else {
                this.userpasserr = false
            }
            this.surepassfn()
        },
        // 确认密码
        surepassfn() {
            this.surepassshow = true
            if(this.userpass != this.surepass) {
                this.surepasserr = true
            }else {
                this.surepasserr = false
            }
        },
        // 手机
        phonefn() {
            this.phoneshow = true
            var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
            if(reg.test(this.phone)) {
                this.phoneerr = false
            }else {
                this.phoneerr = true
            }
        },
        // 发送验证码
        send() {
            var _this = this
            if((this.sendmsg == '验证码' || this.sendmsg == '重新发送') && this.phoneerr == false) {
                
                this.$http.get('/reg/userregcheck?userPhone=' + this.phone)
                .then(res => {
                    if(res.data.code == -1) {
                        _this.phoneerr = true
                        _this.phonemsg = '该手机号已被注册'
                    }else {
                        this.sendmsg = 60
                        this.sendtime = setInterval(() => {
                            this.sendmsg--
                            if(this.sendmsg == 0) {
                                this.sendmsg = '重新发送'
                                clearInterval(this.sendtime)
                            }
                        },1000)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                
            }else {
                return false
            }
        },
        // 验证码
        codefn() {
            // this.codeshow = true
            // if(reg.test(this.phone)) {
                // this.phoneerr = false
            // }else {
                this.codeerr = false
            // }
        },
        // 生日
        birthfn() {
            this.birthshow = true
            if(this.birth.trim() == '') {
                this.namemsg = '姓名不能为空！'
                this.birtherr = true
            }
            if(this.birth.trim() != '') {
                if(this.birth.length > 10 || this.birth.length < 2) {
                    this.namemsg = '姓名长度为2-10位！'
                    this.birtherr = true
                }else {
                    this.birtherr = false
                }
            }
        },
        // 阅读
        readfn() {
            this.readerr = !this.readerr
        },
        // 注册
        regfn() {
            var _this = this
            _this.codeerr = false
            _this.codeshow = false
            this.readshow = true
            if(this.emailerr == false && this.userpasserr ==false && this.surepasserr ==false && this.phoneerr ==false && this.codeerr ==false && this.birtherr ==false && this.readerr ==false) {
                this.allflag = true
            }else {
                this.allflag = false
                this.emailshow = true
                this.userpassshow = true
                this.surepassshow = true
                this.phoneshow = true
                this.codeshow = true
                this.birthshow = true
                this.readshow = true
            }
            if(this.allflag) {
                console.log(_this.code.trim())
                if(_this.code.trim() == '') {
                    _this.codeerr = true
                    _this.codeshow= true
                }
                console.log(Number(_this.code))
                if(!Number(_this.code)) {
                    _this.codeerr = true
                    _this.codeshow= true
                }
                else {
                    let postData = this.$qs.stringify({
                        userName:this.birth,
                        userPwd:this.userpass,
                        userSex:this.sex,
                        userPhone:this.phone,
                        userEmail:this.email,
                        userValiCode:this.code
                    })
                    this.$http.post('/reg/userreg',postData) 
                    .then(res => {
                        // console.log(res)
                        if(res.data.code == -2) { //验证码错误
                            _this.codeerr = true
                            _this.codeshow = true
                        } if(res.data.code == -1) { //邮箱已被注册
                            _this.emailerr = true
                            _this.emailmsg = '该邮箱已被注册！'
                            _this.emailshow = true
                        } if(res.data.code == 1) {
                             // 添加模态框           
                                
                            _this.addclass2 = true
                            _this.$modal({
                                // type:'提示',
                                msg:'注册成功',
                                type:'successful'
                            })
                            _this.addclass = false
                            _this.emailshow = false
                            _this.userpassshow = false
                            _this.surepassshow = false
                            _this.phoneshow = false
                            _this.codeshow = false
                            _this.birthshow = false
                            _this.readshow = false
                            setTimeout(() => {
                                _this.$store.state.home.showLogin = true
                                _this.$store.state.home.showReg = false
                                _this.addclass2 = false
                            }, 500);
                        } 
                    })
                    .catch(err => {
                        console.log(err,'错误') 
                    })
                }
            } if(this.allflag == false) {
                console.log('注册失败')
            }
        },
    }
}
</script>

<style scoped>
    .modulebg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255,0.5);
        z-index: 999;
    }
    .regsucc {
        z-index: 0;
    }
    .module,
    .module2 {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 384px;
        background-color: #fff;
        border: 1px solid #8a7419;
        box-shadow: 3px 3px 5px #cab666;
        height: 520px;
        transition: all .5s;
        backface-visibility: hidden;
    }
    .module {
        border-right: none;
    }
    .module2 {
        border-left: none;
        font-size: 14px;
    }
    .module2 .p2 {
        margin-top: 80px;
        text-align: center;
    }
    .module2 p {
        width: 250px;
        text-align: left;
        margin: 30px auto 0;
    }
    .module2 .check {
        margin-top: 0;
        line-height: 18px;
        overflow: hidden;
        height: 18px;
    }
    .module2 .check input {
        line-height: 18px;
        width: 12px;
        height: 12px;
        margin-top: 4px;
        margin-left: 20px;
        float: left;
        margin-right: 3px;
    }
    label {
        line-height: 18px;
        float: left;
    }
    .p1 {
        color: #000;
        font-size: 16px;
        margin: 30px 0 30px;
    }
    .p2 {
        font-size: 12px;
        color: #6c6c6c;
        margin-bottom: 20px;
        font-size: 14px;
    }
    .username,
    .userpass {
        width: 250px;
        height: 47px;
        box-sizing: border-box;
        padding: 0 12px;
        margin: 15px 0;
        outline: none;
        border: 1px solid #a0a0a0;
        font-size: 16px;
    }
    .reg {
        height: 47px;
        width: 250px;
        outline: none;
        margin: 30px auto;
        margin-bottom: 20px;
        background: #000;
        color: #fff;
        border: none;
        font-size: 16px;
        text-align: center;
        letter-spacing: 5px;
        padding-left: 10px;
        cursor: pointer;
    }
    .login {
        cursor: pointer;
        height: 47px;
        width: 250px;
        outline: none;
        margin-bottom: 0;
        border: none;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 5px;
        padding-left: 10px;
        background-color: #fff;
        border: 1px solid #000;
    }
    .close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 24px;
        color: #aaa;
        cursor: pointer;
    }
    .inti {
        color: #8a7419;
        cursor: pointer;
    }
    .inti:hover {
        text-decoration: underline;
    }
    .emailp,
    .intip {
        height: 18px;
        overflow: hidden;
    }
    .emailp input,
    .intip input {
        float: left;
        margin-left: 20px;
        height: 12px;
        width: 12px;
        margin-top: 3px;
        margin-right: 3px;
    }
    .emailp label,
    .intip label {
        line-height: 18px;
    }
    .regdiv {
        width: 385px;
        position: relative;
    }
    .err {
        height: 0;
        transform: translateY(-9px);
        color: red;
    }
    .module2 .birtherr {
        transform: translateX(-122px) translateY(-50px);
        text-align: center;
        margin: 0;
    }
    .module2 .readerr {
        text-align: center;
        transform: translateY(3px) translateX(70px);
        margin: 0;
    }
    .module .phone {
        width: 180px;
        transform: translateX(-35px);
    }
    .canvas {
        width: 70px;
        height: 47px;
        position: absolute;
        right: 70px;
        cursor: pointer;
        border: 1px solid #a0a0a0;
        box-sizing: border-box;
        background-color: #ddd;
        margin: 0;
        margin-top: 15px;
    }
    .openreg {
        /* background-color: red; */
        transform: translateX(-192px);
    }
    .openreg2 {
        /* background-color: red; */
        transform: translateX(192px);
    }
    .reg:hover {
        color: #fff;
    }
    .login:hover {
        color: #000;
    }
</style>
