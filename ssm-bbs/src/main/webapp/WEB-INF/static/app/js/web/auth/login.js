$(function(){

    var login = $("#loginForm").validate({
        rules: {
            captcha: {
                required: true,
                minlength: [4],
                maxlength: [4],
                remote: {
                    url: "/login/check",
                    type: 'post',
                    data: {
                        'captcha': function () { return $('#captcha').val(); }
                    }
                }
            },
            password: {
                required: true
            },
            username: {
                required: true
            }
        },
        messages: {
            captcha: {
                remote: "验证码输入有误！"
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            form.submit();
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });

});