$(function(){

    $('#user-settings-2').addClass('active open');
    $('#user-settings-password').addClass('active');

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("修改失败。");
        }
        else
        {
            Notify.success("修改成功。");
            $(".form-control").val("");
        }
    };

    var showNotify2 = function(response) {
        if(response.status == 'fail'){
            Notify.error("邮件地址不正确。");
        }
        else
        {
            Notify.success("邮件发送成功，请到邮箱点击激活链接确认修改。");
            $(".form-control").val("");
        }
    };

    $('#change-password-form').validate({
        rules: {
            password: {
                required: true,
                isPassword: true
            },
            repeatPassword: {
                required: true,
                equalTo: "#password"
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $(form).ajaxSubmit({
                dataType : 'json',
                success: showNotify,
                error: function(data,textstatus){
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

    var changeMobile = $("#change-mobile-form").validate({
        rules: {
            origin_mobile: {
                required: true,
                isMobile: true,
                remote: {
                    url: "/validator/mobile4",
                    type: 'post',
                    data: {
                        'mobile': function () { return $('#origin_mobile').val(); }
                    }
                }
            },
            mobile: {
                required: true,
                isMobile: true,
                remote: {
                    url: "/validator/mobile",
                    type: 'post',
                    data: {
                        'mobile': function () { return $('#mobile').val(); }
                    }
                }
            },
            captcha: {
                required: true
            }
        },
        messages: {
            origin_mobile: {
                remote: "该手机号码没找到！"
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $(form).ajaxSubmit({
                dataType : 'json',
                success: showNotify,
                error: function(data,textstatus){
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

    var validCode = true;
    $("#validateCode").click(function () {

        if(!changeMobile.element("#origin_mobile") || !changeMobile.element("#mobile"))
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

    $('#change-email-form').validate({
        rules: {
            email: {
                required: true,
                email: true,
                remote: {
                    url: "/validator/email3",
                    type: 'post',
                    data: {
                        'email': function () { return $('#email').val(); },
                        'origin_email': function () { return $('#origin_email').val(); }
                    }
                }
            }
        },
        messages: {
            email: {
                remote: "邮箱地址已使用！"
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $(form).ajaxSubmit({
                dataType : 'json',
                success: showNotify2,
                error: function(data,textstatus){
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