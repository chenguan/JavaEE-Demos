$(function(){

    var $form = $('#category-create-form2');
    var $modal = $form.parents('.modal');

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("添加栏目失败。");
        }
        else
        {
            $modal.modal('hide');
            window.location.reload();
        }
    };

    $form.validate({
        rules: {
            name: {
                required: true
            },
            alias: {
                required: true,
                rangelength: [2,10],
                isLowLetterAndNum: true,
                remote: {
                    url: ctx + "/dashboard/category2/verify-alias",
                    type: 'post',
                    data: {
                        'alias': function () { return $('#alias').val(); },
                        'origin_alias': function () { return $('#origin_alias').val(); }
                    }
                }
            },
            sort: {
                required: true,
                range:[1,1000]
            },
            roles: {
                required: function () { return $("input[name='verify']:checked").val() == '1'? true:false; }
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

    //if ($("input[name='verify']:checked").val() == '1') {
    //    $('#roles').removeClass('hide');
    //}

    //$('input[type=radio][name=verify]').on('change', function() {
    //    switch($(this).val()){
    //        case '0' :
    //            $('#roles').addClass('hide');
    //            break;
    //        case '1' :
    //            $('#roles').removeClass('hide');
    //            break;
    //    }
    //});
});