$(function() {
    $('#public-service').addClass('active open');
    $('#public-service-' + type).addClass('active');
    var $form = $('#supply-create-form');

    $form.validate({
        rules: {
            title: {
                required: true,
                rangelength: [1, 100]
            },
            content: {
                required: true,
                rangelength: [1, 1000]
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            var value = $.trim($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html());
            alert(value);
            if(value == ""){
                Notify.error("正文必须填写！");
                return;
            }
            form.submit();
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        },
        focusInvalid : false,
        onfocusout: false,
        errorElement: "span",
        errorClass: "error"
    });
});