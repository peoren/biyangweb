$(document).ready(function(){
    
    
    var pageNumNow=0;//当前页码
    var allPageNum=1;//全部页码
    var tempStu=[];//student页面的临时数组
    var inputFlag=false;//全选的flag
    /**
     * 传入比对的对象名和比对的值;
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
            if(key=='garde'){
                if(tempStu[i].garde!=str){
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
        readData();
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
                <tr class='table-body' index=${tempStu[i].index}>
                    <td> <input type="checkbox" ></td>
                    <td>${tempStu[i].name}</td>
                    <td>${tempStu[i].startTime}</td>
                    <td>${tempStu[i].endTime}</td>
                    <td>${tempStu[i].state}</td>
                </tr>
                `)
        }
     }
     if(tableName=='studentTable'){
         
         
        for(var i=pageNumNow*6;i<lastNum&&i<tempStu.length;i++){
            $('.studentTable').children('tbody').append(`
                
                <tr class='table-body' index=${tempStu[i].index}>
                         <td> <input type="checkbox"></td>
                         <td>${tempStu[i].index}</td>
                         <td>${tempStu[i].name}</td>
                         <td>${tempStu[i].classType}</td>
                         <td>${tempStu[i].garde}</td>
                         <td>${tempStu[i].state}</td>
                         <td>${tempStu[i].parent}</td>
                         <td>${tempStu[i].tel}</td>
                         <td style="width:250px">
                            <input type="button" class="table-btn btn-look" value="查看" id='lookbtn' data-toggle="modal" data-target="#lookModal">
                            <input type="button" class="table-btn btn-change" value="编辑" id='changebtn' data-toggle="modal" data-target="#changeModal" >
                            <input type="button" class="table-btn btn-del" value="退学" id='outbtn' data-toggle="modal" data-target="#outModal" >
                        </td>
                        
                     </tr>
                `)
        }
        if(!tempStu.length){
            $('table').after(`
                <div style='height:400px;text-align: center;' class='table-body'><img style='height:100%' src="../img/sb.png" alt=""><div>
            `)
            
        }
     }
     
    }
    /**
     * 生成temStu调用checkDate()进行数据筛选
     */
    function showDate(tableName){
        var nam=$('#search-content').val();
        var classtyp=$('#allclass').val();
        var startTim=$('#time').val();
        var garde=$('#garde').val();
        
        
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
        if(garde){
            checkDate('garde',garde);
        }
        // 分页
        // changeClassName();
        if(tableName=='mytable'){
            for(var i=0;(i<6&&i<tempStu.length);i++){
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
         }
         if(tableName=='studentTable'){
             
             
            for(var i=0;(i<6&&i<tempStu.length);i++){
                $('.studentTable').children('tbody').append(`
                    <tr class='table-body' index=${tempStu[i].index}>
                             <td> <input type="checkbox"></td>
                             <td>${tempStu[i].index}</td>
                             <td>${tempStu[i].name}</td>
                             <td>${tempStu[i].classType}</td>
                             <td>${tempStu[i].garde}</td>
                             <td>${tempStu[i].state}</td>
                             <td>${tempStu[i].parent}</td>
                             <td>${tempStu[i].tel}</td>
                             <td style="width:250px">
                                <input type="button" class="table-btn btn-look" value="查看" id='lookbtn' data-toggle="modal" data-target="#lookModal">
                                <input type="button" class="table-btn btn-change" value="编辑" id='changebtn' data-toggle="modal" data-target="#changeModal" >
                                <input type="button" class="table-btn btn-del" value="退学" id='outbtn' data-toggle="modal" data-target="#outModal" >
                            </td>
                         </tr>
                    `)
            }
            if(!tempStu.length){
                $('table').after(`
                    <div style='height:400px;text-align: center;' class='table-body'><img style='height:100%' src="../img/sb.png" alt=""><div>
                `)
                
            }
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
      * @param {string} name 
      * @param {string} startTime 
      * @param {string} endTime 
      * @param {string} classtype 
      */
     function addLeaveDate(name,startTime,endTime,classType,garde,parent,tel,birthday,location){
        var state='正常';
        
        
        var stu=new Student(name,startTime,endTime,state,classType,garde,parent,tel,birthday,location)
       Class.push(stu);
       changeData();   
    }
    function changeClassName(){
        for(var i=0;i<tempStu.length;i++){
            switch(tempStu[i].classType){
                case 'bigC':tempStu[i].classType='大班'
                break;
                case 'smallC':tempStu[i].classType='小班'
                break; 
            }
            switch(tempStu[i].garde){
                case 'oneC':tempStu[i].garde='一班'
                break;
                case 'twoC':tempStu[i].garde='二班'
                break;
            }
        }
    }
    //点击页码分页
   $('.box-page').on('click','.pageNum',function(){
        pageNumNow=$(this).attr('num');
        showDateBypageNumNow('studentTable');
   
   })
   
   
    //点击向前换页
    $('#pre').on('click',function(){
        
        if(pageNumNow>0){
            
            pageNumNow--;
            showDateBypageNumNow('studentTable');
        }
    })
    //点击向后换页
    $('#next').on('click',function(){
        if(pageNumNow<allPageNum){  
            pageNumNow++;
            showDateBypageNumNow('studentTable');
        }
    })
    //页面加载时，查找#allclass里面的内容，并通过该内容动态添加数据
    clearTempDate();
    showDate('studentTable');
    showPage();
    //当年级发生改变的时候查找#allclass里面的内容，并加入
    $('#allclass').on('change',function(){
        clearTempDate();
        showDate('studentTable');
        showPage();
    })
    //当班级发生改变的时候查找#garde里面的内容，并加入
    $('#garde').on('change',function(){
        clearTempDate();
        showDate('studentTable');
        showPage();
    })
    //搜索
    $('#search').on('click',function(){
        clearTempDate();
        showDate('studentTable');
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
                        changeData();
                    }
                } 
            }
        
        })
        $('#closeModal').modal('hide');
        clearTempDate();
        showDate('studentTable');
        showPage();
    })
    //添加请假人
    $('#insave').on('click',function(){
        
        var name=$('#inname').val();   
        var startTime=$('#instartTime').val();
        var endTime=$('#inendTime').val();
        var classType=$('#inclasstype').val();
        var garde=$('#ingarde').val();
        var parent=$('#inparent').val();
        var tel=$('#intel').val();
        var birthday=$('#inbirthday').val();
        var location=$('#inlocation').val();

        if(!(name&&classType&&garde&&tel&&birthday&&location)){

            alert('信息不能为空！！！')
            return 0;
        }
        tempStu.splice(0,tempStu.length);
        addLeaveDate(name,startTime,endTime,classType,garde,parent,tel,birthday,location);
        $('#inname').val('');   
        $('#instartTime').val('');
        $('#inendTime').val('');
        $('#inclasstype').val('');
        $('#ingarde').val('');
        $('#inparent').val('');
        $('#intel').val('');
        $('#inbirthday').val('');
        $('#inlocation').val('');
        $('#myModal').modal('hide');
        clearTempDate();
        showDate('studentTable');
        showPage();
    })
    //查看同学信息
    $('tbody').on('click','#lookbtn',function(){
        var index=$(this).parent().parent().children().eq(1).text();
        for(var i=0;i<tempStu.length;i++){
            if(tempStu[i].index==index){
                $('#lookname').val(tempStu[i].name);   
                // $('#lookstartTime').val(tempStu[i].startTime);
                // $('#lookendTime').val(tempStu[i]);
                $('#lookclasstype').val(tempStu[i].classType);
                $('#lookgarde').val(tempStu[i].garde);
                $('#lookparent').val(tempStu[i].parent);
                $('#looktel').val(tempStu[i].tel);
                $('#lookbirthday').val(tempStu[i].birthday);
                $('#looklocation').val(tempStu[i].location);
                // console.log($('#lookname'));
                 return -1;   
                    
            }
        }
        
    })
    //编辑同学信息
    var t=0;//定义的全局变量
    $('tbody').on('click','#changebtn',function(){
        var index=$(this).parent().parent().children().eq(1).text();
        t=index;
        //返回值到页面
        for(var i=0;i<tempStu.length;i++){
            if(tempStu[i].index==index){
                $('#chname').val(tempStu[i].name);   
                $('#chclasstype').val(tempStu[i].classType);
                $('#chgarde').val(tempStu[i].garde);
                $('#chparent').val(tempStu[i].parent);
                $('#chtel').val(tempStu[i].tel);
                $('#chbirthday').val(tempStu[i].birthday);
                $('#chlocation').val(tempStu[i].location);
                
                 return -1;   
                    
            }
        }
        
        
    })
    //改变同学信息
    $('#chsave').on('click',function(){  
        
        var name=$('#chname').val();   
        // var startTime=$('#chstartTime').val();
        // var endTime=$('#chendTime').val();
        var classType=$('#chclasstype').val();
        var garde=$('#chgarde').val();
        var parent=$('#chparent').val();
        var tel=$('#chtel').val();
        var birthday=$('#chbirthday').val();
        var location=$('#chlocation').val();

        if(!(name&&classType&&garde&&tel&&birthday&&location)){

            alert('!!!')
            return 0;
        }
        for(var i=0;i<Class.length;i++){
            if(Class[i].index==t){
                Class[i].name=name;
                // Class[i].startTime=startTime;
                // Class[i].endTime=endTime;
                // Class[i].state=state;
                
                Class[i].classType=classType;
                Class[i].garde=garde;
                Class[i].parent=parent;
                Class[i].tel=tel;
                Class[i].birthday=birthday;
                Class[i].location=location;
                
                
            }
        }
        
        // clearTempDate();
        //重新渲染
        showDate('studentTable');
        showPage();
        $('#changeModal').modal('hide');
    })
    //删除同学
    $('tbody').on('click','#outbtn',function(){
        var index=$(this).parent().parent().children().eq(1).text();//拿到点击的值
        $('#out').on('click',function(){
            for(var i=0;i<tempStu.length;i++){
                if(tempStu[i].index==index){
                    Class.splice(i,1);
                    changeData();
                    clearTempDate();
                    showDate('studentTable');
                    showPage();
                    $('#outModal').modal('hide');
                    return -1;
                }
            }
        })
        

    })
    
    // $('#inname,#inparent').on('blur',function(){
    //     var nameReg = /^[\u4E00-\u9FA5]{2,4}$/
    //     if(!(nameReg.test($(this).val()))){
    //         $(this).next().css('display','block')
    //     }
    // })
    // $('#inname,#inparent').on('focus',function(){
    //     $(this).next().css('display','none')
    // })
    
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
    valueCheck('inname',/^[\u4E00-\u9FA5]{2,4}$/,'请输入正确的姓名');
    valueCheck('inparent',/^[\u4E00-\u9FA5]{2,4}$/,'请输入正确的姓名');
    valueCheck('intel',/^1[34578]\d{9}$/,'请输入正确的电话')
    valueCheck('inlocation',/^([\u4e00-\u9fa5]+(省|自治区)-)?[\u4e00-\u9fa5]+市-[\u4e00-\u9fa5]+(区|县)$/,'输入正确地址 省-市-区/县')
    
    valueCheck('chname',/^[\u4E00-\u9FA5]{2,4}$/,'请输入正确的姓名');
    valueCheck('chparent',/^[\u4E00-\u9FA5]{2,4}$/,'请输入正确的姓名');
    valueCheck('chtel',/^1[34578]\d{9}$/,'请输入正确的电话')
    valueCheck('chlocation',/^([\u4e00-\u9fa5]+(省|自治区)-)?[\u4e00-\u9fa5]+市-[\u4e00-\u9fa5]+(区|县)$/,'输入正确地址 省-市-区/县')
    valueCheckBottom('search-content',/^[\u4E00-\u9FA5]{1,4}$/,'请输入正确的姓名');
    
    function changeData(){
        
        localStorage.removeItem('Class');
        localStorage.setItem('Class',JSON.stringify(Class));
    }
    function readData(){
        for(var i=0;i<Class.length;i++){
            Class.splice(i,1);
        }
        Class=JSON.parse(localStorage.getItem('Class'));
    }
    
})