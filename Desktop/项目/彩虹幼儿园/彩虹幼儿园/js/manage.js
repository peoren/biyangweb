$(function() {
    $('input').prop('disabled',true);

    $('.btn-all').click(function() {
        $('input').prop('checked',true);
    })

    // 改变下拉框时勾选不同的权限
    $('#role').change(function() {
        if($('#role option:selected').text() == '园长') {

            $('input').prop('disabled',false);
            $('input').prop('checked',false)
            for(var i = 0; i < getCookie('manage2').split('').length;i++) {
                $('input:eq('+ Number(getCookie('manage2').split('')[i]) + ' )').prop('checked',true);
            }
        }
        if($('#role option:selected').text() == '管理员') {
            $('input').prop('checked',true);
            $('input').prop('disabled',true);
        }
        if($('#role option:selected').text() == '老师') {
            $('input').prop('disabled',false);
            $('input').prop('checked',false)
            for(var i = 0; i < getCookie('manage1').split('').length;i++) {
                $('input:eq('+ Number(getCookie('manage1').split('')[i]) + ' )').prop('checked',true);
            }
        }
    })

    // 确认保存时更新cookie值
    

    $('#btn-change').click(function() {
        var cookArr = [];
        if($('#role option:selected').text() == '老师') {
            $('.choose-power-main input').each(function(i,e) {
                if($(this).prop('checked')) {
                    cookArr.push(i);
                }
            })
            document.cookie = 'manage1=' + cookArr.join('') ;
            console.log(document.cookie)
        }
        if($('#role option:selected').text() == '园长') {
            $('.choose-power-main input').each(function(i,e) {
                if($(this).prop('checked')) {
                    cookArr.push(i);
                }
            })
            document.cookie = 'manage2=' + cookArr.join('') ;
            console.log(document.cookie)
        }
        
    })

})