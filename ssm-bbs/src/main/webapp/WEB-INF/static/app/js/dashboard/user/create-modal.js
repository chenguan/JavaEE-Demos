$(function(){

    var $form = $('#user-create-form');
    var $modal = $form.parents('.modal');

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("添加用户失败。");
        }
        else
        {
            $modal.modal('hide');
            window.location.reload();
        }
    };

    $form.validate({
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
                isPassword:true
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