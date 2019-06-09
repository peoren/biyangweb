<template>
<!-- 排序主键 -->
    <div class="countchoose" :class="{countcollapse: iscountColl}" @click.stop="iscountactive"  ref="count">
            <!-- 默认数量，值为1 -->
            <div class="countchoosed">
                <span class="countnum">{{count}}</span>
                <span class="iconfont icon-xiala"></span>
            </div>
        <options class="down"  :msg='m' v-for="(m,index) in chose" :key="index" :class="{show:show}" :cindex="index" @changeCount="changeCount"/>
    </div>
</template>
<script>
import options from './opitions.vue'
export default {
     name:'down',
    components:{
      options
       
    },
    props:[ 'optionchange'],
    data(){
        return {
            iscountColl:true,
            count:'默认排序',
            show:false,
            chose:[
                '默认排序',
                '价格从高到低',
                '价格从低到高'
            ]
        }
    },
    methods:{
         changeCount(cindex){
        this.iscountColl = !this.iscountColl; 
        this.count = this.chose[cindex];
        this.$refs.count.style.height='44px'
        },
        iscountactive() {
            this.iscountColl = !this.iscountColl; 
            if(this.iscountColl==false) {
                 this.$refs.count.style.height=4*42+'px'
                //  console.log(this.$refs.col.style.height)
            }else{
                this.$refs.count.style.height='44px'
            } 
        }
    },
    watch:{
        count:function () {
            this.$emit('sort',this.count)
            console.log(this.count)
        },
        optionchange(newVal){
            this.count = this.chose[0];
        }
    }
}
</script>

<style  scoped>
 .countchoose{
       position: absolute;
       top: -2px;
       right: 0;
       width: 160px;
       font-size: 16px;
       /* height: 44px; */
       box-sizing: border-box;
       border: solid 1px #999;
       cursor: pointer;
       background: #fff;
       z-index: 10;
       user-select:none;
        transition: height ease-in-out .3s;
        overflow: hidden;
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

