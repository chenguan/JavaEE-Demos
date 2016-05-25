$(function(){

    $('textarea.limited').inputlimiter({
        remText: '还可以输入 %n ，',
        limitText: '最多允许 %n 个字。'
    });

    var $form = $('#receipt-form');
    var $modal = $form.parents('.modal');

    $('button[type=submit]').click(function() {
        var submitButton = $(this);

        if ($('#body').val().trim() == '') {
            $("#errorMsg").show();
            return false;
        }

        $.post(
            $form.attr('action'),
            $form.serialize(),
            function(html){
                window.location.href = window.location.href;
            }, 'html'
        ).error(function (data, textstatus) {
                $modal.modal('hide');
                Notify.error("服务器内部错误，请稍后再试。");
            });

        return false;

    });

});