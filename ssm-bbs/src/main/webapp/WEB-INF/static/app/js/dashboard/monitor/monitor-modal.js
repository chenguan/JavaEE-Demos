$(function(){

    var $form = $('#updateregion-form');

    $form.validate({
        rules: {
            region: {
                required: true,
                rangelength: [1, 255]
            },
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