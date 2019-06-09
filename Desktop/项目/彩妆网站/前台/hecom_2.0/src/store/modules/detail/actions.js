import axios from 'axios'

export default {
    getdetailData(context,payload){
        // setTimeout(function(){
        //   //页面加载时，通过异步请求数据,注意，此处时模拟，获取的时本地数据
        //   //这是把获取到的数据转化成字符串后存储到sessionStorage中
        //   sessionStorage.setItem('articles',JSON.stringify(articles))
        //   //通过触发函数给store下面的state赋值
          
        // },2000)
        
        // console.log(this)
        axios.get('/product/singlegoods',{
            params: {
                productId: payload
            }}) 
                .then(res => {
                    console.log(res)
                    if(res.data.code == 1) {
                        
                        sessionStorage.setItem('data',JSON.stringify(res.data.data[0]))
                        
                        
                    }else {
                        console.log(2)
                    }
                    context.commit('getdata')
                    
                    context.commit('havGet')
                })
                .catch(err => {
                    console.log(err) 
                    console.log(1),
                    context.commit('getErr')
                })
        // console.log('actions');

        
        
      }
  
}