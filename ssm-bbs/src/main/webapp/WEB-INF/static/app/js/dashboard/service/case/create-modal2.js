$(function(){
    $('#performance-evaluation').addClass('active open');
    $('#inner_service_case').addClass('active');

    KindEditor.ready(function (K) {
        window.editor = K.create('#description', {
            height: "300px",
            uploadJson: ctx + '/file/editor',
            fileManagerJson: ctx + '/file/manager',
            items : [
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist']
        });
    });

    jQuery.validator.addMethod("selectId", function (value, element) {
        if($("#serviceitemid").val() ==""){
            return false;
        }else{
            return true;
        }
    }, "请选择服务项目！");

    var $form = $('#role-create-form');
    $form.validate({
        rules: {
            serviceitemid:{
                selectId:true
            },
            title: {
                required: true,
                rangelength: [1, 120]
            }
        },

        submitHandler: function (form, event) {
            event.preventDefault();
            var value = $.trim($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html());
            if(value == "" || value == "<br>"){
                Notify.error("服务案例描述必须填写！");
                return;
            }
            $("#description").text(value);
            form.submit();
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        focusInvalid : false,
        onfocusout: false,
        errorElement: "span",
        errorClass: "error"
    });

});