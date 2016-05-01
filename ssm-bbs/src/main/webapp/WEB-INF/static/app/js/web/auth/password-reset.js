$(function(){

    var passwordReset = $("#passwordResetForm").validate({
        rules: {
            mobile: {
                required: true,
                isMobile: true,
                remote: {
                    url: "/validator/mobile3",
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
            mobile: {
                remote: "该手机号码不存在！"
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

        if(!passwordReset.element("#mobile"))
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