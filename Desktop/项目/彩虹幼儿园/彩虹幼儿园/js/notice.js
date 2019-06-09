var pen = {
    index: 1,
    theme_length: true,
    grade_selected: false,
    class_grade_selected: false,
    textarea_input: false,
    url: "",
    name: "",
}

//加载时获取权限值
$("body").mousemove(function () {
    if (parent.window.location.search.split('=')[1] == '0') {
        pen.name = '关羽管理员';
        $("table tr td:nth-child(1) span").each(function () {
            if ($(this).text() == pen.name) {
                $(this).parent().parent().find("input").prop("disabled", false).removeClass("opticy")
            }
        })
        $("#class_grade option:last-child").hide();
        $("#grade option:last-child").hide();

    }
    if (parent.window.location.search.split('=')[1] == '1') {
        pen.name = '张飞老师';
        $("table tr td:nth-child(1) span").each(function () {
            if ($(this).text() == pen.name) {
                $(this).parent().parent().find("input").prop("disabled", false).removeClass("opticy");
            }
        })
        $("#class_grade option:last-child").hide();
        $("#grade option:last-child").hide();

    }
    if (parent.window.location.search.split('=')[1] == '2') {
        pen.name = '刘备园长';
        $("table input").removeClass("opticy");
        $("table input").prop("disabled",false)
        $("#class_grade option:last-child").show();
        $("#grade option:last-child").show();
    }
    isChecked();
})
// 公告管理里的查看/发布切换
$(".read").on("click", function () {
    $(this).addClass("focus")
    $(".send").removeClass("focus")
    $(".send-msg-flat").hide()
    $(".msg-flat").show()
})
$(".send").on("click", function () {
    $(this).addClass("focus")
    $(".read").removeClass("focus")
    $(".send-msg-flat").show()
    $(".msg-flat").hide()
})
// 公告里的搜索功能
$(".icon-search2").on("click", function () {
    // var pat = /^\s+$/; //检查是否全为空格
    var val = $("#searchBox").val().replace(/\s+/g, "");// 去除空格;
    var newMsgs = []
    var element = $(`
    <div style='height:300px;text-align: center;' id="addImg">
    <img style='height:100%' src="../img/sb.png" alt="">
    <div>
`)
    if (val.length > 0) {
        for (var x = 0; x < msgs.length; x++) {
            for (var d in msgs[x]) {
                if ((msgs[x][d]).indexOf(val) > -1) {
                    newMsgs.push(msgs[x]);
                    msgs.splice(x,1);
                    x--;
                    break;
                }
            }
        }
        if (newMsgs.length > 0) {
            msgs =  newMsgs.concat(msgs)
            pen.index = 1;
            showContent(msgs);
            showPaging(msgs);
            initialStyle();
            $("#searchBox").val("")
        } else {
            $("#searchBox").val("")
            $("table").html("");
            $("table").append(element)
        }
    } 
    else {
        $("#searchBox").val("")
        pen.index = 1;
        showContent(msgs);
        showPaging(msgs);
        initialStyle();
    }
})
//公告查看里的刷新按钮
$(".icon-shuaxin").on("click", shuaxin)

function shuaxin() {
    pen.index = 1;
    showContent(msgs);
    showPaging(msgs);
    initialStyle();
}
//公告上下翻页函数
function flipOver() {
    var num = ($(this).attr("id") == "next") ? 1 : -1
    pen.index += num;
    if (pen.index < 1) {
        pen.index = 1
    }
    if (pen.index > Math.ceil(msgs.length / 6)) {
        pen.index = Math.ceil(msgs.length / 6)
    }
    showPaging(msgs);
    $(".paging span").each(function () {
        $(this).removeClass("bg")
    })
    $(".paging").find("span").eq(pen.index - 1).addClass("bg")
    showContent(msgs);
}
//查看上一页
$("#prve").on("click", flipOver)
//公告里查看下一页的按钮
$("#next").on("click", flipOver)
//公告里 tr标签hover时样式
$("table").on("mouseover", "tr", function () {
    $("tr").each(function () {
        $(this).removeClass("bg")
    })
    $(this).addClass("bg")
    $("#length").children(":first-child").text(parseInt($(this).attr("data-num")) + 1)
})
//tr mouseout 时的状态
$("table").on("mouseout", "tr", function () {
    $("tr").each(function () {
        $(this).removeClass("bg")
    })
})
// 消息总览里的详情按钮-出现消息弹框
$("table").on("click", "a", function () {
    var index = parseInt($(this).parent().parent().attr("data-num"));
    $("#ModalDetail p").text(msgs[index].content);
    $("#ModalDetail h4").text(msgs[index].theme)
    $("#ModalDetail .time").text(msgs[index].time)
    $('#ModalDetail').modal();
    var a = $(`
        <a href = "${msgs[index].url}"  download="">下载附件</a>
    `)
    if (msgs[index].file) {
        $("#onloadFile").append(a)
    } else {
        $("#onloadFile").html("")
    }
    return false;
})
//单选框点击
$("table").on("click", "input", function () {
    isChecked();
})
//判断撤回公告的按钮是否显示
function isChecked() {
    var flang = false;
    $("table input").each(function () {
        if ($(this).prop("checked")) {
            flang = true;
        }
    })
    if (flang) {
        $("div.recall").css({
            display: "block",
        })
    } else {
        $("div.recall").css({
            display: "none",
        })
    }
}
//撤回公告
$(".recall-btn").on("click", function () {
    $(".btn-change").on("click", function () { //模态框判定是否执行删除
        $("table input").each(function () { //遍历选中项
            if ($(this).prop("checked")) {
                msgs.splice([parseInt($(this).parent().parent().attr("data-num"))], 1)
                if ((pen.index * 6 - 6) >= msgs.length) {
                    pen.index -= 1;
                }
                showContent(msgs);
                showPaging(msgs);
                isChecked();
                $(".paging span:eq(" + (pen.index - 1) + ")").addClass("bg")
            }
        })
    })
})
//显示公告
showContent(msgs);
//@param : arr 为数组
function showContent(arr) {
    $("table").html("")
    for (var i = (pen.index * 6) - 6; i < arr.length && i < pen.index * 6; i++) {
        // 公告主要内容
        var text = arr[i].content.substring(0, 13)
        var $content = $(`
        <tr class="row" data-num="${i}">
            <td class="col-md-2"> <input type="radio" name="checkbox"><span>${arr[i].name}</span></td>
            <td class="col-md-3"><span class="iconfont icon-star">${arr[i].theme}</span></td>
            <td class="col-md-4">${text}...<a href="#ModalDetail" data-toggle="modal" >详情</a></td>
            <td class="time col-md-3  text-right">${arr[i].time}</td>
        </tr>
        `)
        $("table").append($content)

    }
    totleMsg(arr)
    $("#length").children(":first-child").text(parseInt($("table").children(":first-child").attr("data-num")) + 1)
    if ($("table").height() <= 180) {
        $("table").css({
            height: "180px",
        })
    } else {
        $("table").css({
            height: "auto",
        })
    }
    $("table input").each(function () {
        $(this).prop("disabled", true).addClass("opticy");

    })
}
//公告总数显示
function totleMsg(arry) {
    $("#length i").text(arry.length)
}
//显示分页
showPaging(msgs);

function showPaging(arr) {
    $(".paging p").html("")
    var page_num = Math.ceil(arr.length / 6); //分页页码数
    // 分页页码数内容
    for (var j = 1; j <= page_num; j++) {
        var $paging = $(`
        <span data-num=${j}>${j}</span>
        `)
        $(".paging p").append($paging);
    }
}
//分页被点击时
$("div.paging").on("click", "span", function () {
    $("div.paging span").each(function () {
        $(this).removeClass("bg");
    })
    $(this).addClass("bg")

    pen.index = parseInt($(this).attr("data-num"));
    showContent(msgs);
})

//查看公告的样式初始化
initialStyle();
function initialStyle() {
    $(".paging span:first").addClass("bg")
}
//---------------------------分割线-------------------发送公告面板-------------------------------------------分割线

//主题内容检测
$("#input_wrap input").on("blur", function () {
    var val = $(this).val();
    if (val.length > 20) {
        pen.theme_length = false;
        $(this).addClass("error")
    } else {
        pen.theme_length = true;
    }
})
$("#input_wrap input").on("focus", function () {
    $(this).removeClass("error")
})
//公告发送数据保存
function CreateMsg(name, grade, class_grade, theme, content, file) {
    var tim = new Date().toLocaleString()
    this.name = name; //需要主页面传递
    this.grade = grade;
    this.class_grade = class_grade;
    this.theme = theme;
    this.content = content;
    this.time = tim;
    this.file = file;
    this.url = pen.url
    this.file = file
}
function sendMsg() {
    var pat = /^\s+$/; //检查是否全为空格
    var name = pen.name;
    var grade = $("#grade").val();
    var class_grade = $("#class_grade").val();
    var theme = $("#input").val().replace(/\s+/g, "");// 去除空格;
    if (pat.test(theme) || theme.length == 0) {
        theme = "无主题"
    }
    content = $("#textarea").val().trim();
    file = $("#file").val()
    if (pat.test(file) || file.length == 0) {
        file = "";
    }
    var objMsg = new CreateMsg(name, grade, class_grade, theme, content, file)
    msgs.unshift(objMsg);
}
// 公告发送里的确定按钮
$("#submit").on("click", function (event) {
    event.preventDefault()
    var pat = /^\s+$/; //检查是否全为空格
    var val = $("#textarea").val();//判断文本输入框里的值是否合格
    if (!pat.test(val) && val.length != 0) {
        pen.textarea_input = true;
    } else {
        pen.textarea_input = false;
    }
    if ($("#grade").val() != "请选择年级") {//下拉列表选择年级的值进行判定
        pen.grade_selected = true;
    } else {
        pen.grade_selected = false;
    }
    if ($("#class_grade").val() != "请选择班级") {//下拉列表选择班级
        pen.class_grade_selected = true;
    } else {
        pen.class_grade_selected = false;
    }
    $('#ModalForm').modal();
    if (pen.textarea_input == false) {
        $("#erroMsg").text("请输入正确的公告内容").addClass("red")
    } else {
        $("#erroMsg").text("")
    }
    if (pen.textarea_input == false || pen.class_grade_selected == false || pen.grade_selected == false) {
        $("#ModalFormLabel").text("公告发送失败！").addClass("red").removeClass("gren");
    } else {
        $("#ModalFormLabel").text("公告发送成功！").addClass("gren").removeClass("red");
    }
    if (pen.class_grade_selected == false || pen.grade_selected == false) {
        $("#erroSelect").text("请选择发送对象").addClass("red");
    } else {
        $("#erroSelect").text("").removeClass("red")
    }
    if (pen.class_grade_selected == true && pen.grade_selected == true && pen.textarea_input == true) {
        $("#toRead").show();
        sendMsg();
        $("#textarea").val("");
        $("#input_wrap input").val("");
        $("#file").val("");
        $("#grade").find("option").each(function () {
            $(this).prop("selected", false)
        })
        $("#class_grade").find("option:first-child").prop("selected", true);
    } else {
        $("#toRead").hide();
    }
})
//公告发送里的取消按钮
$("#reset").on("click", function () {
    pen.grade_selected = false;
    pen.class_grade_selected = false;
    pen.textarea_input = false;
})
//发送公告后去查看公告
$("#toRead").on("click", function () {
    $(".read").addClass("focus")
    $(".send").removeClass("focus")
    $(".send-msg-flat").hide()
    $(".msg-flat").show()
    shuaxin();
})
//获取文件路径
function getObjectURL(file) {
    var url = null;
    if (window.createObjcectURL != undefined) {
        url = window.createOjcectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
//使用方法
$("#file").change(function () {
    var file = this.files[0];
    pen.url = getObjectURL(file);
});