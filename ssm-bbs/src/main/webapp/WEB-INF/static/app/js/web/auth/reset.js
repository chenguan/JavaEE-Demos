$(function(){

    var register = $("#registerForm").validate({
        rules: {
            username: {
                required: true,
                isUsername: true,
                rangelength: [5,30],
                remote: {
                    url: ctx + "/validator/username2",
                    type: 'post',
                    data: {
                        'username': function () { return $('#username').val()},
                        'origin_username': function () { return $('#origin_username').val(); }
                    }
                }
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: ctx + "/validator/email2",
                    type: 'post',
                    data: {
                        'email': function () { return $('#email').val(); },
                        'origin_email': function () { return $('#origin_email').val(); }
                    }
                }
            },
            mobile: {
                required: true,
                isMobile: true,
                remote: {
                    url: ctx + "/validator/mobile2",
                    type: 'post',
                    data: {
                        'mobile': function () { return $('#mobile').val(); },
                        'origin_mobile': function () { return $('#origin_mobile').val(); }
                    }
                }
            },
            password: {
                required: true,
                isPassword: true
            },
            repeatPassword: {
                required: true,
                equalTo: "#password"
            },
            captcha: {
                required: true
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

    var validCode = true;
    $("#validateCode").click(function () {

        if(!register.element("#mobile"))
            return false;

        var time = 120;
        var code = $(this);
        if (validCode) {
            validCode = false;
            code.attr("disabled", "true");

            $.post("/validator/code",
                {
                    mobile: $('#mobile').val()
                }, function(response){
                    if(response == "false") {
                        Notify.error("短信发送失败");
                    }
                }, "text");

            var t = setInterval(function () {
                time--;
                code.html(time + "秒");
                if (time == 0) {
                    clearInterval(t);
                    code.html("<i class='ace-icon fa fa-mobile bigger-130'></i>" + "重新获取");
                    validCode = true;
                    code.removeAttr("disabled");
                }
            }, 1000)
        }
    });
});