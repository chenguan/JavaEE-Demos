$(function(){

    $('#content-manage').addClass('active open');
    $('#content_manage').addClass('active');

    KindEditor.ready(function (K) {
        window.editor = K.create('#body', {
            uploadJson: ctx + '/kindeditor/upload',
            fileManagerJson: ctx + '/kindeditor/manager'
        });
    });

    var $form = $('#page-create-form');

    $form.validate({
        rules: {
            title: {
                required: true,
                rangelength: [1,100]
            },
            alias: {
                required: true,
                rangelength: [2,10],
                isLowLetterAndNum: true,
                remote: {
                    url: ctx + "/dashboard/content/verify-alias",
                    type: 'post',
                    data: {
                        'alias': function () { return $('#alias').val(); },
                        'origin_alias': function () { return $('#origin_alias').val(); }
                    }
                }
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            var value = $.trim($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html());
            if(value == ""){
                Notify.error("正文必须填写！");
                return;
            }
            $("#body").text(value);
            form.submit();
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });

});