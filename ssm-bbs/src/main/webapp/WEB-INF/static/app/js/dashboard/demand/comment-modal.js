$(function(){

    $('textarea.limited').inputlimiter({
        remText: '还可以输入 %n ，',
        limitText: '最多允许 %n 个字。'
    });

    var $form = $('#comment-form');
    var $modal = $form.parents('.modal');

    $('button[type=submit]').click(function() {
        var submitButton = $(this);
        var status = submitButton.data('status');

        if ($('#note').val().trim() == '') {
            //Notify.info('请输入受理意见！');
            $("#errorMsg").show();
            return false;
        }

        $('#form_status').val(status);

        $.post(
            $form.attr('action'),
            $form.serialize(),
            function(html){
                //$modal.modal('hide');
                //$('a[data-toggle=modal]').remove();
                //var $span = $(html);
                //$('#demand-status').find("span").replaceWith($span);
                //Notify.success("诉求受理完成。");
                window.location.href = window.location.href;
            }, 'html'
        ).error(function (data, textstatus) {
            $modal.modal('hide');
            Notify.error("服务器内部错误，请稍后再试。");
        });

        return false;

    });

});