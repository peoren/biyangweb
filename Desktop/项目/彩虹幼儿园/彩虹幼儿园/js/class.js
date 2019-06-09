$(document).ready(function(){
    for(var i=0;i<Class.length;i++){
        Class.splice(i,1);
    }
    Class=JSON.parse(localStorage.getItem("Class"))
    
    
    var pageNumNow=0;//当前页码
    var allPageNum=1;//全部页码
    var tempStu=[];//student页面的临时数组
    var inputFlag=false;//全选的flag
    /**
     * 传入比对的对象名和比对的值，并且建立temStu对象;
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
            
            
        }
        
            
        
    }
    /**
     * 建立tempStu这个数组，并将Garde数据注入temStu这个数组
     */
    function bulidTempStu(){
        
        for(var j=0;j<Garde.length;j++){
            tempStu[j]=Garde[j];  
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
    // /**
    //  * 清除#allclass内的数据
    //  * @param null;
    //  * @return null;
    //  */
    function clearDateInTabel(){
        $('.table-body').remove();

}
    /**
     * 当需要左右点击的时候动态渲染页面内数据
     */
    function showDateBypageNumNow(tableName){
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
    //  changeClassName();
     if(tableName=='mytable'){
        for(var i=pageNumNow*6;i<lastNum&&i<tempStu.length;i++){
            $('.mytable').children('tbody').append(`
                <tr class='table-body' gIndex=${tempStu[i].gIndex}>
                    <td> <input type="checkbox" ></td>
                    <td>${tempStu[i].garde}</td>
                    <td>${tempStu[i].startTime}</td>
                    <td>${tempStu[i].endTime}</td>
                    <td>${tempStu[i].state}</td>
                </tr>
                `)
        }
     }

     if(tableName=='classTable'){
         
         
        for(var i=pageNumNow*6;i<lastNum&&i<tempStu.length;i++){
            $('.classTable').children('tbody').append(`           
                <tr class='table-body' gIndex=${tempStu[i].gIndex}>
                <td> <input type="checkbox"></td>
                <td>${tempStu[i].gIndex}</td>
                <td>${tempStu[i].name}</td>
                <td>${tempStu[i].teacher}</td>
                <td>${tempStu[i].classType}</td>
                <td>${tempStu[i].startTime}</td>
                <td>${tempStu[i].gNum}</td>
                <td style="width:250px">
                   <input type="button" class="table-btn btn-look" value="查看" id='lookbtn' data-toggle="modal" data-target="#lookModal">
                   <input type="button" class="table-btn btn-change" value="编辑" id='changebtn' data-toggle="modal" data-target="#changeModal" >
                   <input type="button" class="table-btn btn-del" value="删除" id='outbtn' data-toggle="modal" data-target="#outModal" >
               </td>
                        
                     </tr>
                `)
        }
     }
     if(!tempStu.length){
        $('table').after(`
            <div style='height:400px;text-align: center;' class='table-body'><img style='height:100%' src="../img/sb.png" alt=""><div>
        `)
        
    }
    }
    /**
     * 生成temStu调用checkDate()进行数据筛选
     */
    function showDate(tableName){
        var nam=$('#search-content').val();
        var classtyp=$('#allclass').val();
        var startTim=$('#time').val();
        // var garde=$('#garde').val();
        
        
        
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
        // changeClassName();
        if(tableName=='mytable'){
            for(var i=0;(i<6&&i<tempStu.length);i++){
                $('.mytable').children('tbody').append(`
                    <tr class='table-body' gIndex=${tempStu[i].gIndex}>
                        <td> <input type="checkbox" ></td>
                        <td>${tempStu[i].garde}</td>
                        <td>${tempStu[i].startTime}</td>
                        <td>${tempStu[i].endTime}</td>
                        <td>${tempStu[i].state}</td>
                    </tr>
                    `)
            }
         }
         if(tableName=='classTable'){
            for(var i=0;(i<6&&i<tempStu.length);i++){
                $('.classTable').children('tbody').append(`
                    <tr class='table-body' gIndex=${tempStu[i].gIndex}>
                             <td> <input type="checkbox"></td>
                             <td>${tempStu[i].gIndex}</td>
                             <td>${tempStu[i].name}</td>
                             <td>${tempStu[i].teacher}</td>
                             <td>${tempStu[i].classType}</td>
                             <td>${tempStu[i].startTime}</td>
                             <td>${tempStu[i].gNum}</td>
                             <td style="width:250px">
                                <input type="button" class="table-btn btn-look" value="查看" id='lookbtn' data-toggle="modal" data-target="#lookModal">
                                <input type="button" class="table-btn btn-change" value="编辑" id='changebtn' data-toggle="modal" data-target="#changeModal" >
                                <input type="button" class="table-btn btn-del" value="删除" id='outbtn' data-toggle="modal" data-target="#outModal" >
                            </td>
                         </tr>
                    `)
            }
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
    /**
      * 添加请假人
      * @param {string} garde 
      * @param {string} startTime 
      * @param {string} endTime 
      * @param {string} classtype 
      */
     function addLeaveDate(name,teacher,classType,startTime,gNum){
        
        
        
        var stu=new GardeClass(name,teacher,classType,startTime,gNum)
       Garde.push(stu);
       
          
    }
    
    //点击页码分页
   $('.box-page').on('click','.pageNum',function(){
        pageNumNow=$(this).attr('num');
        showDateBypageNumNow('classTable');
   
   })
   
   
    //点击向前换页
    $('#pre').on('click',function(){
        
        if(pageNumNow>0){
            
            pageNumNow--;
            showDateBypageNumNow('classTable');
        }
    })
    //点击向后换页
    $('#next').on('click',function(){
        if(pageNumNow<allPageNum){  
            pageNumNow++;
            showDateBypageNumNow('classTable');
        }
    })
    //页面加载时，查找#allclass里面的内容，并通过该内容动态添加数据
    clearTempDate();
    showDate('classTable');
    showPage();
    //当年级发生改变的时候查找#allclass里面的内容，并加入
    $('#allclass').on('change',function(){
        clearTempDate();
        showDate('classTable');
        showPage();
    })
    //当班级发生改变的时候查找#garde里面的内容，并加入
    $('#garde').on('change',function(){
        clearTempDate();
        showDate('classTable');
        showPage();
    })
    //搜索
    $('#search').on('click',function(){
        clearTempDate();
        showDate('classTable');
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
                var gIndex=$(this).attr('gIndex')//获取被选中的name值
                for(var i=0;i<Garde.length;i++){
                    if(gIndex==Garde[i].gIndex){
                        Garde.splice(i,1);   //移出
                    }
                } 
            }
        
        })
        $('#closeModal').modal('hide');
        clearTempDate();
        showDate('classTable');
        showPage();
    })
    //添加班级
    $('#insave').on('click',function(){
        
        
        var name=$('#inname').val();   
        var startTime=$('#instartTime').val();
        // var endTime=$('#inendTime').val();
        var classType=$('#inclasstype').val();
        // var garde=$('#ingarde').val();
        // var parent=$('#inparent').val();
        // var tel=$('#intel').val();
        // var birthday=$('#inbirthday').val();
        // var location=$('#inlocation').val();
        var gNum=$('#ingNum').val();
        var teacher=$('#inteacher').val();
        if(!(name&&classType&&startTime&&gNum&&teacher)){

            alert('信息不能为空！！！');
            return 0;
        }
        tempStu.splice(0,tempStu.length);
        
        addLeaveDate(name,teacher,classType,startTime,gNum);
        $('#inname').val('');   
        $('#instartTime').val('');
        // $('#inendTime').val('');
        $('#inclasstype').val('');
        // $('#ingarde').val('');
        // $('#inparent').val('');
        // $('#intel').val('');
        // $('#inbirthday').val('');
        // $('#inlocation').val('');
        $('#ingNum').val('');
        $('#inteacher').val('');
        $('#myModal').modal('hide');
        clearTempDate();
        showDate('classTable');
        showPage();
    })
    //查看同学信息
    $('tbody').on('click','#lookbtn',function(){
        var gIndex=$(this).parent().parent().children().eq(1).text();
        for(var i=0;i<tempStu.length;i++){
            if(tempStu[i].gIndex==gIndex){
                $('#lookname').val(tempStu[i].name);   
                $('#lookstartTime').val(tempStu[i].startTime);
                // $('#lookendTime').val(tempStu[i]);
                $('#lookclasstype').val(tempStu[i].classType);
                $('#lookteacher').val(tempStu[i].teacher);
                // $('#lookgarde').val(tempStu[i].garde);
                // $('#lookparent').val(tempStu[i].parent);
                // $('#looktel').val(tempStu[i].tel);
                // $('#lookbirthday').val(tempStu[i].birthday);
                // $('#looklocation').val(tempStu[i].location);
                $('#lookgNum').val(tempStu[i].gNum);
                 return -1;   
                    
            }
        }
        
    })
    //编辑同学信息
    var t=0;//定义的全局变量
    $('tbody').on('click','#changebtn',function(){
        var gIndex=$(this).parent().parent().children().eq(1).text();
        t=gIndex;
        //返回值到页面
        for(var i=0;i<tempStu.length;i++){
            if(tempStu[i].gIndex==gIndex){
                $('#chname').val(tempStu[i].name);
                $('#chteacher').val(tempStu[i].teacher);   
                $('#chclasstype').val(tempStu[i].classType);
                $('#chstartTime').val(tempStu[i].startTime);
                $('#chgNum').val(tempStu[i].gNum);
                 return -1;   
                    
            }
        }
        
        
    })
    //改变同学信息
    $('#chsave').on('click',function(){  
        
        var name=$('#chname').val();   
        var startTime=$('#chstartTime').val();
        // var endTime=$('#chendTime').val();
        var classType=$('#chclasstype').val();
        var gNum=$('#chgNum').val();
        var teacher=$('#chteacher').val();
        if(!(name&&classType&&gNum&&startTime&&teacher)){
            
            
            alert('!!!')
            return 0;
        }
        for(var i=0;i<Garde.length;i++){
            if(Garde[i].gIndex==t){
                Garde[i].name=name;
                Garde[i].teacher=teacher;
                Garde[i].startTime=startTime;
                // Garde[i].endTime=endTime;
                // Garde[i].state=state;
                
                Garde[i].classType=classType;
               Garde[i].gNum=gNum;
                
                
            }
        }
        
        // clearTempDate();
        //重新渲染
        showDate('classTable');
        showPage();
        $('#changeModal').modal('hide');
    })
    //删除同学
    $('tbody').on('click','#outbtn',function(){
        var gIndex=$(this).parent().parent().children().eq(1).text();//拿到点击的值
        $('#out').on('click',function(){
            for(var i=0;i<tempStu.length;i++){
                if(tempStu[i].gIndex==gIndex){
                    Garde.splice(i,1);
                    clearTempDate();
                    showDate('classTable');
                    showPage();
                    $('#outModal').modal('hide');
                    return -1;
                }
            }
        })
        

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
    
    valueCheck('inname',/^[\u4E00-\u9FA5]{2,4}$/,'请输入正确的班级名称');
    valueCheck('ingNum',/^[0-9]*$/,'请输入正确的人数');
    valueCheck('chname',/^[\u4E00-\u9FA5]{2,4}$/,'请输入正确的班级名称');
    valueCheck('chgNum',/^[0-9]*$/,'请输入正确的人数');
    valueCheckBottom('search-content',/^[\u4E00-\u9FA5]{1,4}$/,'请输入正确的姓名');
    
    // function changeData(){
    //     for(var i=0;i<Class.length;i++){
            
            
    // }
    
        
})