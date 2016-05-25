$(function(){

    var register = $("#registerForm").validate({
        rules: {
            username: {
                required: true,
                isUsername: true,
                rangelength: [5,30],
                remote: {
                    url: "/validator/username",
                    type: 'post',
                    data: {
                        'username': function () { return $('#username').val(); }
                    }
                }
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: "/validator/email",
                    type: 'post',
                    data: {
                        'email': function () { return $('#email').val(); }
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
            title: {
                required: true,
                rangelength: [2,50],
                remote: {
                    url: "/validator/title",
                    type: 'post',
                    data: {
                        'title': function () { return $('#title').val(); }
                    },
                    dataFilter: function(data) {
                        var json = JSON.parse(data);
                        if(json.status === "true") {
                            return true;
                        }
                        return "\"" + json.message + "\"";
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
            },
            agree: {
                required: true
            }
        },
        messages: {
            agree: {
                required: "同意注册协议才能继续"
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