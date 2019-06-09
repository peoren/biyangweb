<template>
    <ul class="clear">
        <li v-show='!user'><router-link @click.native='showlogin' class="login" to=''>登录</router-link></li>
        <li v-show='user'><span class="hello">您好，</span><router-link to='/person_center' class="name">{{username}}</router-link></li>
        <li v-show='!user'><router-link @click.native='showreg' class="reg" to=''>注册</router-link></li>
        <li v-show='user'><router-link @click.native='exit' class="reg" to=''>退出</router-link></li>
        <li><router-link class="wish" :to="'/person_center/wishlist'">心愿单</router-link></li>
        <li><router-link class="search" to='' @click.native='search'>搜索</router-link></li>
        <li><router-link class="bag" to="/shopping_cart">购物袋</router-link></li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            user: sessionStorage.getItem('user_id'),
            username: sessionStorage.getItem('user_name'),
        }
    },
    methods: {
        search() {
            this.$emit('search')
        },
        showlogin() {
            this.$store.state.home.showLogin = true
            this.$store.state.home.showReg = false
        },
        showreg() {
            this.$store.state.home.showLogin = false
            this.$store.state.home.showReg = true
        },
        exit() {
            sessionStorage.removeItem('user_id')
            location.reload()
        },
    }
}
</script>


<style scoped>
    ul {
        float: right;
        margin-top: 30px;
    }
    li {
        float: left;
        font-size: 12px;
        color: #464646;
    }
    a {
        font-size: 12px;
        color: #464646;
        padding: 0 12px;
        border-right: 1px solid #464646;
        line-height: 14px;
    }
    .search {
        display: inline-block;
    }
    .search::after,
    .bag::after {
        content: '';
        display: table;
        width: 14px;
        height: 14px;
        float: right;
        background: url('../../../assets/home/search.png');
        background-size: cover;
        margin-left: 3px;
    }
    .bag::after {
        background: url('../../../assets/home/bag.png');
        background-size: cover;
    }
    .bag {
        border: none;
        display: inline-block;
        padding-right: 5px;
    }
    .hello {
        line-height: 14px;
    }
    .name {
        padding-left: 0;
        color: #8a7419;
    }
</style>
