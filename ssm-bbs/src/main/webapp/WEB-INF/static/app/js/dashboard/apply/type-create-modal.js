$(function(){

    var $form = $('#type-create-form');
    var $modal = $form.parents('.modal');

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("新建申报类型失败。");
        }
        else
        {
            $modal.modal('hide');
            window.location.reload();
        }
    };

    $form.validate({
        rules: {
            type: {
                required: true,
                rangelength: [1,30]
            },
            template: {
                required: true
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

    $("#template").change(function(e) {
        if ($(this).val() != "") {
            var now = new Date();
            $("#type").val(now.getFullYear() + $("#template option:selected").text());
        } else {
            $("#type").val("");
        }
    });

});