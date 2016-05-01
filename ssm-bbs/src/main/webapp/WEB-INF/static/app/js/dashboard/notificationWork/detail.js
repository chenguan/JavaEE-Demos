$(function(){
    $('#content-service').addClass('active open');
    $('#notification_work').addClass('active');

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("回执发送失败。");
        }
        else
        {
            Notify.success("回执发送成功。");
        }
    };

    $('a[data-role=send-read-receipt]').on('click', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');

        if (confirm('确定发送已读回执吗？')) {
            $.post(
                target,
                {
                    body: "已读"
                },
                function(){
                    $('a[data-role=send-read-receipt]').remove();
                    $('a[data-toggle=modal]').remove();
                    $('#receipt-arrowed').removeClass('hide');
                }
            ).success(showNotify)
        }
    });

});