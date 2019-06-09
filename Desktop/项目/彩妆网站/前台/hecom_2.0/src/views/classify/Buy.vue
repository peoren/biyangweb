<template>
<!-- 颜色切换组件 -->
    <div class="buyfor"   >
        <!-- 颜色选择框 -->
        <div v-if="colors.length>0" >
            <div class="colorchoose" :class="{collapse: isColl}" @click.stop="isactive" ref="col" >
                <!-- 默认选中的颜色 -->
                <div class="colorchoosed">
                    <div class="colorpic" :style="'background:'+choosecolor"></div>
                    <span class="colorname">#{{choosename}}</span>
                    <!-- <span class="iconfont icon-xiala"></span> -->
                </div>
                <!-- 调用组件生成的可选颜色 -->
                <allcolor class="down" v-for="(allColor,index) in allColors" :class="{isshow: isshow}" :key="index" :zz="allColor" :zindex="index" @changeChoosed="change"></allcolor>
            </div>
            <!-- 数量选择框 -->
            <div class="countchoose" :class="{countcollapse: iscountColl}" @click.stop="iscountactive" ref="count">
                <!-- 默认数量，值为1 -->
                <div class="countchoosed">
                    <span class="countnum">数量:{{count}}</span>
                    <span class="iconfont icon-xiala"></span>
                </div>
                <count class="down" v-for="index in 5" :key="index" :class="{show: show}" :cindex="index" @changeCount="changeCount"></count>
            </div>
        </div>
        
        <!-- 购买和添加购物车区域 --> 
        <!-- <btn :stock="stock"/> --> 
        <!-- 添加到心愿dan -->    
        
    </div>
</template>
<script>
import allcolor from './Allcolor.vue';
import count from './Count.vue';
// import btn from './Btn.vue';
export default {
    name:'buy',
    components:{
        allcolor,
        count,
       
    },
    props:['colors','defau'],
    data() {
        return {
            isshow:false,
            show:false,
            isColl: true,
            iscountColl:true,
            choosecolor:'',
            choosename:'',
            count:1,
            stock:2,
            color:'',
            colorname:'',
            allColors:[],
          
        }
    },
    methods: {
        //通过点击来切换展开和收缩
        isactive() {
            this.isColl =!this.isColl; 
            if(this.isColl==false) {
                 this.$refs.col.style.height=(this.allColors.length+1)*44+'px'
                //  console.log(this.$refs.col.style.height)
            }else{
                this.$refs.col.style.height='44px'
            }
            
        },
        iscountactive() {
            this.iscountColl = !this.iscountColl;
            if(this.iscountColl==false) {
                 this.$refs.count.style.height=6*44+'px'
                //  console.log(this.$refs.col.style.height)
            }else{
                this.$refs.count.style.height='44px'
            } 
           
        },
        //触发时修改选中的色号
        change(index){
            this.isColl =!this.isColl; 
            this.colorname=index[1]
            this.choosecolor = this.allColors[index[0]].productInfSpic;
            
            this.choosename = this.allColors[index[0]].productFormat;
              this.$emit('dotransmit',this.colorname)
            // console.log(this.allColors[index].productFormat)
             this.$refs.col.style.height='44px'
          
        },
        changeCount(cindex){
            this.iscountColl = !this.iscountColl;
            this.count = cindex;
           this.$refs.count.style.height='44px'
           
        }
    },
    watch:{
        defau(newVal) {
            this.choosename = newVal.productFormat
            this.colorname = newVal.productInfId
            this.choosecolor=newVal.productInfSpic;
            // console.log(newVal)
        },
      
        colors(newVal) {
            this.allColors = this.colors
        },

        // 监听色号变化
       choosename:function () {
             this.$emit('dotransmit',this.colorname)
            // console.log(this.colorname)
        },
        //监听数量变化
        count:function () {
            this.$emit('doamount',this.count)
            console.log(this.count)
        }
    }
}
</script>
<style scoped>
   .buyfor{
       width: 100%;
       height: 44px;
       position: relative;  
   }
   .down {
       transition:height 3s;
   }
   /* 颜色选择框的样式 */
   .colorchoose{
       width: 58%;
       box-sizing: border-box;
       border: solid 1px #999;
       cursor: pointer;
       position: absolute;
       top: 0;
       left: 0;
       background: #fff;
       z-index: 10;
       user-select:none;
        transition: height ease-in-out .3s;
        overflow: hidden;
   }
   .collapse {
       overflow: hidden;
       height: 44px;
   }
   .colorchoose .colorchoosed{
       width: 100%;
       height: 44px;
       box-sizing: border-box;
       padding: 12px;
   }
   .colorchoose .colorchoosed span{
       line-height: 20px;
       color: #999;
   }
   .colorpic{
       width: 20px;
       height: 20px;
       float: left;
       margin-right: 10px;
   }



   /* 数量选择框的样式 */
   .countchoose{
       position: absolute;
       top: 0;
       right: 0;
       width: 38%;
       /* height: 44px; */
       box-sizing: border-box;
       border: solid 1px #999;
       cursor: pointer;
       background: #fff;
       transition: height ease-in-out .3s;
       overflow: hidden;
       z-index: 10;
       user-select:none;
   }
   .countcollapse{
       overflow: hidden;
       height: 44px;
   }
   .countchoosed{
       width: 100%;
       height: 44px;
       box-sizing: border-box;
       padding: 12px;
       line-height: 20px;
       color: #999;
   }
   .countchoosed span:last-child{
       float: right;
   }

</style>


