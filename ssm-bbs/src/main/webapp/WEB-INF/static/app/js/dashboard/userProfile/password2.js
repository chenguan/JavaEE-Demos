$(function(){

    $('#user-settings').addClass('active open');
    $('#user-settings-password2').addClass('active');

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("修改密码失败。");
        }
        else
        {
            Notify.success("修改密码成功。");
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

});