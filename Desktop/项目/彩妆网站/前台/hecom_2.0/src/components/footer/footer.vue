<template>
    <div class="bottom_bg">
        <div class="bottom clear">
            <div class="b_img">
                <img :src="url" alt="">
            </div>
            <ul>
                <li class="li_head">关于我们</li>
                <li><a href="">品牌故事</a></li>
            </ul>
            <ul>
                <li class="li_head">提供帮助</li>
                <li><a href="">联系我们</a></li>
                <li><a href="" class="phone">400-082-08820</a></li>
            </ul>
            <ul>
                <li class="li_head">客户服务</li>
                <li><a href="">退换货服务</a></li>
                <li><a href="">会员中心</a></li>
                <li><a href="">查看我的订单</a></li>
                <li><a href="">常见问题</a></li>
                <li><a href="">配送信息</a></li>
            </ul>
            <ul>
                <li class="li_head">就近门店</li>
                <li><a href="">查看就近门店</a></li>
            </ul>
            <ul class="last">
                <li class="li_head">关注我们</li>
                <li><a href="">微博</a></li>
                <li><a href="" class="vx">微信</a></li>
                <li class="vx"><img :src="url2" alt=""></li>
            </ul>
            <div class="bott2">
                <p class="p1">© 2019 XXX保留所有权利</p>
                <p class="p2">
                    <a href="">使用条款</a>
                    <a href="">隐私政策</a>
                    <a href="">企业营业执照</a>
                    <a href="" class="b1">上海工商 沪ICP备10203872号－3</a>
                    <a href="" class="b2">沪公网安备 31011502007430号</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url:require('@/assets/home/bottom.png'),
            url2:require('@/assets/home/vx.png')
        }
    },
}
</script>


<style scoped>
    .bottom_bg {
        margin-top: 30px;
        padding-top: 44px;
        background: #0f0d1e;
    }
    .bottom {
        width: 960px;
        margin: 0 auto;
    }
    .b_img img {
        width: 180px;
        height: auto;
        margin-bottom: 50px;
    }
    ul {
        float: left;
        width: 220px;
        text-align: center;
        text-align: left;
    }
    .last {
        width: 80px;
    }
    li a {
        color: #464646;
        font-size: 14px;
        line-height: 30px;
    }
    .li_head {
        font-size: 14px;
        color: #fff;
        margin-bottom: 20px;
    }
    .phone,.vx {
        color: #a0a0a0;
    }
    .vx {
        margin-top: 5px;
    }
    .vx img {
        width: 100px;
        height: auto;
    }
    .bott2 {
        margin-top: 80px;
        float: left;
        border-top: 1px solid #6c6c6c;
        width: 960px;
    }
    .bott2 .p1 {
        text-align: left;
        color: #a0a0a0;
        font-size: 14px;
        margin: 20px 0;
    }
    .bott2 .p2 {
        margin: 20px auto;
    }
    .bott2 p a {
        color: #464646;
        display: inline-block;
        padding-right: 15px;
        margin-right: 15px;
        border-right: 2px solid #6c6c6c;
        line-height: 14px;
        font-size: 14px;
    }
    .bott2 p a:last-child {
        border: none;
    }
    .bott2 p .b1::before,
    .bott2 p .b2::before {
        content: '';
        height: 14px;
        width: 14px;
        background: url('../../assets/home/gongshang.png');
        margin-right: 10px;
        background-size: cover;
        line-height: 14px;
        float: left;
    }
    .bott2 p .b2::before {
        background: url('../../assets/home/police_badge.png');
        background-size: cover;
    }
    a:hover {
        color: #968a21;
    }
    .bott2 p a:hover {
        color: #968a21;
    }
</style>
