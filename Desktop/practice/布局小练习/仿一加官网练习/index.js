window.onload=function(){
//     var box=document.getElementsByClassName('header-ul')[0];
//     var content=document.getElementById('header-list');
//     var len=content.getElementsByTagName('li').length;
//     var point=document.getElementsByClassName('header-point')[0].getElementsByTagName('div');
//     var pre=document.getElementsByClassName('pre')[0];
//     var next=document.getElementsByClassName('next')[0];
//     var curent=0;
//         pre.index=1;
//         next.index=-1;
//         moveByCurent ()

//     //按照curent进行移动    
//     function moveByCurent () {
//         //这里必须要这样写是为了当不是点击的时候还是可以执行
//         var found=(this.index==1) ? -1 : 1;
//         curent+=found;
//         content.style.position='absolute'
//         content.style.left=-curent*1349+'px';
//         content.style.transition='all 0.5s linear';
        

//        //判断情况进行跳转 
//         if(curent==0 || curent==4){
//             curent=(curent==0) ? 3 : 1;
//           content.addEventListener('transitionend',function(){
//             content.style.transition='0s';
//             content.style.left=-curent*1349+'px';
//           })
          
//         }
//         pointByCurent();
//     }
//     //前后点击事件
//     pre.onclick=moveByCurent;
//     next.onclick=moveByCurent;

//     //自动播放
//     var timer=setInterval(moveByCurent,2000);
//     box.onmouseover=function(){
//         clearInterval(timer);
//     }
//     box.onmouseout=function(){
//         timer=setInterval(moveByCurent,2000);
//     }

//     //point自动播放
//    function pointByCurent(){
//     for(var i=0;i<point.length;i++){
//         point[i].index=i;
//         point[i].style.opacity=0.3;
//     }
//     console.log(curent);
    
//     point[curent-1].style.opacity=0.8;
//    }
   
    var box=document.getElementsByClassName('header-ul')[0];
    var content=document.getElementById('header-list').getElementsByTagName('li');
    var len=document.getElementById('header-list').getElementsByTagName('li').length;
    var point=document.getElementsByClassName('header-point')[0].getElementsByTagName('div');
    var pre=document.getElementsByClassName('pre')[0];
    var next=document.getElementsByClassName('next')[0];
    var curent=0;
    pre.index=1;
    next.index=-1;
    contentShowBycurent();
    function  contentShowBycurent () {
        var found=(this.index == 1) ? -1 : 1;
        for(var i=0;i<len;i++){
            content[i].index=i;
            content[i].style.zIndex='1';
            content[i].style.opacity='0';
            content[i].style.transition='0.5s all linear';
        }
        curent+=found;
        if( curent==3 || curent==-1 ){
            curent=(curent==3) ? 0 : 2 ;
        }
        content[curent].style.opacity='1';
        content[curent].style.zIndex='888';
        pointByCurent();
    }
    //点击事件
    pre.onclick=contentShowBycurent;
    next.onclick=contentShowBycurent;
    //自动播放

    var timer=setInterval(contentShowBycurent,2000);
    box.onmouseover=function(){
        clearInterval(timer);
    }
    box.onmouseout=function(){
        timer=setInterval(contentShowBycurent,2000);
    }
    //point自动

       function pointByCurent(){
    for(var i=0;i<point.length;i++){
        point[i].index=i;
        point[i].style.opacity=0.3;
    }
    console.log(curent);
    
    point[curent].style.opacity=0.8;
   }
}