$(function(){
    $('#public-service-accept').addClass('active open');
    $('#hotline').addClass('active');

    $('#delaytime').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: 1,
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd hh:ii:ss',
        minView: 'month'
    });

    if(fadeback != ''){
        alert(fadeback);
    }

    var $form = $('#hotline-delay-form');
    $form.validate({
        rules: {
            operator:{
                required: true,
                rangelength: [1, 32]
            },
            handler:{
                required: true,
                rangelength: [1, 32]
            },
            charger:{
                required: true,
                rangelength: [1, 32]
            },
            contactnumber:{
                required: true,
                isTel:true
            },
            remark:{
                required: true,
                rangelength: [1, 50]
            }
        },

        submitHandler: function (form, event) {
            event.preventDefault();
            if($('#delaytime').val() == ''){
                Notify.warning("提出申请日期不能为空");
            }else{
                form.submit();
            }
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