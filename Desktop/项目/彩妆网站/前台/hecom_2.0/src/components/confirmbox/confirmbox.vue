<template>
    <div class="confirm" v-if="isShow">
        <div class="con_box" >
            <div class="context">
                <!-- <h6>{{text.type}}</h6> -->
                <p>{{text.msg}}</p>
                <div class="btn">
                    <span @click="ok()" v-if="text.btn.ok">{{text.btn.ok}}</span>
                    <span @click="close()" v-if="text.btn.no">{{text.btn.no}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isShow:true,
            text:{
                // type:'提示',              
                msg:'确定删除此条信息？',
                btn:{
                    ok:'确定',
                    no:'取消'
                }, 
            }
        }
    },
    methods:{
        close(){
            console.log('关闭');
        },
        ok(){
            console.log('确定')
        }
    }
}
</script>
<style scoped>
.confirm{
    background-color:rgba(0, 0, 0, 0.6);width: 100%;height: 100%; position: fixed;top: 0;
    }
.con_box{
    width: 350px;height: 250px;
    background-color: white;
    position: absolute;
    top: 0;bottom: 0;left: 0;right: 0;
    margin: auto;
    /* border-radius: 5px; */
    }
.context{
    /* padding: 10px; */
    /* width: 350px;
    height: 250px; */
    }

.context p{
    font-size: 20px;
    /* padding: 15px; */
    margin-top: 55px;
    text-align: center;

}
.btn{
    margin-top: 30px;
    text-align: right;
    }
.btn span{
    box-sizing: border-box;
    display: block;
    width: 151px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
}
.btn span:nth-child(1){
    background: #000;
    color: #fff;
    margin-bottom: 10px;
    }
.btn span:nth-child(2){
    background: #fff;
    color: #000;
    border: 1px solid #000;
    }
</style>
