$(function(){
    $('#public-service-accept').addClass('active open');
    $('#hotline').addClass('active');

    if(fadeback != ''){
        alert(fadeback);
    }

    var $form = $('#hotline-sign-form');
    $form.validate({
        rules: {
            result:{
                required: true,
                rangelength: [1, 999]
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
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