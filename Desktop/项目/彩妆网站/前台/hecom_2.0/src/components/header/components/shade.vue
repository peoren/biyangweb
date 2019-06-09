<template>
    <div class="shade clear" :class='{shows:show}' @mouseenter="shows" @mouseleave="none">
        <div class="left clear">
            <ul class="clear">
                <transition-group name="list-complete" tag="p">
                    <li class="list-complete-item" v-for="(m,index) in msgs" :key='index' :class='{cut:msgs.length>8}'>
                        <router-link @mouseenter.native="enter(m)" :to='"/classify/" + m.id'>{{m.name}}</router-link>
                    </li>
                </transition-group>  
            </ul>
        </div>
        <div class="right">
            <img :src='url' alt="您手速也太快了吧"> 
            <p class='img_p'>{{p}}</p>
        </div>
    </div>
</template>


<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js"></script>
<script>
export default {
    props: ['show','msg'],
    data() {
        return {
            url:'',
            p:'',
            msgs:'',
        }
    },
    methods: {
        shows() {
            this.$emit('enter')
        },
        none() {
            this.$emit('leave')
        },
        enter(m) {
            this.msgs = this.msg
            this.url = m.url
            this.p = m.name
        },
    },
    watch:{
        show(newVal) {
            if(newVal == true) {
                if(this.msg != '') {
                    this.msgs = this.msg
                    this.url = this.msgs[0].url
                    this.p = this.msgs[0].name
                }
            } else {
                
            }
        }
    }
}
</script>


<style scoped>
    .shade {
        width: 100%;
        transition: all .5s;
        height: 0;
        opacity: 0;
        border-bottom: 1px solid #ac9b81;
        background-color: #fff;
        overflow: hidden;
        position: relative;
    }
    .shows {
        height: 350px;
        opacity: 1;
    }
    .left {
        float: left;
        width: 50%;
        height: 300px;
        margin-top: 25px;
        border-right: 1px solid #ac9b81;
        padding-right: 50px;
        margin-right: 50px;
        box-sizing: border-box;
    }
    ul {
        width: 200px;
        float: right;
    }
    li {
        text-align: right;
        margin-bottom: 20px;
        margin-left: 20px;  
        display: inline-block;
        width: 100%;
    }
    a {
        color: #464646;
        font-size: 14px;
        padding-bottom: 5px;
    }
    a:hover {
        border-bottom: 1px solid #464646;
    }
    .cut {
        width: 40%;
        float: left;
    }
    .right {
        margin-top: 25px;
        float: left;
        width: 350px;
        height: auto;
    }
    .img_p {
        font-size: 14px;
        margin-top: 10px;
    }
    img {
        width: 350px;
        height: auto;
    }
    /* 动画 */
    .list-complete-item {
        transition: transform 1s;
    }
    .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>

