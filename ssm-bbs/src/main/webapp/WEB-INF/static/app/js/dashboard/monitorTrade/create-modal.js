$(function(){

    var $form = $('#trade-create-form');

    $form.validate({
        rules: {

        },

        submitHandler: function(form, event) {
            form.submit();
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });

});