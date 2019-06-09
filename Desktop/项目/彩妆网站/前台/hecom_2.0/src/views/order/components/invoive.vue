<template>
    <div class="invoive">
        <div class="way">
            发票信息
        </div>
        <div class="select">
            <ul>
                <!-- <li>
                    <input type="radio"  @click="fa" name="invoive" :value = "false" v-model="type">
                    <label for="invoive_false">不需要发票</label>
                </li>
                <li>
                    <input type="radio" @click="tr" name ="invoive" :value = "true" v-model="type">
                    <label for="invoive_true">需要发票</label>
                </li> -->
                <li>
                    <div class="radiobox" @click="fa">
                        <div class="radio" v-show="type"></div>
                    </div>
                    <div> 不需要发票</div>
                </li>
                <li>
                    <div class="radiobox" @click="tr">
                        <div class="radio" v-show="!type"></div>
                    </div>
                    <div> 需要发票</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'invoive',
    data(){
        return{
            type:true,
            paper:0
        }
    },
    methods:{
       fa(){
           this.type = true;
           this.paper = 0;
       },
       tr(){
           this.type = false;
           this.paper = 1;
       }
    },
     watch:{
        paper(){
            console.log('111');
            
            this.$store.commit('order_form/setpaper',this.paper)     
        }   
             
    }
}
</script>
<style scoped>
    .invoive{
        margin-top: 25px;
    }
    .way{
        text-align: left;
        color: #a0a0a0;
        font-size: 12px;
        padding: 15px 0 15px 23px;
        border-top:1px solid #a0a0a0;
        border-bottom:1px solid #a0a0a0;
    }
    .select{
        text-align: left;
        color: #464646;
        font-size: 12px;
        padding: 20px 0 0 23px;
    }
    .select li{
        padding: 10px 0;
    }
    .radiobox{
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 1px solid gray;
        background: #fff;
        float: left;
        margin-right: 5px;
    }
    .radio{
        width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 2px;
    background: gray;
    }
</style>

