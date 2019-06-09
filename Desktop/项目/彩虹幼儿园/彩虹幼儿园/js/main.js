$(function() {
    // 动态改变主页的时间
    function mainTime() {
        var myTime = new Date();
        var hour = myTime.getHours();
        var min = myTime.getMinutes();
        $('.hour').text(hour + ':' + min);
        if(hour > 0 && hour < 12) {
            $('.pm').text('AM');
        }else {
            $('.pm').text('PM');
        }
        var dayArr = ['Monday','Tuerday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        var monthArr = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']
        var month = myTime.getMonth();
        var day = myTime.getDay();
        $('.day').text(dayArr[day-1]);
        $('.month').text(monthArr[month]);
        $('.date').text(myTime.getDate());
    }
    setInterval(mainTime,1000);

    // 点击事件
    $('.noti').click(function() {
        location = 'notice.html';
        return false;
    })
    $('.moreA').click(function() {
        location = 'notice.html';
        return false;
    })
    $('.student').click(function() {
        location = 'student.html';
        return false;
    })
    $('.staff').click(function() {
        location = 'staff.html';
        return false;
    })
    $('.class').click(function() {
        location = 'class.html';
        return false;
    })

    


})