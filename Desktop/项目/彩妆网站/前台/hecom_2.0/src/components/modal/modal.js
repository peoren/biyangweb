import Vue from 'vue';
import modal from './modal.vue';

let modalConstructor = Vue.extend(modal);

let theModal = function (text,type) {
    // return new Promise((res, rej) => { //promise封装，ok执行resolve，no执行rejectlet
      let modalDom = new modalConstructor({   
        el: document.createElement('div')
      })
      document.body.appendChild(modalDom.$el);  //new一个对象，然后插入body里面

      modalDom.text = text;   //为了使confirm的扩展性更强，这个采用对象的方式传入，所有的字段都可以根据需求自定义
      
      //   modalDom.ok = function () {
    //     res()
    //     modalDom.isShow = false
    //   }
    //   modalDom.close = function () {
    //     rej()
    //     modalDom.isShow = false
    //   }
      setTimeout(function(){
        modalDom.isShow = false
      },1000)
    // })
  }

  export default theModal;  
  