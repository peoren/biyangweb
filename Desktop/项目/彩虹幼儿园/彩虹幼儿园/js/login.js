$(function(){


    $('#button').on('click', function(){
        var  $userID = $('#userID').val();
        var  $userPassword = $('#userPassword').val();
        var $flag = false;
            if(($userID == data.users[0].userName && $userPassword == getCookie('pass1'))||($userID == data.users[1].userName && $userPassword == getCookie('pass2'))||($userID == data.users[2].userName && $userPassword == getCookie('pass3'))){
                
                $flag = !$flag;
                if($('#userID').val() == 'admin') {
                    location.href = 'home.html?userPower='+data.users[0].userPower;
                }else if($('#userID').val() == 'teacher') {
                    location.href = 'home.html?userPower='+data.users[1].userPower;
                }else if($('#userID').val() == 'master') {
                    location.href = 'home.html?userPower='+data.users[2].userPower;
                }
                return;
            }
        
        if($userID == '' ||$userPassword == '' ){
            $('.err').css('display','block');
            $('.err').text('账号或密码不能为空');
        }else if(!$flag){
            $('.err').css('display','block');
            $('.err').text('密码不正确');
            // $('#userID').val('');
            $('#userPassword').val(''); 
        }
    })
})