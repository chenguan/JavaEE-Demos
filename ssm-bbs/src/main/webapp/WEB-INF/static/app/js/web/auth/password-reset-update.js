$(function(){

    var passwordReset = $("#password-reset-update-form").validate({
        rules: {
            password: {
                required: true,
                isPassword:true
            },
            confirmPassword: {
                required: true,
                equalTo: "#password"
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            form.submit();
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });
});