$(function(){
    $('#public-service-accept').addClass('active open');
    $('#user_approval').addClass('active');

    $(".btn-success").click(function(){
        var $trigger = $(this);
        var target = $trigger.data('url');
        var title = $trigger.attr("title");

        if (confirm('确定 ' + title + ' 通过审核吗？')) {
            $trigger.text('提交中...');
            $('.btn').attr('disabled', 'disabled');
            $.post(target, function(response){
                if(response.status == 'fail'){
                    Notify.error("该企业邮箱没有激活，无法接收邮件。");
                    $('.btn').removeAttr("disabled");
                    $trigger.text('通过');
                } else {
                    window.location.href = window.location.href;
                }
                //$('.btn-xs').remove();
                //Notify.success("审核成功。");
            }, 'json');
        }
    });

});