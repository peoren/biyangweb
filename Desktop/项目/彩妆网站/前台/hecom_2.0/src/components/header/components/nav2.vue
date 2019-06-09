<template>
    <ul class="nav2 clear">
        <li @mouseenter='enter(menu1)' @mouseleave="leave"><router-link :class='{active:index==1}' @click.native='activefn(1)' to="/classify/1">唇部彩妆</router-link><span></span></li>
        <li @mouseenter='enter(menu2)' @mouseleave="leave"><router-link :class='{active:index==2}' @click.native='activefn(2)' to="/classify/2">光耀底妆</router-link><span></span></li>
        <li @mouseenter='enter(menu3)' @mouseleave="leave"><router-link :class='{active:index==3}' @click.native='activefn(3)' to="/classify/3">面部彩妆</router-link><span></span></li>
        <li @mouseenter='enter(menu4)' @mouseleave="leave"><router-link :class='{active:index==4}' @click.native='activefn(4)' to="/classify/4">眼部彩妆</router-link><span></span></li>
        <li @mouseenter='enter(menu5)' @mouseleave="leave"><router-link :class='{active:index==5}' @click.native='activefn(5)' to="/classify/5">产品功效</router-link><span></span></li>
        <li @mouseenter='enter(menu6)' @mouseleave="leave"><router-link :class='{active:index==6}' @click.native='activefn(6)' to="/classify/6">护理类型</router-link><span></span></li>
        <li><router-link :class='{active:index==7}' @click.native='activefn(7)' to="/classify/7">化妆工具</router-link><span></span></li>
        <li @click="search" :class='{men_op:rises}' class="search"></li>
        <li @click='towish' :class='{men_op:rises}' class="coll"></li>
        <li @click='tobag' :class='{men_op:rises}' class="bag"></li>
    </ul>
</template>


<script>


export default {
    props:['rises'],
    data() {
        return {
            user: sessionStorage.getItem('user_id'),
            index:'',
            menu1: [],
            menu2: [],
            menu3: [],
            menu4: [],
            menu5: [],
            menu6: []
        }
    },
    created() {
        var _this = this
        this.$http.get('/product/productgetsecond')
        .then(res => {
            // console.log(res.data)
            for(let i = 0; i < res.data.data.length; i++) {
                if(res.data.data[i].firstlevelId == 1) {
                    _this.menu1.push({
                        id:res.data.data[i].firstlevelId + '-' + res.data.data[i].secondlevelId,
                        name:res.data.data[i].secondlevelName,
                        url:res.data.data[i].secondlevelPic,
                    })
                }
                if(res.data.data[i].firstlevelId == 2) {
                    _this.menu2.push({
                        id:res.data.data[i].firstlevelId + '-' + res.data.data[i].secondlevelId,
                        name:res.data.data[i].secondlevelName,
                        url:res.data.data[i].secondlevelPic,
                    })
                }
                if(res.data.data[i].firstlevelId == 3) {
                    _this.menu3.push({
                        id:res.data.data[i].firstlevelId + '-' + res.data.data[i].secondlevelId,
                        name:res.data.data[i].secondlevelName,
                        url:res.data.data[i].secondlevelPic,
                    })
                }
                if(res.data.data[i].firstlevelId == 4) {
                    _this.menu4.push({
                        id:res.data.data[i].firstlevelId + '-' + res.data.data[i].secondlevelId,
                        name:res.data.data[i].secondlevelName,
                        url:res.data.data[i].secondlevelPic,
                    })
                }
                if(res.data.data[i].firstlevelId == 5) {
                    _this.menu5.push({
                        id:res.data.data[i].firstlevelId + '-' + res.data.data[i].secondlevelId,
                        name:res.data.data[i].secondlevelName,
                        url:res.data.data[i].secondlevelPic,
                    })
                }
                if(res.data.data[i].firstlevelId == 6) {
                    _this.menu6.push({
                        id:res.data.data[i].firstlevelId + '-' + res.data.data[i].secondlevelId,
                        name:res.data.data[i].secondlevelName,
                        url:res.data.data[i].secondlevelPic,
                    })
                }
            }
        })
        .catch(err => {
            console.log(err,'err')
        })
    },
    methods: {
        activefn(i) {
            this.index = i
        },
        enter(n) {
            this.$emit('enter',n)
        },
        leave() {
            this.$emit('leave')
        },
        search() {
            this.$emit('search')
        },
        tobag() {
            this.$router.push("/shopping_cart")
        },
        towish() {
            this.$router.push('/person_center/wishlist')
        }
    }
}
</script>


<style scoped>
    .nav2 {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        left: 150px;
        line-height: 40px;
    }
    li {
        float: left;
        margin: 0 25px;
        position: relative;
    }
    li a {
        font-size: 14px;
        display: inline-block;
        padding-bottom: 3px;
        color: #464646;
        box-sizing: border-box;
        padding-bottom: 5px;
    }
    li:first-child {
        margin-left: 50px;
    }
    .active {
        color: #000;
    }
    li a:hover {
        color: #000;
    }
    li a:hover+span,
    span:hover {
        display: inline-block;
        width: 56px;
        height: 1px;
        background-color: #464646;
        position: absolute;
        bottom: 10px;
        left: 0;
        cursor: pointer;
    }
    .search,
    .coll,
    .bag {
        width: 20px;
        height: 20px;
        background: url('../../../assets/home/search.png');
        background-size: cover;
        margin-top: 10px;
        margin-left: 0;
        margin-right: 24px;
        cursor: pointer;
        opacity: 0;
        transition: all .5s;
    }
    .search {
        margin-left: 10px;
    }
    .coll {
        background: url('../../../assets/home/coll.png');
        background-size: cover;
    }
    .bag {
        background: url('../../../assets/home/bag.png');
        background-size: cover;
        margin-right: 0;
    }
    .men_op {
        opacity: 1;
    }
    @media(max-width:1350px) {
        li {
            margin: 0 20px;
        }
    }
</style>

