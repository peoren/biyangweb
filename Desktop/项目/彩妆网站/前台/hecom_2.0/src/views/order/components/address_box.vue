<template>
<div class="addbox">
    <!-- <input type="radio" :value="ad.name" v-model="ad.select" @click="choseAd"> -->
    <div class="radioBox" @click="choseAd">
        <div class="radio" v-show="ad.select" >

        </div>
    </div>
    <div class="showbox" v-if='adflag'>
        
        
        <span>收货人:</span><span>{{ad.addressName}}</span>
        <br>
        <span>联系电话:</span><span>{{ad.addressPhone}}</span>
        <br>
        <span>收货地址:</span><span>{{ad.addressProvince}}{{ad.addressCity}}{{ad.addressCounty}}{{ad.addressDtaddress}}</span>
        <br>
        <span id="edit" @click="edit">编辑</span>
        
    </div>
    <div class="editbox" v-else>
        <span>地址：</span><div id="VDistpicker">
            <VDistpicker :placeholders='placeholders'
            :province='tempAddress.addressProvince' :city='tempAddress.addressCity' :area='tempAddress.addressCounty' 
            @province='onChangeProvince' @city='onChangeCity' @area='onChangeArea'
            />
         </div>
        <br>
        <span>详细地址：</span><input type="text" v-model="tempAddress.addressDtaddress">
        <br>
        <span>收货人:</span><input type="text" v-model="tempAddress.addressName">
        <br>
        <span>联系电话:</span><input type="text" v-model="tempAddress.addressPhone">

        <p @click="saveEdit(tempAddress)">确认修改</p>
    </div>
</div>
        
        
</template>
<script>
import VDistpicker from 'v-distpicker' 

export default {
    components:{
        VDistpicker
    },
    data:function(){
        return {
            placeholders:{
                    province: '------- 省 --------',
                    city: '--- 市 ---',
                    area: '--- 区 ---',
               },
            tempAddress:'',
            //控制是否显示编辑界面
            adflag:true,
        }
    },
    props:['ad','index'],
    created(){

        this.tempAddress=this.ad
        // console.log(this.ad);
        
    },
    methods:{
        saveEdit(tempAddress){
            // console.log(this.tempAddress.province);
             this.$emit('chAddress',tempAddress,this.index)
            this.adflag=true
                console.log(tempAddress)
            //返回数据
            // let postData=this.$qs.stringify({
            //     userToken:'670d64d2b83e4a2cab5a4bf67a7630b3',
            // })
            let postData = this.$qs.stringify({
                 ...tempAddress,
                // userToken:'670d64d2b83e4a2cab5a4bf67a7630b3'
                })
            this.$http.post('/shopping/findalladd',postData)
            .then(res => {
                console.log(res)
            })

            //   this.$http.post('/shopping/settlement',postData)
              

            //  .then(function(res){
            // // console.log(res)
            // // const result = res.data
            // // console.log(result)
            
            //   })
            //    .catch(err => {
            //         console.log(err,'错误') 
            //     })
            
              },
        //得到修改值并修改
        onChangeProvince(data){
            this.tempAddress.addressProvince=data.value;

        },
        onChangeCity(data){
            this.tempAddress.addressCity=data.value;
        },
        onChangeArea(data){
            this.tempAddress.addressCounty=data.value;
        },
        choseAd(){
            this.$emit('choseAd',this.index)
        },
        edit(){
            this.adflag=false
            this.choseAd()
        }
    }
}
</script>
<style scoped>
.radioBox{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid gray;
    background: #fff;
    float: left;
    margin-top: 5px;
}
.radio{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 2px;
    background: gray;
}
.addbox{
    padding: 20px 23px 0;
}
.showbox{
    text-align: left;
    margin-left: 30px;
}
.showbox span{
    padding: 15px 10px;
    /* margin: 15px 0; */
    display: inline-block;
}

.editbox{
    text-align: left;
    /* padding: 15px 10px; */
    /* padding-left: 10px; */
    margin-left: 30px;
    /* display: inline-block; */
}
.editbox span{
    padding: 15px 10px;
    display: inline-block;
    width: 60px;
}
.editbox input{
    height: 20px;
    padding: 8px;
    color: #464a4c;
    width: 200px;
    /* font-size: 1rem; */
}
.editbox p,
#edit{
    width: 55px;
    border-bottom: 1px solid #000;
    text-align: center;
    padding-bottom: 5px;
    cursor: pointer;
    margin-left: 80px;
    margin-top: 10px;
}
#edit{
    margin-left: 0;
    margin-top: 0;
    width: 25px;
    padding:10px 0 5px 0;
    margin-left: 10px; 
}
#VDistpicker{
    display: inline-block;
}
/* 修改插件v-distpicker样式 */


 
</style>
