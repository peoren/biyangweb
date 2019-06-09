window.onload = function () {
    var staffDates = $(personAll),
        staffAddOne,
        staffm = 0,
        staffn = 0,
        staffDelman,
        staffNameOk = false,
        staffDateOk = false,
        staffSelectJudeSex = false,
        staffSelectJudeDepart = false,
        staffSelectPost = false,
        staffSelectPower = false,
        staffPhoOk = false,
        staffemailOk = false,
        staffResetInfo = false,
        staffChangeState = false,
        staffInfoDelSomevar = false,
        staffNewpage = 0,
        staffDelOne = false,
        staffSeletorAllState = true,
        staffps = 7;
    var staffDelmans = new Array;
    staffCreatFrom();
        //  部门
        $('.staff-add-department').find('select').on('change', function () {

            staffAddChoose = $(".staff-add-department").find('option:selected').text();
    
            switch (staffAddChoose) {
                case '所有部门':
                    var staffSelectArr1 = $(".staff-add-post option")
                    $.each(staffSelectArr1, function (index, item) {
                        $(".staff-add-post option").eq(index).show();
                    })
                    break;
                case '行政部':
                    var staffSelectArr2 = $(".staff-add-post option")
                    $.each(staffSelectArr2, function (index, item) {
                        if (staffSelectArr2[index].text == '书记' || staffSelectArr2[index].text == '秘书' || staffSelectArr2[index].text == '人事专员' || staffSelectArr2[index].text == '所有职务') {
                            $(".staff-add-post option").eq(index).show()
                            console.log(staffSelectArr2[index])
                        } else {
                            $(".staff-add-post option").eq(index).hide()
                        }
                    })
                    break;
                case '财务部':
                    var staffSelectArr2 = $(".staff-add-post option")
                    $.each(staffSelectArr2, function (index, item) {
                        if (staffSelectArr2[index].text == '会计' || staffSelectArr2[index].text == '财务主任' || staffSelectArr2[index].text == '所有职务') {
                            $(".staff-add-post option").eq(index).show()
                            console.log(staffSelectArr2[index])
                        } else {
                            $(".staff-add-post option").eq(index).hide()
                        }
                    })
                    break;
                case '后勤部':
                    var staffSelectArr3 = $(".staff-add-post option")
                    $.each(staffSelectArr3, function (index, item) {
                        if (staffSelectArr3[index].text == '保洁员' || staffSelectArr3[index].text == '保洁队长' || staffSelectArr3[index].text == '所有职务') {
                            $(".staff-add-post option").eq(index).show()
                            console.log(staffSelectArr3[index])
                        } else {
                            $(".staff-add-post option").eq(index).hide()
                        }
                    })
                    break;
                case '后勤部':
                    var staffSelectArr2 = $(".staff-add-post option")
                    $.each(staffSelectArr2, function (index, item) {
                        if (staffSelectArr2[index].text == '保洁员' || staffSelectArr2[index].text == '保洁队长' || staffSelectArr2[index].text == '所有职务') {
                            $(".staff-add-post option").eq(index).show()
                            console.log(staffSelectArr2[index])
                        } else {
                            $(".staff-add-post option").eq(index).hide()
                        }
                    })
                    break;
                case '教育科':
                    var staffSelectArr2 = $(".staff-add-post option")
                    $.each(staffSelectArr2, function (index, item) {
                        if (staffSelectArr2[index].text == '教师' || staffSelectArr2[index].text == '教务主任' || staffSelectArr2[index].text == '年级主任' || staffSelectArr2[index].text == '所有职务') {
                            $(".staff-add-post option").eq(index).show()
                            console.log(staffSelectArr2[index])
                        } else {
                            $(".staff-add-post option").eq(index).hide()
                        }
                    })
                    break;
                case '保卫科':
                    var staffSelectArr2 = $(".staff-add-post option")
                    $.each(staffSelectArr2, function (index, item) {
                        if (staffSelectArr2[index].text == '保安' || staffSelectArr2[index].text == '保安队长' || staffSelectArr2[index].text == '所有职务') {
                            $(".staff-add-post option").eq(index).show()
                            console.log(staffSelectArr2[index])
                        } else {
                            $(".staff-add-post option").eq(index).hide()
                        }
                    })
                    break;
            }
        })
    // 点击添加教职工按钮  遮罩层显示 填写信息表单显示
    $('.staff-btn-add').on('click', function () {
        staffAddReset();
    })
    // 关闭模态框按钮，清楚数据
    $('.staffClose').on('click', function () {
        staffChangeState = false;
        staffAddReset();
    })
    //  重置按钮 清空输入框，选择框
    $('.staff-add-reset').on('click', function () {
        staffResetInfo = true;
        staffAddReset();
    })
    // 选择框防漏选强制选择
    $('.staff-add-sex').on('mouseenter', function () {
        $('.staff-add-sex').find('select').children().first().hide();
    })
    $('.staff-add-sex').on('click', function () {
        $('.staff-add-sex').find('p').hide();
    })
    $('.staff-add-department').on('mouseenter', function () {
        $('.staff-add-department').find('select').children().first().hide();
    })
    $('.staff-add-department').on('click', function () {
        $('.staff-add-department').find('p').hide();
    })
    $('.staff-add-post').on('mouseenter', function () {
        $('.staff-add-post').find('select').children().first().hide();
    })
    $('.staff-add-post').on('click', function () {
        $('.staff-add-post').find('p').hide();
    })
    $('.staff-add-power').on('mouseenter', function () {
        $('.staff-add-power').find('select').children().first().hide();
    })
    $('.staff-add-power').on('click', function () {
        $('.staff-add-power').find('p').hide();
    })
    $('.staff-add-date').on('click', function () {
        $('.staff-add-date').find('p').hide();

    })
    $('#inbirthday').focus(function () {
        $('#inbirthday').css({
            border: '1px solid rgb(156, 155, 155)'
        })
    })
    // 提交按钮 更新date数据
    $('.staff-add-refer').on('click', function () {
        staffSelectJude();
        staffNameJude();
        staffPhoJude();
        staffEmailJude();
        staffDateJude();
        if (staffNameOk && staffDateOk && staffPhoOk && staffemailOk && staffSelectJudeSex && staffSelectJudeDepart && staffSelectPost && staffSelectPower) {
            // 读写教职工信息数据
            staffAddNewdate()
            $('.staffSetNewOne').modal('hide');
        }
    })

    // 判断是否输入日期
    function staffDateJude() {
        if ($('.staff-add-date').find('input').val() == '') {
            $('.staff-add-date').find('p').show();
            staffDateOk = false;
            $('.staff-add-date').find('input').css({
                border: '1px solid red'
            })
        } else {
            staffDateOk = true;
            $('.staff-add-date').find('input').css({
                border: '1px solid rgb(156, 155, 155)'
            })
        }
    }
    // 删除数据
    $('.staff-from-table').on('click', function () {
        staffInfoDel();
    })
    $('.staffSinsdelsome').on('click', function () {
        staffInfoDelSomevar = true;
    })
    // 点击确认关闭模态框 并删除数据
    $('.staff-btn-sure').on('click', function () {
        $('.staffmodal').modal('hide');
        if (staffDelOne) {
            personAll.splice(staffDelman, 1);
            staffDates = $(personAll);
            staffDelOne = false;
        }
        if (staffInfoDelSomevar) {
            staffInfoDelSome();
            staffDates = $(personAll)
            staffInfoDelSomevar = false;
        }
        // 重新渲染数据
        staffCreatFrom();
        if (staffn == 0) {
            staffNewpage -= staffps;
            if (staffNewpage == -staffps) {
                staffNewpage = 0;
                staffGetPagesIndex(0);
                var staffSelectArr1 = $(".staff-filter-derpat select")
                $.each(staffSelectArr1, function (index, item) {
                    staffSelectArr1[index]
                    staffSelectArr1[index].options[0].selected = true;
                    staffSelectArr1[index].options[0].text = '所有部门'
                })
                var staffSelectArr2 = $(".staff-filter-post select")
                $.each(staffSelectArr2, function (index, item) {
                    staffSelectArr2[index]
                    staffSelectArr2[index].options[0].selected = true;
                    staffSelectArr2[index].options[0].text = '所有职务'
                })
                staffCreatpage();
            }
        }
        staffCreatFrom();
    })

    // 筛选操作 部门
    $('.staff-filter-derpat').find('select').on('change', function () {
        staffNewpage = 0;
        staffCreatFrom();

        staffFilterChoose = $(".staff-filter-derpat").find('option:selected').text();

        switch (staffFilterChoose) {
            case '所有部门':
                var staffSelectArr1 = $(".staff-filter-post option")
                $.each(staffSelectArr1, function (index, item) {
                    $(".staff-filter-post option").eq(index).show();
                })
                break;
            case '行政部':
                var staffSelectArr2 = $(".staff-filter-post option")
                $.each(staffSelectArr2, function (index, item) {
                    if (staffSelectArr2[index].text == '书记' || staffSelectArr2[index].text == '秘书' || staffSelectArr2[index].text == '人事专员' || staffSelectArr2[index].text == '所有职务') {
                        $(".staff-filter-post option").eq(index).show()
                        console.log(staffSelectArr2[index])
                    } else {
                        $(".staff-filter-post option").eq(index).hide()
                    }
                })
                break;
            case '财务部':
                var staffSelectArr2 = $(".staff-filter-post option")
                $.each(staffSelectArr2, function (index, item) {
                    if (staffSelectArr2[index].text == '会计' || staffSelectArr2[index].text == '财务主任' || staffSelectArr2[index].text == '所有职务') {
                        $(".staff-filter-post option").eq(index).show()
                        console.log(staffSelectArr2[index])
                    } else {
                        $(".staff-filter-post option").eq(index).hide()
                    }
                })
                break;
            case '后勤部':
                var staffSelectArr2 = $(".staff-filter-post option")
                $.each(staffSelectArr2, function (index, item) {
                    if (staffSelectArr2[index].text == '保洁员' || staffSelectArr2[index].text == '保洁队长' || staffSelectArr2[index].text == '所有职务') {
                        $(".staff-filter-post option").eq(index).show()
                        console.log(staffSelectArr2[index])
                    } else {
                        $(".staff-filter-post option").eq(index).hide()
                    }
                })
                break;
            case '后勤部':
                var staffSelectArr2 = $(".staff-filter-post option")
                $.each(staffSelectArr2, function (index, item) {
                    if (staffSelectArr2[index].text == '保洁员' || staffSelectArr2[index].text == '保洁队长' || staffSelectArr2[index].text == '所有职务') {
                        $(".staff-filter-post option").eq(index).show()
                        console.log(staffSelectArr2[index])
                    } else {
                        $(".staff-filter-post option").eq(index).hide()
                    }
                })
                break;
            case '教育科':
                var staffSelectArr2 = $(".staff-filter-post option")
                $.each(staffSelectArr2, function (index, item) {
                    if (staffSelectArr2[index].text == '教师' || staffSelectArr2[index].text == '教务主任' || staffSelectArr2[index].text == '年级主任' || staffSelectArr2[index].text == '所有职务') {
                        $(".staff-filter-post option").eq(index).show()
                        console.log(staffSelectArr2[index])
                    } else {
                        $(".staff-filter-post option").eq(index).hide()
                    }
                })
                break;
            case '保卫科':
                var staffSelectArr2 = $(".staff-filter-post option")
                $.each(staffSelectArr2, function (index, item) {
                    if (staffSelectArr2[index].text == '保安' || staffSelectArr2[index].text == '保安队长' || staffSelectArr2[index].text == '所有职务') {
                        $(".staff-filter-post option").eq(index).show()
                        console.log(staffSelectArr2[index])
                    } else {
                        $(".staff-filter-post option").eq(index).hide()
                    }
                })
                break;
        }
    })
    // 筛选操作 职务
    $('.staff-filter-post').find('select').on('change', function () {

        staffNewpage = 0;
        staffCreatFrom();
    })
    // 名字检索
    $('.staff-filter-seachName').find('input').blur(function () {
        staffNewpage = 0;
        staffCreatFrom();
    })
    // 正则判断输入框内容是否合法
    // 判断输入的姓名
    $('#inname').focus(function () {
        $('#inname').css('color', 'black');
        $('#inname').css({
            border: ' 1px solid rgb(156, 155, 155)'
        })
        $('#inname').next().hide();
    })
    $('#inname').blur(function () {
        staffNameJude();
    })
    function staffNameJude() {
        var staffNamePat = /^[\u4E00-\u9FA5]{2,10}/,
            staffNewName = $('#inname').val();
        $('#inname').next().hide()
        if (staffNamePat.test(staffNewName)) {
            staffNameOk = true;
        } else {
            staffNameOk = false;
            $('#inname').css({
                border: ' 1px solid red'
            })
            $('#inname').next().show();
        }
    }
    // 判断输入的手机号码
    $('#inpho').focus(function () {
        $('#inpho').css('color', 'black');
        $('#inpho').css({
            border: ' 1px solid rgb(156, 155, 155)'
        })
        $('#inpho').next().hide();
    })
    $('#inpho').blur(function () {
        staffPhoJude();
    })
    function staffPhoJude() {
        var staffPho = /^[1][3,4,5,7,8][0-9]{9}$/,
            staffNewPho = $('#inpho').val();
        if (staffPho.test(staffNewPho)) {
            staffPhoOk = true;

        } else {
            staffPhoOk = false;
            $('#inpho').css({
                border: ' 1px solid red'
            })
            $('#inpho').next().show();
        }
    }
    // 判断输入的邮箱
    $('#inparent').focus(function () {
        $('#inparent').css('color', 'black');
        $('#inparent').css({
            border: ' 1px solid rgb(156, 155, 155)'
        });
        $('#inparent').next().hide();
    })
    $('#inparent').blur(function () {
        staffEmailJude();
    })
    function staffEmailJude() {
        var staffemail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        staffNewemail = $('#inparent').val();
        if (staffemail.test(staffNewemail)) {
            staffemailOk = true;

        } else {
            staffemailOk = false;
            $('#inparent').css({
                border: ' 1px solid red'
            })
            $('#inparent').next().show();
        }
    }
    // 全选按钮操作
    $('.staffSinsAll').on('click', function () {
        staffSeletorAll();
    })
    // 翻页操作
    $('.staffPages').on('click', 'li', function () {
        var index = $('.staffPages li').index(this)
        staffGetPagesIndex(index);
        return false;
    })
    // 数据渲染  动态生成表单
    function staffCreatFrom() {
        // 清除历史节点
        $('.staff-from-table').children().remove();
        $('.staff-from-table').append('<td></td>')
        //  获取数组数据
        staffDates = $(personAll);

        // 按部门筛选
        staffFilterChoose = $(".staff-filter-derpat").find('option:selected').text();
        // 按职务筛选
        staffFilterChoosepost = $(".staff-filter-post").find('option:selected').text();
        // 按姓名筛选
        staffSeach = $('.staff-filter-seachName').find('input').val().replace(/\s+/g, "");
        staffn = 0;
        // 遍历数组
        $.each(staffDates, function (index, value) {
            if (index == 0) {
                $('.staff-from-table').children().last().after(`
                    <tr class='bgs'>
                        <td staffIndex=${index}></td>
                        <td>编号</td>
                        <td>${staffDates[index].name}</td>
                        <td>${staffDates[index].sex}</td>
                        <td>${staffDates[index].pho}</td>
                        <td>${staffDates[index].department}</td>
                        <td>${staffDates[index].post}</td>
                        <td>${staffDates[index].power}</td>
                        <td>${staffDates[index].date}</td>
                        <td>${staffDates[index].email}</td> 
                        <td>操作</td>
                    </tr>
                    `
                )
            } else {
                if (staffDates[index].department != staffFilterChoose && staffFilterChoose != '所有部门') {
                    return true;
                }
                if (staffDates[index].post != staffFilterChoosepost && staffFilterChoosepost != '所有职务') {
                    return true;
                }
                if ((staffDates[index].name.indexOf(staffSeach) == -1) && staffSeach != '') {
                    $('.staff-filter-seachName').find('input').val('')
                    $('.staff-filter-seachName').find('input').attr('placeholder', '点击返回')

                    return true;
                }
                $('.staff-filter-seachName').find('input').attr('placeholder', '请输入姓名');
                staffm++;
                if (staffm > staffNewpage && (staffm < staffNewpage + staffps)) {
                    staffn++;
                    $('.staff-from-table').children().last().after(`
                <tr><td staffIndex=${index}><input type="checkbox" class="staffsins"></td>
                <td>${staffm}</td>
                <td>${staffDates[index].name}</td>
                <td>${staffDates[index].sex}</td>
                <td>${staffDates[index].pho}</td>
                <td>${staffDates[index].department}</td>
                <td>${staffDates[index].post}</td>
                <td>${staffDates[index].power}</td>
                <td>${staffDates[index].date}</td>
                <td>${staffDates[index].email}</td>
                <td style="width:250px">
                <input type="button" class="table-btn btn-change" value="编辑" staffIndex = ${index} data-toggle="modal" data-target="#myModal">
                
                <input type="button" class="table-btn btn-del staff-btn-del" value="删除"
                staffIndex = ${index} data-toggle="modal" data-target="#closeModal">
                </td>
                </tr>
                `
                    )
                }
            }
        })
        if ($('.staff-from-table').children().length == 2) {
            $('.staff-from-table').parent().after(`
            <div style='height:400px;text-align: center;' class='table-body'><img style='height:100%' src="../img/sb.png" alt=""><div>
            `)
        } else {
            var staffDelImg = $('.staff-from-table').parent().parent().children()
            $.each(staffDelImg, function (index, item) {
                $('.staff-from-table').parent().parent().children().eq(1).remove()
            })
        }
        staffCreatpage();
        staffm = 0;
        $('.staff-from-table').children().first().remove();

    }
    // 读取数据写入数据库
    function staffAddNewdate() {

        staffAddOne = {
            name: $('.staff-add-name').find('input').val(),
            sex: $(".staff-add-sex option:selected").text(),
            pho: $('.staff-add-pho').find('input').val(),
            department: $(".staff-add-department option:selected").text(),
            post: $(".staff-add-post option:selected").text(),
            power: $(".staff-add-power option:selected").text(),
            date: $('.staff-add-date').find('input').val(),
            email: $('.staff-add-email').find('input').val()
        }

        if (staffChangeState) {
            personAll.splice(staffDelman, 1, staffAddOne);
            staffChangeState = false;
        } else {
            personAll.push(staffAddOne);
        }

        // 选择框 输入框重置
        staffAddReset();
        // 将录入的数据写入公共数据js
        staffDates = $(personAll)
        staffCreatFrom();

    }
    // 全选功能
    function staffSeletorAll() {
        staffSeletorAllState = !staffSeletorAllState;
        $.each($('.staffsins'), function (index, value) {
            if (staffSeletorAllState) {
                $('.staffsins')[index].checked = false;
            } else {
                $('.staffsins')[index].checked = true;
            }
        })
    }

    // 删除信息 和 编辑信息 函数
    function staffInfoDel() {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.getAttribute('staffIndex') != null && target.value == '删除') {
            staffDelOne = true;
            staffDelman = target.getAttribute('staffIndex');

        } else if (target.getAttribute('staffIndex') != null && target.value == '编辑') {
            staffDelman = target.getAttribute('staffIndex');
            staffChangeState = true;
            staffAddReset();

        }
    }
    //  多选删除数据
    function staffInfoDelSome() {
        var staffFromTableTrDel = $('.staff-from-table').children().find("input[type='checkbox']");
        for (var i = 0; i <= staffFromTableTrDel.length; i++) {
            if ($('.staff-from-table').children().eq(i).find('input').prop('checked') == true) {
                staffDelmans.push($('.staff-from-table').children().eq(i).children().first().attr('staffIndex'));
            }
        }
        for (var j = staffDelmans.length - 1; j >= 0; j--) {
            personAll.splice(staffDelmans[j], 1);
        }
        staffDelmans = [];
    }
    // 动态生成翻页按钮
    function staffCreatpage() {
        var stafffornum = $('.staffPages li').length - 1;
        for (var i = 1; i < stafffornum; i++) {
            $('.staffPages li').eq(1).remove();
        }
        var staffPagesLiLength = Math.ceil(staffm / staffps);
        for (i = 0; i < staffPagesLiLength; i++) {
            $('.staffPages').children().first().after(`
                    <li><span>${staffPagesLiLength - i}</span></li>
                    `)
        }
        $('.staffPages').children().eq(Math.ceil(staffNewpage / staffps + 1)).find('span').css({
            background: '#D45500',
            color: 'white',
        })
        $('.staffPages').children().last().find('span').css({
            background: 'white',
            color: '#D45500',
        })
    }
    // 获取翻页下标并传值，重新渲染
    function staffGetPagesIndex(staffIndex) {
        if (staffIndex == 0) {
            staffNewpage -= staffps;
            if (staffNewpage < 0) {
                staffNewpage = 0;
            }
        } else if (staffIndex == $('.staffPages li').length - 1) {
            staffNewpage += staffps;
            if (staffNewpage > ($('.staffPages li').length - 3) * staffps) {
                staffNewpage = ($('.staffPages li').length - 3) * staffps;
            }
        } else if (staffIndex > 0 && staffIndex < $('.staffPages li').length - 1) {
            staffNewpage = (staffIndex - 1) * staffps;
        }
        staffCreatFrom();
    }

    // 输入框 选择框 初始值设置      staffChangeState 用于确认是否点击<编辑>按钮
    function staffAddReset() {
        $('#inname').next().hide();
        $('#inpho').next().hide();
        $('#inparent').next().hide();
        $('.staff-add-sex').find('p').hide();
        $('.staff-add-department').find('p').hide();
        $('.staff-add-post').find('p').hide();
        $('.staff-add-power').find('p').hide();
        $('.staff-add-date').find('p').hide();
        $('#inname').css({
            border: ' 1px solid rgb(156, 155, 155)'
        });
        $('#inpho').css({
            border: ' 1px solid rgb(156, 155, 155)'
        });
        $('#inparent').css({
            border: ' 1px solid rgb(156, 155, 155)'
        });
        $('#inbirthday').css({
            border: ' 1px solid rgb(156, 155, 155)'
        });
        if (!staffResetInfo && staffChangeState) {
            $('.staff-add-name').find('input').val($(personAll)[staffDelman].name);
            $(".staff-add-sex option:selected").text($(personAll)[staffDelman].sex);
            $('.staff-add-pho').find('input').val($(personAll)[staffDelman].pho);
            $(".staff-add-department option:selected").text($(personAll)[staffDelman].department);
            $(".staff-add-post option:selected").text($(personAll)[staffDelman].post);
            $(".staff-add-power option:selected").text($(personAll)[staffDelman].power);
            $('.staff-add-email').find('input').val($(personAll)[staffDelman].email);
            $('.staff-add-date').find('input').val($(personAll)[staffDelman].date);
        } else {

            $('.staff-add-power').find('select').children().first().show();
            $('.staff-add-post').find('select').children().first().show();
            $('.staff-add-sex').find('select').children().first().show();
            $('.staff-add-department').find('select').children().first().show();

            $('.staff-add-name').find('input').val('');

            var staffSelectArr = $(".staffSetNewOne select")
            $.each(staffSelectArr, function (index, item) {
                staffSelectArr[index]
                staffSelectArr[index].options[0].selected = true;
                staffSelectArr[index].options[0].text = '请选择'
            })
            $("staffSetNewOne select").find("option:first").prop("selected", true);
            $('.staff-add-pho').find('input').val('');
            $('.staff-add-email').find('input').val('');
            $('.staff-add-date').find('input').val('');
        }
        staffResetInfo = false;
        staffSelectJudeSex = false;
        staffSelectJudeDepart = false;
        staffSelectPost = false;
        staffSelectPower = false;
    }
    function staffSelectJude() {

        if ($('.staff-add-sex option:selected').text() == '请选择') {
            $('.staff-add-sex').find('p').show();
            staffSelectJudeSex = false;
        } else {
            staffSelectJudeSex = true;
        }

        if ($('.staff-add-department option:selected').text() == '请选择') {
            $('.staff-add-department').find('p').show();
            staffSelectJudeDepart = false;
        } else {
            staffSelectJudeDepart = true;
        }

        if ($('.staff-add-post option:selected').text() == '请选择') {
            $('.staff-add-post').find('p').show();
            staffSelectPost = false;
        } else {
            staffSelectPost = true;
        }

        if ($('.staff-add-power option:selected').text() == '请选择') {
            $('.staff-add-power').find('p').show();
            staffSelectPower = false;
        } else {
            staffSelectPower = true;
        }
    }
}