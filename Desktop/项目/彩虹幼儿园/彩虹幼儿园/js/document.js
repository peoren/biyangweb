function showTotal(){
var $doc_stu_num = $doc_add.length;
$('.doc-stu-num').text($doc_stu_num);
}
var index=1;
$(function(){ 
  // 教学部显示条数
    showTotal();
    // 判断新增部门内容
  $('#doc-add-input').on('blur',function(){
    if($('#doc-add-input').val().trim() == ''){
      console.log(1)
      $(this).css('border','1px solid red');
      $(this).next().text("请输入部门名称！")
    }else{
      $(this).next().text('');
      // $('.doc-add-cancel-pat').text('');
      $(this).css('border','');
      // console.log($('#doc-add-input-pat'));
    }
  })
  $('#doc-add-text').on('blur',function(){
    if($('#doc-add-text').val().trim() == ''){
      $(this).next().text("请输入部门描述！");
      $(this).css('border','1px solid red');
    }else{
      // $('.doc-add-cancel-pat').text('');
      $(this).next().text('');
      $(this).css('border','');      
      // console.log($('#doc-add-input-pat'));
    }
  })

  // 判断编辑部门内容
  $('#doc-change-input').on('blur',function(){
    if($('#doc-change-input').val().trim() == ''){
      $(this).next().text("请输入部门名称！")
      $(this).css('border','1px solid red');
    }else{
      $(this).next().text('');
      // $('.doc-add-cancel-pat').text('');
      $(this).css('border','');
      // console.log($('#doc-add-input-pat'));
    }
  })
  $('#doc-change-text').on('blur',function(){
    if($('#doc-change-text').val().trim() == ''){
      $(this).next().text("请输入部门描述！");
      $(this).css('border','1px solid #f40');
    }else{
      $(this).next().text('');
      // $('.doc-add-cancel-pat').text('');
      $(this).css('border','');
      // console.log($('#doc-add-input-pat'));
    }
  })

  // 新增部门
  $('.doc-add').on('click',function(){
    // 重置
    $('#doc-add-input').val('');
      $('#doc-add-text').val('');
      $('#doc-add-input-pat').text('');
      $('#doc-add-text-pat').text('');
      // $('.doc-add-cancel-pat').text('');
    })

  $('.doc-add-sure').on('click', function(){ 

     var nowtText = $("#red").text();
     // 获取数据
   var flag = true;
   var $doc_addinput = $('#doc-add-input').val().trim(),
   $doc_addtext = $('#doc-add-text').val().trim();
   if($doc_addinput.length == 0 || $doc_addinput.length > 20 ||  $doc_addtext.length == 0 ||  $doc_addtext.length > 20){
      $('.doc-add-cancel-pat').text('请检查是否正确！');
      flag = false;
   }else{
    // console.log($('body').children());
    flag = true;
    $doc_add.push(new Document($doc_addinput,$doc_addtext));
    creat();
    pagination();
    $('[data-toggle="popover"]').popover();
   }
   if(flag) {
    $(this).attr('data-dismiss','modal');
   }else if (!flag) {
    $(this).attr('data-dismiss','');
   }
   showTotal();
   $(".bbb span").each(function(){
     $(this).attr("id","")
     if($(this).text()==nowtText){
       $(this).attr('id','red');
     }
   })

  //  console.log($doc_add)
  })
  
  // 删除部门
  var $doc_del = 0 ;
  var $doc_per = 0 ;
  //点击删除按钮
  $("table").on('click','.doc-del', function(){
    // 重置提示语
    $('#doc-del-pat').text('');
    // 获取部门人数
  $doc_del = $(this).parent().parent().attr("data-num");
  $doc_per = parseInt($(this).parent().parent().children('td:nth-child(4)').text());
  })
  //点击删除部门确认按钮
  $('.doc-del-sure').on('click',function(){
   var flag = true;
  if($doc_per != 0){
    flag = false;
    $('#doc-del-pat').text('该部门下还有人员，不能删除！');
  }else{
    flag = true;
    $doc_add.splice(parseInt($doc_del),1);
    // 删除当前页最后一条数据，跳转到上一页
    if($doc_del % 5 == 0 ){
      index = index - 1;
    }
    creat();  
    pagination();
       
  }
  // 模态框显示退出
  if(flag) {
    $(this).attr('data-dismiss','modal');
   }else if (!flag) {
    $(this).attr('data-dismiss','');
   }
  //  显示条数
   showTotal();
  })

  // 编辑部门
  var $doc_change_num = 0;
  // 点击编辑按钮
  $('table').on('click','.doc-change',function(){
    // 重置
    $('#doc-change-input-pat').text('');
    $('#doc-change-text-pat').text('');
    // $('.doc-change-cancel-pat').text('');

    $doc_change_num = $(this).parent().parent().children('td:first-child').text();
    var $doc_changeinput = $('#docname' + $doc_change_num).text();
    if($('#docdec' + $doc_change_num).text().length > 8){
      var $doc_changetext = ($('#docdec' + $doc_change_num).children().attr('data-content'));
    }else{
      $doc_changetext =  $('#docdec' + $doc_change_num).text();
    }
    // console.log($doc_changetext )
    $('#doc-change-input').val($doc_changeinput);
    $('#doc-change-text').val($doc_changetext);
  })
    //点击编辑的确定按钮 
    $('.doc-change-sure').on('click',function(){
      var flag = true;
      var $doc_changeinput = $('#doc-change-input').val().trim();
      var $doc_changetext = $('#doc-change-text').val().trim();
      // 判断编辑内容
      if($doc_changeinput.length == 0 || $doc_changeinput.length > 20 ||  $doc_changetext.length == 0 ||  $doc_changetext.length > 20){
        $('.doc-change-cancel-pat').text('请检查是否正确！');
        flag = false;
     }else{
      flag = true;
      // $('#docname' + $doc_change_num).text( $doc_changeinput);
      $doc_add[$doc_change_num - 1].docname = $doc_changeinput;
      // 判断编辑后的内容是否隐藏
      // if($doc_changetext.length > 8){
      //   $doc_changetext = $doc_changetext.substring(0,5) + '...' + `<a tabindex="0" class="btn doc-detail" role="button" data-toggle="popover" data-trigger="focus" title="${$doc_changeinput}" data-content="${$doc_changetext}">详情</a>`;
      // }
      // $('#docdec' + $doc_change_num).html($doc_changetext);
      $doc_add[$doc_change_num - 1].docdec = $doc_changetext;   
      creat();   
      $('[data-toggle="popover"]').popover();


     }
     if(flag) {
      $(this).attr('data-dismiss','modal');
     }else if (!flag) {
      $(this).attr('data-dismiss','');
     }
     console.log($doc_add);
    })
  // 分页器功能
  
  //点击分页
  $('.doc-pages').on('click',"span",function(){
    $(".doc-pages span").each(function(){
      $(this).attr("id","")
    })
    $(this).attr("id","red");
    $(this)[0].style.color = "#ddd"
    $(this).parent().siblings().children('span').not(this).css('background','').css('color','#D45500');
     index = parseInt($(this).text());
     creat();
  })
  // 点击上一页，
  $('.doc-pre').on('click',function(){
    index = index - 1;
    if(index < 1){
      index = 1
    }
    creat();
    pagination();
    $(".bbb span").each(function(){
      $(this).attr("id","")
      if($(this).text()==index){
        $(this).attr('id','red');
      }
    })
    return false;
  })
  // 下一页
  $('.doc-nex').on('click',function(){
    index = index + 1;
    if(index > Math.ceil($doc_add.length / 5)){
      index = Math.ceil($doc_add.length / 5);
    }
    creat();
    pagination();
    $(".bbb span").each(function(){
      $(this).attr("id","")
      if($(this).text()==index){
        $(this).attr('id','red');
      }
    })
    return false;
  })

  // 动态创建函数
  function creat(){
    $(".doc-table tr:gt(0)").remove();
    for(var i =(index*5)-5;i<$doc_add.length&&i<index*5;i++){
    // 部门人员人数      
      var $doc_depa = $doc_add[i].docname;
      var doc_depa_total = 0;
      for(var j = 0; j < personA.length; j++){
        if(personA[j].department == $doc_depa){
          doc_depa_total++;
        }
      }

    // 部门描述
      var doc_depa_dec = $doc_add[i].docdec;
      var doc_show_dec = '';
      if(doc_depa_dec.length <= 8){
        doc_show_dec = doc_depa_dec;
      }else{
        doc_show_dec = doc_depa_dec.substring(0,5) + '...' + `<a tabindex="0" class="btn doc-detail" role="button" data-toggle="popover" data-trigger="focus" title="${$doc_depa}" data-content="${doc_depa_dec}">详情</a>`;
      }

    // 动态创建
      var $doc_add_line = $(`
      <tr data-num=${i}>
      <td class = 'doc-num'>${i+1}</td>
      <td id="docname`+ (i+1)+`">${$doc_depa}</td>
      <td id="docdec`+ (i+1)+`">${doc_show_dec}</td>
      <td>${doc_depa_total}</td>
      <td style="width:150px">
            <button onclick = "docCheck('${$doc_depa}')" class="table-btn btn-check" data-toggle="modal" data-target = "#personModal">查看人员</button>
      </td>
      <td style="width:200px">
      <input type="button" class="table-btn btn-change doc-change" data-toggle="modal" data-target="#myModal2" value="编辑">
          <input type="button" class="table-btn btn-del doc-del" data-toggle="modal" data-target="#closeModal" value="删除">
      </td>
     </tr>
      `)
    // 加入内容
    $('.doc-table').append($doc_add_line);
   }
   // 确定之后内容为空
   $('#doc-add-input').val('');
   $('#doc-add-text').val('');
 }
  // 构造函数
  function Document(name,dec){
  this.docname = name,
  this.docdec = dec;
  }
  creat();
  pagination();
  $('[data-toggle="popover"]').popover();
  });
  // 分页器
  function pagination(){
    var pageTotal = Math.ceil($doc_add.length / 5);
  
    $(".doc-pages .bbb").remove()
    for(var i = 1; i <= pageTotal; i++){
      var $doc_pages = $(`
      <li class="bbb"><span>${i}</span></li>      
      `)
      $doc_pages.insertBefore($('.doc-next'));
    }
    $('.doc-pages li:eq('+ index + ')').children('span:first-child').attr('id','red');      
    
  }
  // 查看人员函数
  function docCheck (docName){
    $('#person-table tr:gt(0)').remove();
    var arr = [];
   for(var i = 1; i < personA.length; i++){
    if(personA[i].department == docName){
      arr.push(personA[i]);
    }
   }
  //  动态创建函数
  for(var j = 0; j < arr.length; j++){
    var checkLine = $(`
    <tr>
    <td>${j+1}</td>
    <td>${arr[j].name}</td>
    <td>${arr[j].pho}</td>
    <td>${arr[j].state}</td>
</tr>
    `)
  $('#person-table').append(checkLine);

  }
  }
 
 

