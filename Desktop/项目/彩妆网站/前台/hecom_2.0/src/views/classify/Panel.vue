<template>
  <div class="panel">
    <span  v-if="flgep==1" class="leftspan span1" @click.prevent="pre" >‹</span>
    <span class="bad span1"  v-if="flgep==0" >‹</span>
   
    <span class="num" >{{page}}</span>/
    <span class="num">{{state+1}}</span>
    <span  v-if="flgen==1" class="rightspan span1" @click.prevent="next">›</span>
    <span class="bad span1" v-if="flgen==0">›</span>
    <input v-model="number" type="number"  min="0" oninput="if(value.length>2)value=value.slice(0,2)">
    <button @click="dopage">跳转</button>
  </div>
</template>

<script>
export default {
  name: "panel",
  props:['state','pagemark','sorting','reset'],
  data() {
    return {
      pageState:0,
      page:1,
      pageMark:'',
      flgep:0,
      flgen:1,
      number:1,
    };
  },
  methods:{
    dopage(){

    
      let that=this
      
       if(this.number>0 && this.number<=this.state+1){
           this.page = this.number;
           console.log(this.sorting)
          this.$http.get('/product/getallgoods?type_id='+that.pagemark+'&currentPage='+this.number+'&fyState='+this.sorting)
          .then(res=>{
            console.log(res.data)
          that.$emit('dopage',res.data.data.pageInfo)
        })
         if(this.number==1){
           this.flgen=1;
            this.flgep=0
          }else if(this.number==this.state+1) {
            this.flgen=0;
            this.flgep=1
          }else {
            this.flgen=1;
            this.flgep=1
          }
         
       }
    },
    pre(){
      this.page--
       this.$http.get('/product/getallgoods?type_id='+this.pagemark+'&currentPage='+this.page+'&fyState='+this.sorting)
        .then(res=>{
       
        this.$emit('dopage',res.data.data.pageInfo)
       })
        if(this.page<=1){
        //  console.log(this.page)
          this.flgep=0;
          this.flgen=1;
       }else if(this.page>1) {
         this.flgep=1;
        this.flgen=1;
        //  console.log(this.page)
       }
    },
    next(){
     this.page++
       this.$http.get('/product/getallgoods?type_id='+this.pagemark+'&currentPage='+this.page+'&fyState='+this.sorting)
        .then(res=>{
         
         this.$emit('dopage',res.data.data.pageInfo);
         console.log(res.data.data)
       })
       if(this.page>=this.state+1){
        // console.log(this.page)
          this.flgen=0;
         this.flgep=1;
       }else if (this.page<this.state+1) {
         this.flgen=1;
          this.flgep=1
       }
    }
  },
  watch:{
      state(newVal) {
          this.pageState =this.state
        },
        reset(newVal){
          if(newVal>0){
            this.page=1
            this.flgen=1;
            this.flgep=0;
          }
        },
      pagemark(newVal) {
        this.pageMark=this.pagemark
      },
      flegn(){
        // console.log('11')
      },
      flegp(){
        // console.log('111')
      }
  }
};
</script>

<style>
 .num {
   display: inline-block;
  font-size: 16px;
   margin: 0px 2px 0 2px ;
   line-height: 22px;
    position: relative;
  top: 2px;
}
.panel {
  text-align: center;
  line-height: 20px;
  
  font-size: 12px;
  margin: 30px 0 10px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
{
  -webkit-appearance: none !important;
  }
input {
  height: 18px;
  width: 24px;
  outline: none;
  position: relative;
  top: 2px;
  margin: 0 2px 0 2px ;

}
button {
  width: 36px ;
  height: 22px;
  font-size: 12px;
  cursor: pointer;
  line-height: 22px;
  border: 1px solid #ddd;
  position: relative;
  background-color: #f3f3f3;
  margin: 0 2px 0 2px ;
   position: relative;
  top: 2px;
  
}
button:hover {
  background: #666;
  color: white;
}
.bad {
  cursor: not-allowed;
}
.leftspan, .rightspan{
  cursor: pointer;
}
.panel .span1 {
  padding: 0 5px;
  color: #ccc;
 margin: 0 2px 0 2px ;
  /* cursor: not-allowed; */
  background-color: #f3f3f3;
  border: 1px solid #ddd;
}
.panel > .span1,
.panel > a {
  border: 1px solid #ddd;
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  padding: 0 8px;
  color: black;
}
.panel > .span1 {
  padding: 0 10px;
}
.panel .span1:hover{
   background: #666;
  color: white;
}

.panel > a:hover {
  background: #666;
  color: white;
}
</style>
