<template>
   <div class="address clear">
       <div class="way">收货信息</div>
       <addressbox v-for="(ad,index) in address" :key='index' :ad='ad' :index='index'
        @chAddress='chAddress'
        @choseAd='choseAd'
        v-show="addConflag"
         ></addressbox>
         <div id="adComfirmBox" v-show="!addConflag">      
            <span>收货人:</span><p>{{addConfirmItem.addressName}}</p>
            <br>
            <span>联系电话:</span><p>{{addConfirmItem.addressPhone}}</p>
            <br>
            <span>收货地址:</span><p>{{addConfirmItem.addressProvince}}{{addConfirmItem.addressCity}}{{addConfirmItem.addressCounty}}{{addConfirmItem.addressDtaddress}}</p>
            <br>
            <span id="edit" @click="adflag=false,addConflag=true">编辑</span>
         </div>
         <span id="addAddTitle" v-show="addConflag" @click="addAddflag=!addAddflag">+添加新地址</span>

         <div class="addAddressBox" v-show="addAddflag">
                <span>地址：</span><div id="VDistpicker">
                <VDistpicker :placeholders='placeholders'
                @province='onChangeProvince' @city='onChangeCity' @area='onChangeArea'
                />
            </div>
            <br>
            <span>详细地址：</span><input type="text" v-model="newAddress.addressDtaddress"></input>
            <br>
            <span>收货人</span><input type="text" v-model="newAddress.addressName"></input>
            <br>
            <span>联系电话</span><input type="text" v-model="newAddress.addressPhone"></input>
            <br>
            <span @click="addAddress" addressId="saveBtn">保存地址</span><p v-show="warning" id="warning">内容不能为空</p>
         </div>
        <p id="adComfirm" @click="adComfirm"  v-show="addConflag">确认收货信息</p>
   </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import addressbox from '@/views/order/components/address_box.vue'
export default {
    name: 'site',
    props:['address','addressDefault'],
    components:{
           VDistpicker,
           addressbox
    },
    data:function(){
        return{
               placeholders:{
                    province: '------- 省 --------',
                    city: '--- 市 ---',
                    area: '--- 区 ---',
               },
            //    showAddressFlag:true,
               //默认地址
            //    addressDefault:'',
               //确认地址
               addConfirmItem:'',
               //选中区域flag
               addConflag:false,
               //添加界面flag
               addAddflag:false,
               //newAddress用于暂时存储新地址
               newAddress:{
                addressId:0,//新加默认为0
                addressName:'',
                addressPhone:'',
                addressProvince:'',
                addressCity:'',
                addressCounty:'',
                addressDtaddress:'',
                select:true,
               },
               warning:false
          }
    },
    methods:{
        //地址组件传过来的值
       chAddress(tempAddress,index){
           this.address[index]=tempAddress
            for(let i in this.address){
                this.$set(this.address[i],'select',false)
            }
           this.address[index].select=true
           console.log(this.address[index]);
           
        //    console.log(this.address[index]);
           
       },
       //确认单选框
       choseAd(index){
           for(let i in this.address){
               this.address[i].select=false;
           }
           this.address[index].select=true
       },
        //为地址添加select
        addSelect(){
                // console.log(this.address);
                
            for(let i in this.address){
                if(this.address[i].addressId==this.addressDefault.addressId){
                    this.$set(this.address[i],'select',true)
                }else{
                    this.$set(this.address[i],'select',false)
                }
                
            }
            
            
        },
        //adComfirm确认收货地址
        adComfirm(){
            this.addConflag=false
             for(let i in this.address){
                if(this.address[i].select){
                    this.addConfirmItem=this.address[i]
                }
            }
            this.$store.commit('order_form/setconfirmAddress',this.addConfirmItem)
           
            
        },
        //添加地址
        addAddress(){
       
        
        const {addressName,addressPhone,addressProvince,addressCity,addressCounty,addressDtaddress}= this.newAddress
         
        if(!addressName || !addressPhone ||!addressDtaddress){
            console.log(addressProvince+'000');
            this.warning=true
            return false
        }else{
            this.warning=false
        }
        if(addressProvince.indexOf('---')!==-1 || addressCity.indexOf('---')!==-1 || addressCounty.indexOf('---')!==-1){
             this.warning=true
             console.log(addressProvince+'123');
             
            return false
            
        }else{
            this.warning=false
        }
            // console.log(addressProvince);
            //清除选中
            for(let i in this.address){  
                     this.$set(this.address[i],'select',false)
            }
            // let length=0
            // console.log(this.address);
            //深拷贝添加
            this.address[this.address.length]=JSON.parse(JSON.stringify(this.newAddress))
            
            
            // this.address[this.address.length]=this.newAddress
            this.addConfirmItem=JSON.parse(JSON.stringify(this.newAddress))
            console.log(this.addAddress);
            
            // 清空数据
            this.newAddress.addressName=''
            this.newAddress.addressPhone=''
            this.newAddress.addressProvince=''
            this.newAddress.addressCity=''
            this.newAddress.addressCounty=''
            this.newAddress.addressDtaddress=''
            //默认选中
            for(let i in this.address){
                if(this.address[i].addressId!=0){
                     this.$set(this.address[i],'select',false)
                }
              
            }
            
            //关闭添加地址区域
            this.addAddflag=false
            // console.log(this.address);
            // 返回数据
            let postData = this.$qs.stringify({
                ...this.addConfirmItem,
                // userToken:'670d64d2b83e4a2cab5a4bf67a7630b3'
                })
            this.$http.post('/shopping/newaddress',postData)
            .then(res => {
                // 将地址id存入
                //默认选中
            for(let i in this.address){
                if(this.address[i].addressId==0){
                     this.address[i].addressId=res.data.data
                }
              
            }
                
            })
            .catch(err => {
                console.log(err);
                
            })
        },
        //得到修改值并修改
        onChangeProvince(data){
            this.newAddress.addressProvince=data.value;

        },
        onChangeCity(data){
            this.newAddress.addressCity=data.value;
        },
        onChangeArea(data){
            this.newAddress.addressCounty=data.value;
        }
    },
    watch: {
        address(newVal) {
            this.addConfirmItem=this.addressDefault,
            this.addSelect()
            this.$store.commit('order_form/setconfirmAddress', this.addConfirmItem)

            // console.log(this.address)
        }
      
        //模仿后台传过来的地址
        // this.address = [
        //     {
        //         addressId:1,
        //         addressName:'测试1',
        //         addressPhone:'1111111',
        //         addressProvince:'四川省',
        //         addressCity:'成都市',
        //         addressCounty:'青羊区',
        //         addressDtaddress:'国信安3栋3号',
        //         // select:false,
        //     },
        //     {
        //         addressId:2,
        //         addressName:'测试2',
        //         addressPhone:'1111111',
        //         addressProvince:'四川省',
        //         addressCity:'成都市',
        //         addressCounty:'青羊区',
        //         addressDtaddress:'国信安3栋3号',
        //         // select:true,
        //     },
        //      {
        //         addressId:3,
        //         addressName:'测试3',
        //         addressPhone:'1111111',
        //         addressProvince:'四川省',
        //         addressCity:'成都市',
        //         addressCounty:'青羊区',
        //         addressDtaddress:'国信安3栋3号',
        //         // select:false,
        //     }
        //     ]
        //     // 预设默认地址
        // this.addressDefault={
        //     // id:1,
        //     // name:'测试1',
        //     // phone:'1111111',
        //     // province:'四川省',
        //     // city:'成都市',
        //     // area:'青羊区',
        //     // addressDtaddress:'国信安3栋3号',
        //     // select:false,
        //      addressId:3,
        //     addressName:'测试3',
        //     addressPhone:'1111111',
        //     addressProvince:'四川省',
        //     addressCity:'成都市',
        //     addressCounty:'青羊区',
        //     delAddress:'国信安3栋3号',
        // },
        // 设置选中地址
        // console.log(this.address)
       
    },
    
}
</script>
<style scoped>
.address{
    /* padding-left: 23px; */
    font-size: 12px;
}
.way{
    color: #a0a0a0;
    font-size: 12px;
    text-align: left;
    padding: 15px 0 15px 23px;
    border-top:1px solid #a0a0a0;
    border-bottom:1px solid #a0a0a0;
    margin-bottom: 25px;
}

#adComfirm{
    width: 137px;
    border: 1px solid #000;
    float: left;
    /* width: 75px; */
    margin-top: 20px;
    padding: 5px 0 5px 0;
    margin-left: 30px;
    cursor: pointer;
}
#adComfirmBox{
    text-align: left;
    margin-left: 13px;
}
#adComfirmBox span{
    /* padding: 10px; */
    padding: 15px 10px;
    display: inline-block;
    width: 60px;
}
#adComfirmBox p{
    display: inline-block;
    width: 200px;
}
#adComfirmBox #edit{
    width: 25px;
    padding: 10px 0 5px 0;
    margin-left: 10px;
    border-bottom: 1px solid #000;
    text-align: center;
    cursor: pointer;
}
.addAddressBox{
    text-align: left;
    /* padding: 20px; */
    margin-left: 53px;
    margin-top: 25px;
}
#addAddTitle{
    display: block;
    width: 75px;
    margin-top: 20px;
    padding: 5px 0 5px 0;
    margin-left: 30px;
    border: 1px solid #000;
    cursor: pointer;
}
.addAddressBox span{
    padding: 15px 10px;
    display: inline-block;
    width: 60px;
}
.addAddressBox input{
    height: 20px;
    padding: 8px;
    width: 200px;
    color: #464a4c;
}
#saveBtn{
    margin-top: 0;
    width: 50px;
    padding: 10px 0 5px 0;
    margin-left: 10px;
    border-bottom: 1px solid #000;
    text-align: center;
}
/* 修改插件v-distpicker样式 */
.distpicker-address-wrapper{
    display: inline-block;
}
#VDistpicker{
    display: inline-block;
}
/* #VDistpicker{
    width: 200px !important;
}
.distpicker-address-wrapper select{
    height: 25px;
    font-size: 12px !important;
} */
/* 为空验证 */
#warning{
    color: red;
    /* position: absolute; */
    display: inline-block;
}
</style>        

