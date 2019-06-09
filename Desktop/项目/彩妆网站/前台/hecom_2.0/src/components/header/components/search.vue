<template>
    <div :class="{issearch:issearch}" class="searchbg">
        <div class="search clear">
            搜索<input @keydown.enter="suresearch" type="text" v-model="val">
            <img @click='suresearch' class="sear" :class='{s3:issearch}' src="../../../assets/home/search.png" alt="">
            <p :class='{p1:issearch}' @click='close'>
                <span class="s1" :class='{s11:issearch}'></span>
                <span class="s2" :class='{s22:issearch}'></span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['issearch'],
    data() {
        return {
            val:''
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        suresearch() {
            if(this.val != '') {
                this.$router.push('/select/' + this.val)
                this.val = ''
                this.$emit('close') 
            } else {
                return
            }
        },
    }
}
</script>


<style scoped>
    .searchbg {
        width: 100%;
        background-color: #fff;
        padding-left: 10px;
        padding-right: 10px;
        color: #000;
        transform: translateY(-1px);
        height: 0;
        overflow: hidden;
        transition: all .5s;
    }
    .search {
        width: 375px;
        padding-top: 20px;
        padding-bottom: 5px;
        font-size: 14px;
        border-bottom: 1px solid #a0a0a0;
        margin: 0 auto;
    }
    input {
        border: none;
        height: 20px;
        outline: none;
        width: 265px;
        margin: 0 5px;
        padding: 0 10px;
        box-sizing: border-box;
        font-size: 15px;
    }
    .sear {
        width: 18px;
        height: 18px;
        cursor: pointer;
        transform: translateX(-10px);
        transition: all .5s .2s;
        opacity: 0;
    }
    .s3 {
        opacity: 1;
        transform: translateX(0);
    }
    p {
        width: 17px;
        height: 17px;
        position: relative;
        float: right;
        cursor: pointer;
        transform: translateX(-10px);
        margin-right: 10px;
        transition: all .5s .2s; 
    }
    .p1 {
        transform: rotateZ(45deg) translateY(3px);
    }
    .s1 {
        display: inline-block;
        width: 0;
        height: 1px;
        background-color: #464646;
        position: absolute;
        left: 0;
        top: 0;
        transition: all .5s  .2s;
    }
    .s2 {
        display: inline-block;
        width: 0;
        height: 1px;
        background-color: #464646;
        position: absolute;
        left: 0;
        bottom: 0;
        transition: all .5s  .2s;
    }
    .s11 {
        width: 17px;
        transform: translateY(8px);
    }
    .s22 {
        transform: translateY(-8px) rotateZ(90deg);
        width: 17px;
    }
    .issearch {
        height: 46px;
        padding-bottom: 10px;
    }
</style>
