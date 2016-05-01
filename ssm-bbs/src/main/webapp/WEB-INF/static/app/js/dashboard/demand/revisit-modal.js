$(function(){

    $('textarea.limited').inputlimiter({
        remText: '还可以输入 %n ，',
        limitText: '最多允许 %n 个字。'
    });


    var $form = $('#review-form');
    var $modal = $form.parents('.modal');

    var showNotify = function(html) {
        window.location.href = window.location.href;
    };

    $form.validate({
        rules: {
            content: {
                required: true
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $(form).ajaxSubmit({
                success: showNotify,
                error: function(data,textstatus){
                    $modal.modal('hide');
                    Notify.error("服务器内部错误，请稍后再试。");
                }
            });
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });


});