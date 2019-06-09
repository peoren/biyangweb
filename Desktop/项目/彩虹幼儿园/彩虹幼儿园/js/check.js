$(document).ready(function () {
    var pageNumNow=0;//当前页码
    var allPageNum=1;//全部页码
    var tempStu=[];//check页面的临时 数组
    /**
     * 传入比对的对象名和比对的值，如果不满足匹配就会移出临时数据
     * @param {string} key 
     * @param {string} str 
     */
    function checkDate(key,str){
        for(var i=0;i<tempStu.length;i++){

            if(key=='classType'){
                if(tempStu[i].classType!=str){
                    tempStu.splice(i,1);
                    i--;
                }
            }
            
            if(key=='name'){
                if(!(tempStu[i].name.match(str))){
                    tempStu.splice(i,1);
                    i--;
                }
            }
            if(key=='startTime'){
                if(tempStu[i].startTime!=str){
                    tempStu.splice(i,1);
                    i--;
                }
            }
            
        }
        
        
    }
    /**
     * 建立tempStu这个数组，并将Class数据注入temStu这个数组
     */
    function bulidTempStu(){
        
        for(var j=0;j<Class.length;j++){
            tempStu[j]=Class[j];  
        } 
        
        
    }
    /**
     * 清理tempStu数组的数据，并且重置页码
     */
    function clearTempDate(){
        tempStu.splice(0,tempStu.length);
        pageNumNow=0;
        allPageNum=1;
    }
    /**
     * 当需要左右点击的时候动态渲染页面内数据
     */
    function showDateBypageNumNow(){
    //修改样式
    $('.pageNum').children('span').css({
     background:'white',
     color:'#D45500',
    })
    $('.pageNum').each(function(){
        if($(this).attr('num')==pageNumNow){
                $(this).children('span').css({
                background:'#D45500',
                color:'white',
            })
        }
    })
 clearDateInTabel();//清除页面
 //加载页面
 var lastNum=(pageNumNow+1)*6;//计算第二页数据个数
 console.log(pageNumNow);
 
 for(var i=pageNumNow*6;i<lastNum&&i<tempStu.length;i++){
     $('.mytable').children('tbody').append(`
         <tr class='table-body' index=${tempStu[i].index}>
             <td> <input type="checkbox" ></td>
             <td>${tempStu[i].name}</td>
             <td>${tempStu[i].startTime}</td>
             <td>${tempStu[i].endTime}</td>
             <td>${tempStu[i].state}</td>
         </tr>
         `)
 }
 if(!tempStu.length){
    $('table').after(`
        <div style='height:400px;text-align: center;' class='table-body'><img style='height:100%' src="../img/sb.png" alt=""><div>
    `)
    
}
    }
    /**
     * 筛选tempStu中的数据并调用checkDate()进行数据筛选
     */
    function showDate(){
        var nam=$('#search-content').val();
        var classtyp=$('#allclass').val();
        var startTim=$('#time').val();
        clearDateInTabel();
        bulidTempStu();
        
                
        if(nam){
            checkDate('name',nam);
 
        }
        if(classtyp){
            checkDate('classType',classtyp);
  
        }
        if(startTim){
            checkDate('startTime',startTim);
   
        }
        // 分页
        
        for(var i=0;(i<6&&i<tempStu.length);i++){
            $('.'+'mytable').children('tbody').append(`
            <tr class='table-body' index=${tempStu[i].index}>
                <td> <input type="checkbox" ></td>
                <td>${tempStu[i].name}</td>
                <td>${tempStu[i].startTime}</td>
                <td>${tempStu[i].endTime}</td>
                <td>${tempStu[i].state}</td>
            </tr>
            `)
            
        }
        if(!tempStu.length){
            $('table').after(`
                <div style='height:400px;text-align: center;' class='table-body'><img style='height:100%' src="../img/sb.png" alt=""><div>
            `)
            
        }   
        
        // tempStu.splice(0,tempStu.length);
        $('tbody').find('input').prop('checked',false)
        inputFlag=false;
        
    }
    /**
     * 根据tempStu个数渲染页码
     */
    function showPage(){
        $('.pageNum').remove();
        allPageNum=parseInt(tempStu.length/7);//总页数
        
        
            for(var i=0;i<allPageNum+1;i++){
                if(i==0){
                    $('#pre-li').after(`
                    <li class='pageNum' num=${i}><span >${i+1}</span></li>
                    `) 
                }else{
                    $('.pageNum').last().after(`
                    <li class='pageNum' num=${i}><span >${i+1}</span></li>
                `)  
                }  
        }
    }
    //点击页码分页
   $('.box-page').on('click','.pageNum',function(){
        pageNumNow=$(this).attr('num');
        showDateBypageNumNow();
   
   })
   
   
    //点击向前换页
    $('#pre').on('click',function(){
        
        if(pageNumNow>0){
            
            pageNumNow--;
            showDateBypageNumNow();
        }
    })
    //点击向后换页
    $('#next').on('click',function(){
        if(pageNumNow<allPageNum){  
            pageNumNow++;
            showDateBypageNumNow();
        }
    })
    // /**
    //  * 读取classtype里面的内容并动态添加到.mytable表里面
    //  * @param {array} classtype 
    //  * @return null;
    //  */
    // function showDateByClassType(classtype){
    //     clearDateInTabel();
    //     $.each(classtype,function(index,obj) {
    //         $('.mytable').children('tbody').append(`
    //         <tr class='table-body' index=${obj.index}>
    //             <td> <input type="checkbox" ></td>
    //             <td>${obj.name}</td>
    //             <td>${obj.startTime}</td>
    //             <td>${obj.endTime}</td>
    //             <td>${obj.state}</td>
    //         </tr>
    //         `)
    //     })
        
        
        
    // }
    // /**
    //  * 查找页面上#allclass里面的val并返回对应的数组；
    //  * @param{null}
    //  * @return {array}bigClass 或者 {array}smallClass
    //  */
    // function findClassNameByVal(){
    //     var temp=$('#allclass').val();
    //     if(temp=='bigC'){
    //         return bigClass;
    //     }else{
    //         return smallClass;
    //     }
    // }
    // /**
    //  * 清除#allclass内的数据
    //  * @param null;
    //  * @return null;
    //  */
    function clearDateInTabel(){
            $('.table-body').remove();

    }
    // /**
    //  * 读取classtype里面的内容并且比对时间再并动态添加到.mytable表里面
    //  * @param {array} classtype 
    //  * @return null;
    //  */
    // function addDateByTime(classtype){
    //     $.each(classtype,function(index,obj) {
    //         var temp=$('#time').val();
    //         if(temp==obj.startTime){
    //             $('.mytable').children('tbody').append(`
    //             <tr class='table-body'>
    //                 <td> <input type="checkbox" ></td>
    //                 <td>${obj.name}</td>
    //                 <td>${obj.startTime}</td>
    //                 <td>${obj.endTime}</td>
    //                 <td>${obj.state}</td>
    //             </tr>
    //             `)
    //         }
    //     })
    // }
    // /**
    //  * 查找对应数组里面名字相同的数据，并且将该条数据写入表.mytable中；
    //  * @param {string} name 
    //  * @param {array} classtype 
    //  */
    // function seachByName(name,classtype){
    //     $.each(classtype,function(index,obj){
    //          if(name==obj.name){
    //              $('.mytable').children('tbody').append(`
    //              <tr class='table-body'>
    //                  <td> <input type="checkbox" ></td>
    //                  <td>${obj.name}</td>
    //                  <td>${obj.startTime}</td>
    //                  <td>${obj.endTime}</td>
    //                  <td>${obj.state}</td>
    //              </tr>
    //              `)
    //          }
    //     })
    //  }
     /**
      * 添加请假人
      * @param {string} name 
      * @param {string} startTime 
      * @param {string} endTime 
      * @param {string} classtype 
      */
     function addLeaveDate(name,startTime,endTime,classType){
         var state='请假';
         var stu=new Student(name,startTime,endTime,state,classType)
        Class.push(stu);   
     }
    //页面加载时，查找#allclass里面的内容，并通过该内容动态添加数据
    clearTempDate();
    showDate();
    showPage();
    //当班级发生改变的时候查找#allclass里面的内容，并加入
    $('#allclass').on('change',function(){
        clearTempDate();
        showDate();
        showPage();
    })
    //当时间发生改变的时候改变内容
    $('#time').on('change',function(){
        clearTempDate();
        showDate();
        showPage();
        
    })
    //搜索
    $('#search').on('click',function(){
        clearTempDate();
        showDate();
        showPage();
        
    })
    //添加请假人
    $('#save').on('click',function(){
        tempStu.splice(0,tempStu.length);
        var name=$('#name').val();
        var classType=$('#classtype').val();
        var startTime=$('#startTime').val();
        var endTime=$('#endTime').val();
        if(!(name&&classtype&&startTime&&endTime)){
            alert('!!!')
            return 0;
        }
        addLeaveDate(name,startTime,endTime,classType);
        $('#name').val('');
        $('#classtype').val('');
        $('#startTime').val('')
        $('#endTime').val('');
        $('#myModal').modal('hide');
        clearTempDate();
        showDate();
        showPage();
    })
    //全选按钮
    var inputFlag=false;
    $('#chooseall').on('click',function(){
        inputFlag=!inputFlag;
        if(inputFlag){
            $('tbody').find('input').prop('checked',true)
        }else{
            $('tbody').find('input').prop('checked',false)
        }
    })
    //点击全选input全选
    $('.chooseall-input').on('click',function(){
        inputFlag=!inputFlag;
        if(inputFlag){
            $('tbody').find('input').prop('checked',true)
        }else{
            $('tbody').find('input').prop('checked',false)
        }
    })
    //删除
    $('#confrimdel').on('click',function(){
        tempStu.splice(0,tempStu.length);
        $('.table-body').each(function(){
            if($(this).find('input').prop('checked')){
                var index=$(this).attr('index')//获取被选中的name值
                for(var i=0;i<Class.length;i++){
                    if(index==Class[i].index){
                        Class.splice(i,1);   //移出
                    }
                } 
            }
        
        })
        $('#closeModal').modal('hide');
        clearTempDate();
        showDate();
        showPage();
    })
    function valueCheck(name,Reg,value){
        $('#'+name).on('blur',function(){
            var nameReg = Reg;
            if(!(nameReg.test($(this).val()))){
                // $(this).next().css('display','block')
                $(this).parent().append(`
                <p class="err"id='${name}err' style="position:absolute">${value}</p>`)
                $(this).css({
                    border:' 1px solid red',
                })
                $(this).val('')
            }
        })
        $('#'+name).on('focus',function(){
            $('#'+name+'err').remove();
            $(this).css({
                border:' 1px solid rgb(156, 155, 155)'
            })
            
        })
    }
    function valueCheckBottom(name,Reg,value){
        $('#'+name).on('blur',function(){
            var nameReg = Reg;
            if(!(nameReg.test($(this).val()))){
                // $(this).next().css('display','block')
                $(this).parent().append(`
                <p class="err"id='${name}err' style="position:absolute;left:0;bottom:-40px">${value}</p>`)
                $(this).css({
                    border:' 1px solid red',
                })
                $(this).val('')
            }
        })
        $('#'+name).on('focus',function(){
            $('#'+name+'err').remove();
            $(this).css({
                border:' 1px solid rgb(156, 155, 155)'
            })
            
        })
    }
    valueCheck('name',/^[\u4E00-\u9FA5]{2,4}$/,'请输入中文');
    valueCheckBottom('search-content',/^[\u4E00-\u9FA5]{1,4}$/,'请输入正确的姓名');
});
