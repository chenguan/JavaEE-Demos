$(function(){

    $('#user-settings').addClass('active open');
    $('#user-settings-inner-base').addClass('active');

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("编辑用户信息失败。");
        }
        else
        {
            Notify.success("编辑用户信息成功。");
        }
    };

    var $form = $('#user-edit-form');

    $form.validate({
        rules: {
            title: {
                required: true,
                rangelength: [2,30],
                isChineseAndEnglish: true
            },
            realname: {
                required: true,
                isChineseAndEnglish: true,
                rangelength: [2,30]
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: "/validator/email2",
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
                    url: "/validator/mobile2",
                    type: 'post',
                    data: {
                        'mobile': function () { return $('#mobile').val()},
                        'origin_mobile': function () { return $('#origin_mobile').val(); }
                    }
                }
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $(form).ajaxSubmit({
                dataType : 'json',
                success: showNotify,
                error: function(data,textstatus){
                    $modal.modal('hide');
                    Notify.error("服务器内部错误，请稍后再试。");
                }
            });
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent().parent());
        },
        errorElement: "span",
        errorClass: "error"
    });

});