$(function(){
    if(String(location.href).match('=') !=null){
        var praceTow = String(location.href).substr((String(location.href).lastIndexOf('=')+1),1);
        console.log(praceTow); 
        prints.splice(praceTow,1);
        
    }
    
 
//   $('#search').on('click',function(){
   
   creats() ;
   $('.btn-primary').removeAttr('disabled');

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
    //判断图片格式是否正确
   })
    //触发点击事件，上传图片并将其添加进数组
      $('.btn-primary').on('click',function(){
        var $typeVlue = $('input').val();
     
       
        var sum= $typeVlue.toString();
        var num =  sum.substr(parseInt(sum.lastIndexOf('\\')));
        var newNum = '../img/photoWall/'+num.substr(1);
        var $optionOne = $('#allGrade-m').find('option:selected').text();
        var $optionTow = $('#allClass-m').find('option:selected').text();
        var flagGrade =  $('#allGrade-m').find('option:selected').attr('flag');
        var flagClass = $('#allClass-m').find('option:selected').attr('flag');
        var $text = $('#area').val();
        $('.closer').modal('hide');
        prints.unshift({
            name:$optionOne+$optionTow,
            substence:newNum,
            address:newNum,
            nameClass:flagClass,
            nameGrade: flagGrade,
            text:$text
        })
        // console.log(newNum,$optionOne,$optionTow,flagGrade,prints[0]);
        $('#wareHouse').empty();//清除当前的相册
        creats() ;//重新生成相册
    })
    //搜索当前的相册
    $('#search').on('click',function(){
        var flagSearchGrade =  $('#allGrade').find('option:selected').attr('flag');
        var flagSearchClass = $('#allClass').find('option:selected').attr('flag');
        console.log(flagSearchGrade,flagSearchClass);
        // $('#search').
        $('#wareHouse').empty();
        for(var j = 0;j<prints.length;j++){
            // prints[j].index = j;
            if(flagSearchGrade == ''&& flagSearchClass ==''){
                creats();
                break;
            }else if(prints[j].nameGrade ==flagSearchGrade &&prints[j].nameClass ==flagSearchClass ){
                var address = prints[j].address;
                var name = prints[j].name;
                var $tu = (`
                    <div class="left print " value="${j}">
                        <img src="${address}"  class="lll"  alt="" value="${j}">
                        <div class="clear caption " id="caption${j}" value="${j}">${name}</div>
                     </div>`)
                    // console.log('1111');
                    $('#wareHouse').append($tu); 
                }
        }
        if($('#wareHouse').children().length == 0){
         var $kong = (`
         <img class="error" src="../img/photoWall/error.png" alt="">
         `)   
         $('#wareHouse').append($kong); 
        }
    })
    //点击相册，将数据传到下一个页面
    $('#wareHouse').on('click','.print',function(event){
        
            
        var transmit =  event.target.getAttribute('value');
        location.href = 'album.html?userPower='+transmit;
        
    })
    
    $('#wareHouse').on('mouseenter','.print',function(event){
        var move = event.target.getAttribute('value');
     
        $('#caption'+move).text(prints[move].text);
        
    })//移入效果
    $('#wareHouse').on('mouseenter','.caption',function(event){
        var move = event.target.getAttribute('value');
     
        $('#caption'+move).text(prints[move].text);
        
    })//移入效果
    
    $('#wareHouse').on('mouseout','.print',function(){
       
        var move = event.target.getAttribute('value');
        $('#caption'+move).text(prints[move].name);
        
    })//移出效果
    //遍历数组，动态生成当前相册
    function creats(){
        for(var i=0;i<prints.length;i++){
            var address = prints[i].address;
            var name = prints[i].name;
            // var text = prints[i].text;
            var $tu = (`
                <div class="left print " >
                    <img src="${address}" class="lll" alt=""  value="${i}">
                   
                    <div class="clear caption " id="caption${i}" value="${i}">${name}</div>
                </div>`)
                // console.log('1111');
                $('#wareHouse').append($tu);
                // <div class="clear depict">${text}</div>
        }
       }
})