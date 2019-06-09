$(function(){
    var prace = String(location.href).substr((String(location.href).lastIndexOf('=')+1),1);
    console.log(location.href);
    console.log(prace);
    createTow();
    //添加新的照片
    $('.btn-primary').on('click',function(){
        var $typeVlue = $('input').val();
        var sum= $typeVlue.toString();
        var num =  sum.substr(parseInt(sum.lastIndexOf('\\')));
        var newNum = '../img/photoWall/'+num.substr(1);
        prints[prace].substence.unshift(newNum);
        // console.log(newNum,$optionOne,$optionTow,flagGrade,prints[0]);
        $('#wareHouseTow').empty();//清除当前的相册
        createTow() ;//重新生成相册
        // console.log(prints[prace].substence);
    })
    $('#back').on('click',function(){
        history.back();
    })
    //返回
    $('input').on('change',function(){
        var $typeVlue = $('input').val();
        var sum= $typeVlue.toString();
        var num =  sum.substr(parseInt(sum.lastIndexOf('\\')));
        var newNum = '../img/photoWall/'+num.substr(1);
        var pattern =/jpg|jpeg|gif|png/i;
        var flage=pattern.test(newNum);
        //  console.log(flage);
        if(flage){
            $('.warningTow').css('opacity','0');
            $('.btn-primary').removeAttr('disabled');
        }else {
            $('.warningTow').css('opacity','1');
           
            $('.btn-primary').attr('disabled','true'); 
            flagOne = true; 
        }
    })
    //判断图片格式
    $('#close').on('click',function(){
        location.href = 'photoWall.html?userPower='+prace;
       //删除当前相册
    })
    var tr=0;
    var section = 0;
    $('#wareHouseTow').on('click','.print',function(){    
      var transmit =  event.target.getAttribute('index');
       tr=parseInt(transmit);
       section = 0;
       $('ul').empty();//清除先前生成的图片
        for(var j=0;j<prints[prace].substence.length;j++){
            var newPrintTow = prints[prace].substence[j];
           
            var banner = (`
       
            <li class="tu"><img src="${newPrintTow}" alt=""></li>
            
            `)
            $('ul').append(banner);
            // console.log( prints[prace].substence[j]);
        }
        
        $('ul').css({
            width:prints[prace].substence.length*600+'px',
            left:(-1)*tr*600+'px'
            
        }); 
    })
    //生成轮播图
    $('#pre').on('click',function(){
       section -- ;
       var hr = section+tr;
       if(hr>-1){
            $('ul').css('left',-(hr)*600+'px')
       }else{
        //    alert('当前已经是第一张');
           section = 0-tr;
        var cue = (`
            <div class="cue">当前已经是第一张</div> 
        `)
        $('#banner').append(cue);
        setTimeout(function(){
            $('.cue').remove();
        },1000);
        }  
    })
    //上一张
    $('#next').on('click',function(){
        section ++ ;
        var hr = section+tr;
        if(hr>= prints[prace].substence.length){
            var cue = (`
            <div class="cue">当前已经是最后一张</div> 
            `)
            $('#banner').append(cue);
            setTimeout(function(){
                $('.cue').remove();
             },1000);
     
            section = prints[prace].substence.length-tr-1;
        }else{
            $('ul').css('left',-(hr)*600+'px') ;
        }
        
    })
    //下一张

   
    
    //实现查看大图的轮播
   
   
    function createTow(){
        for(var i=0;i<prints[prace].substence.length;i++){
            var newPrint = prints[prace].substence[i];
            var newTu = (`
            <div class="left print"  data-toggle="modal"   data-target=".bs-example-modal-lg">
                <img src="${newPrint}" alt="" index="${i}">
            </div>`)
            $('#wareHouseTow').append(newTu);
        }
    }
    //生成相册图片
})