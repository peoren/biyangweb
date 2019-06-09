<template>
    <div class="modulebg">
        <div class="module" @mousemove="cd">
            <div class="close" @click='close'>X</div>
            <p class="p1" @click='cdd'>登录</p>
            <p class="p2">立即登录开启光耀之旅</p>
            <p v-show='err2' class='err2'>账号或密码不正确！</p>
            <input @keydown.enter="axlogin" autofocus v-model="username" placeholder="邮箱地址/手机号" class="username" type="text">
            <input @keydown.enter="axlogin" v-model="userpass" placeholder="请输入密码" class="userpass" type="password">
            <p class="forget" @click='showforget'>忘记密码？</p>
            <label class="form-inline">
				<div class="form-inline-input">
					<div class="code-box" id="code-box">
						<input type="text" name="code" class="code-input" />
						<p ref="succ"></p>
						<span>>>></span>
					</div>
				</div>
			</label>
            <p v-show="err1" class="err1">请拖动滑动验证码！</p>
            <button class="login" @click='axlogin'>登录</button>
            <button class="reg" @click='showreg'>注册</button>
        </div>
    </div>
</template>

<script>
import canvas1 from './canvas/canvas.css'
import canvas2 from './canvas/canvas.js'
import md5 from 'md5'
export default {
    data() {
        return {
            canvas:'',
            username:'',
            userpass:'',
            err1:false,
            err2:false
        }
    },
    methods: {
        cdd() {
            console.log(this.$store.state.home.showLogin)
        },
        // 获取验证成功
        cd() {
            if(this.$refs.succ.innerText) {
                this.canvas = true
                this.err1 = false
            } else {
                this.canvas = false
            }
        },
        // 关闭
        close() {
            this.$store.state.home.showReg = false
            this.$store.state.home.showLogin = false
            this.err1 = false
            this.err2 = false
        },
        // 登录请求
        axlogin() {
            if(this.canvas) {
                var _this = this
                let postData = this.$qs.stringify({
                    userAccess:_this.username,
                    userPwd:_this.userpass
                })
                this.$http.post('/login/userlogin',postData) 
                .then(res => {
                    // console.log(res.data.data.userToken)
                    if(res.data.code == 1) {
                        console.log('登录成功')
                        sessionStorage.setItem('user_id',res.data.data.userToken)
                        location.reload()
                        sessionStorage.setItem('user_name',res.data.data.userName)
                    }else {
                        _this.userpass = ''
                        _this.err2 = true
                    }
                })
                .catch(err => {
                    console.log(err,'错误') 
                })
            }else {
                this.err1 = true
            }
            
        },
        // 打开注册界面
        showreg() {
            this.$store.state.home.showReg = true
            this.$store.state.home.showLogin = false
            this.err1 = false
            this.err2 = false
        },
        // 忘记密码
        showforget() {
            this.$router.push('/forgotpassword')
            this.close()
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
    .module {
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
    }
    .p1 {
        color: #000;
        font-size: 16px;
        margin: 30px 0 30px;
    }
    .p2 {
        font-size: 12px;
        color: #6c6c6c;
        margin-bottom: 30px;
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
    .canvas {
        width: 150px;
        height: 47px;
        box-sizing: border-box;
        padding: 0 12px;
        margin: 15px 0;
        float: left;
        margin-left: 67px;
        outline: none;
        border: 1px solid #a0a0a0;
    }
    .form-inline-input {
        padding-left: 0;
    }
    .form-inline {
        /* margin: 0 auto; */
        margin-top: 20px;
        margin-left: 67px;
    }
    .code-box {
        width: 230px;
    }
    #code-box span {
        background: #888;
    }
    .login {
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
        letter-spacing: 20px;
        padding-left: 20px;
        cursor: pointer;
    }
    .reg {
        cursor: pointer;
        height: 47px;
        width: 250px;
        outline: none;
        margin-bottom: 0;
        border: none;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 20px;
        padding-left: 20px;
        background-color: #fff;
        border: 1px solid #000;
    }
    .login:hover {
        color: #fff;
    }
    .reg:hover {
        color: #000;
    }
    .close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 24px;
        color: #aaa;
        cursor: pointer;
    }
    .forget {
        text-decoration: underline;
        position: absolute;
        right: 70px;
        top: 275px;
        cursor: pointer;
        font-size: 12px;
    }
    .err1 {
        position: absolute;
        left: 130px;
        color: red;
    }
    .err2 {
        position: absolute;
        left: 70px;
        top: 273px;
        color: red;
    }
</style>
