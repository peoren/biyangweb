$(function() {
    var sexFlag ;
    var cultureFlag ;
    $('.d:eq(0)').addClass('clia');
    $('.ul li:eq(0)').addClass('clickLi');
    // 判断进来的权限
    var search = location.search.split('=')[1];
    if(search == 0) {
        $('.chen').text('关羽管理员');
    }else if(search == 1) {
        $('.chen').text('张飞老师');
    }else if(search == 2) {
        $('.chen').text('刘备园长');
    }
    $('.block-menu a').click(function() {
        return false;
    })
    // 点击个人中心动态获得数据库的数据
    $('.chen').click(function() {
        $('form p').hide();
        $('#sex option').prop('selected',false);
        $('#culture option').prop('selected',false);
        $('#password').prop('disabled',true);
        $('#sure').prop('disabled',true);
        $('#no').prop('checked',true);
        $('input').css('border','')
        // $('#explain').text('');
        if(search == 0) {
            $('#name').val(data.centerArr[search].name);
            $('#sex option:eq('+ data.centerArr[search].sex + ')').prop('selected',true);
            $('#iden').val(data.centerArr[search].iden);
            $('#office option:eq('+ data.centerArr[search].office + ')').attr('selected',true);
            $('#school').val(data.centerArr[search].school);
            $('#culture option:eq('+ data.centerArr[search].culture + ')').prop('selected',true);
            $('#subject option:eq('+ data.centerArr[search].subject + ')').attr('selected',true);
            $('#phone').val(data.centerArr[search].phone);
            $('#email').val(data.centerArr[search].email);
            $('#password').val(getCookie('pass1'));
            $('#sure').val(getCookie('pass1'));
            $('#explain').val(data.centerArr[search].explain);
        }else if(search == 1) {
            $('#name').val(data.centerArr[search].name);
            $('#sex option:eq('+ data.centerArr[search].sex + ')').prop('selected',true);
            $('#iden').val(data.centerArr[search].iden);
            $('#office option:eq('+ data.centerArr[search].office + ')').attr('selected',true);
            $('#school').val(data.centerArr[search].school);
            $('#culture option:eq('+ data.centerArr[search].culture + ')').prop('selected',true);
            $('#subject option:eq('+ data.centerArr[search].subject + ')').attr('selected',true);
            $('#phone').val(data.centerArr[search].phone);
            $('#email').val(data.centerArr[search].email);
            $('#password').val(getCookie('pass2'));
            $('#sure').val(getCookie('pass2'));
            $('#explain').val(data.centerArr[search].explain);
        }else if(search == 2) {
            $('#name').val(data.centerArr[search].name);
            $('#sex option:eq('+ data.centerArr[search].sex + ')').prop('selected',true);
            $('#iden').val(data.centerArr[search].iden);
            $('#office option:eq('+ data.centerArr[search].office + ')').attr('selected',true);
            $('#school').val(data.centerArr[search].school);
            $('#culture option:eq('+ data.centerArr[search].culture + ')').prop('selected',true);
            $('#subject option:eq('+ data.centerArr[search].subject + ')').attr('selected',true);
            $('#phone').val(data.centerArr[search].phone);
            $('#email').val(data.centerArr[search].email);
            $('#password').val(getCookie('pass3'));
            $('#sure').val(getCookie('pass3'));
            $('#explain').val(data.centerArr[search].explain);
        }
    })
    $('.who').text($('.chen').text());




    // 表单验证
    var idFlag = true,phoneFlag = true,sureFlag = true,emailFlag = true,nameFlag = true,schoolFlag = true;
    var idExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var phoneExp = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var emailExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        // 身份证
    $('#iden').blur(function() {
        if(idExp.test($('#iden').val())) {
            $('.idErr')
            .hide()
            idFlag = true;
            $('#iden').css('border','');
        }else {
            $('.idErr')
            .show()
            .text('请输入正确的身份证号码')
            .addClass('err');
            idFlag = false;
            $('#iden').css('border','1px solid red');
        }
    })

    // 名字
    $('#name').blur(function() {
        if($('#name').val().trim() != '') {
            $('.nameErr')
            .hide()
            nameFlag = true;
            $('#name').css('border','');
        }else {
            $('.nameErr')
            .show()
            .text('名字不能为空')
            .addClass('err');
            nameFlag = false;
            $('#name').css('border','1px solid red');
        }
    })

    // 学校
    $('#school').blur(function() {
        if($('#school').val().trim() != '') {
            $('.schoolErr')
            .hide()
            schoolFlag = true;
            $('#school').css('border','');
        }else {
            $('.schoolErr')
            .show()
            .text('请输入学校名称')
            .addClass('err');
            schoolFlag = false;
            $('#school').css('border','1px solid red');
        }
    })
    // 手机号
    $('#phone').blur(function() {
        if(phoneExp.test($('#phone').val())) {
            $('.phoneErr')
            .hide()
            phoneFlag = true;
            $('#phone').css('border','');
        }else {
            $('.phoneErr')
            .show()
            .text('号码格式不正确')
            .addClass('err');
            phoneFlag = false;
            $('#phone').css('border','1px solid red');
        }
    })

    // 邮箱
    $('#email').blur(function() {
        if(emailExp.test($('#email').val())) {
            $('.emailErr')
            .hide()
            emailFlag = true;
            $('#email').css('border','');
        }else {
            $('.emailErr')
            .show()
            .text('请输入正确的邮箱')
            .addClass('err');
            emailFlag = false;
            $('#email').css('border','1px solid red');
        }
    })

    // 确认密码
    $('#password').blur(function() {
        if($(this).val() == $('#sure').val() && $(this).val() != '') {
            $('.sureErr')
            .hide()
            sureFlag = true;
            $('#password').css('border','');
            $('#sure').css('border','');
        }else if($(this).val() != $('#sure').val()) {
            $('.sureErr')
            .show()
            .text('修改密码和确认密码不一致')
            .addClass('err');
            sureFlag = false;
            $('#password').css('border','1px solid red');
        }else if($(this).val() == '') { 
            $('.sureErr')
            .show()
            .text('密码不能为空')
            .addClass('err');
            sureFlag = false;
            $('#password').css('border','1px solid red');
        }
    })
    $('#sure').blur(function() {
        if($(this).val() == $('#password').val() && $(this).val() != '') {
            $('.sureErr')
            .hide()
            sureFlag = true;
            $('#password').css('border','');
            $('#sure').css('border','');
        }else if($(this).val() != $('#password').val()) {
            $('.sureErr')
            .show()
            .text('修改密码和确认密码不一致')
            .addClass('err');
            sureFlag = false;
            $('#sure').css('border','1px solid red');
        }else if($(this).val() == '') { 
            $('.sureErr')
            .show()
            .text('密码不能为空')
            .addClass('err');
            sureFlag = false;
            $('#sure').css('border','1px solid red');
        }
    })
    $('.gb').click(function() {
        idFlag = true,phoneFlag = true,sureFlag = true,emailFlag = true,nameFlag = true,schoolFlag = true;
    })

    // 点击是否按钮时

    $('#yes').click(function() {
        $('#password').prop('disabled',false);
        $('#sure').prop('disabled',false);
    })
    $('#no').click(function() {
        $('#password').prop('disabled',true);
        $('#sure').prop('disabled',true);
        if(search == 0) {
            $('#password').val(getCookie('pass1'));
            $('#sure').val(getCookie('pass1'));
        }else if(search == 1) {
            $('#password').val(getCookie('pass2'));
            $('#sure').val(getCookie('pass2'));
        }else if(search == 2) {
            $('#password').val(getCookie('pass3'));
            $('#sure').val(getCookie('pass3'));
        }

        $('.sureErr')
            .hide()
            sureFlag = true;
        $('#sure').css('border','');
        $('#password').css('border','');
    })
    // 点击保存时保存数据到数据库
    $('.save').click(function() {
        if(idFlag&&phoneFlag&&emailFlag&&sureFlag&&nameFlag&&schoolFlag) {
            if(search == 0) {
                $('#sex option').each(function() {
                    if($(this).prop('selected')) {
                        sexFlag = Number($(this).attr('flag'));
                    }
                }) 
                $('#culture option').each(function() {
                    if($(this).prop('selected')) {
                        cultureFlag = Number($(this).attr('flag'));
                    }
                })
                data.centerArr[search].name = $('#name').val();
                data.centerArr[search].sex = sexFlag;
                data.centerArr[search].iden = $('#iden').val();
                data.centerArr[search].school = $('#school').val();
                data.centerArr[search].culture = cultureFlag;
                data.centerArr[search].phone = $('#phone').val();
                data.centerArr[search].email = $('#email').val();
                document.cookie = 'pass1=' + $('#password').val();
                data.centerArr[search].explain = $('textarea').val();
                console.log(data.centerArr[search].sex)
            }else if(search == 1) {
                $('#sex option').each(function() {
                    if($(this).prop('selected')) {
                        sexFlag = Number($(this).attr('flag'));
                    }
                }) 
                $('#culture option').each(function() {
                    if($(this).prop('selected')) {
                        cultureFlag = Number($(this).attr('flag'));
                    }
                })
                data.centerArr[search].name = $('#name').val();
                data.centerArr[search].sex = sexFlag;
                data.centerArr[search].iden = $('#iden').val();
                data.centerArr[search].school = $('#school').val();
                data.centerArr[search].culture = cultureFlag;
                data.centerArr[search].phone = $('#phone').val();
                data.centerArr[search].email = $('#email').val();
                document.cookie = 'pass2=' + $('#password').val();
                data.centerArr[search].explain = $('textarea').val();
            }else if(search == 2) {
                $('#sex option').each(function() {
                    if($(this).prop('selected')) {
                        sexFlag = Number($(this).attr('flag'));
                    }
                }) 
                $('#culture option').each(function() {
                    if($(this).prop('selected')) {
                        cultureFlag = Number($(this).attr('flag'));
                    }
                })
                data.centerArr[search].name = $('#name').val();
                data.centerArr[search].sex = sexFlag;
                data.centerArr[search].iden = $('#iden').val();
                data.centerArr[search].school = $('#school').val();
                data.centerArr[search].culture = cultureFlag;
                data.centerArr[search].phone = $('#phone').val();
                data.centerArr[search].email = $('#email').val();
                document.cookie = 'pass3=' + $('#password').val();
                data.centerArr[search].explain = $('textarea').val();
            }
            $(this).attr('data-dismiss','modal');
        }else {
            $(this).attr('data-dismiss','');
        }
        
    })

    // 退出
    $('.sureBack').click(function() {
        rank = [];
        location='login.html';
    })
    // 点击停留背景
    var clickFlag;
    for (var i = 0; i < $('.ul li').length;i++) {
        $('.three-d')[i].index = i;
        $('.three-d')[i].onclick = function() {
            for (var j = 0; j < $('.ul a').length;j++) {
                $('.three-d-box')[j].classList.remove('clia');
                $('.front')[j].classList.remove('clib');
                $('.backs')[j].classList.remove('clic');
                $('.three-d')[j].classList.remove('clid');
            }
            $('.three-d-box')[this.index].classList.add('clia');
            $('.front')[this.index].classList.add('clib');
            $('.backs')[this.index].classList.add('clic');
            $('.three-d')[this.index].classList.add('clid');
        }
    }
    var rank = [];
    // 根据权限不同显示不同的页面
    if(search == 0) {
        for(var i = 0; i < data.manage[0].length;i++) {
            rank.push(data.manage[0][i]);
        }
        $('.ul li').hide();
        for(var i = 0; i < rank.length;i++ ) {
            $('.ul li')[i].style.display = 'block';
        }
    }else if(search == 1) {
        for(var i = 0; i < getCookie('manage1').split('').length;i++) {
            rank.push( Number(getCookie('manage1').split('')[i]));
        }
        $('.ul li').css('display','none');
        for(var i = 0; i < rank.length;i++ ) {
            $('.ul li')[rank[i]].style.display = 'block';
        }
    }else if(search == 2) {
        for(var i = 0; i < getCookie('manage2').split('').length;i++) {
            rank.push(Number(getCookie('manage2').split('')[i]));
        }
        $('.ul li').css('display','none');
        for(var i = 0; i < rank.length;i++ ) {
            $('.ul li')[rank[i]].style.display = 'block';
        }
        console.log(rank)
    }


    // 进入不同的内联框架
    $('.main').click(function() {
        $('#ifm').attr('src','main.html');
        
    })
    $('.manage').click(function() {
        $('#ifm').attr('src','manage.html');
    })
    $('.notice').click(function() {
        $('#ifm').attr('src','notice.html');
    })
    $('.check').click(function() {
        $('#ifm').attr('src','check.html');
    })
    $('.student').click(function() {
        $('#ifm').attr('src','student.html');
    })
    $('.documents').click(function() {
        $('#ifm').attr('src','document.html');
    })
    $('.staff').click(function() {
        $('#ifm').attr('src','staff.html');
    })
    $('.photoWall').click(function() {
        $('#ifm').attr('src','photoWall.html');
    })
    $('.classes').click(function() {
        $('#ifm').attr('src','class.html');
    })
})


    
    
