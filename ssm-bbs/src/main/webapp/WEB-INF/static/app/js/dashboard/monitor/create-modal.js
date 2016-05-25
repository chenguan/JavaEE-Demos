$(function(){

    var $form = $('#userMonitorMetadata-create-form');
    var $modal = $form.parents('.modal');

    $('button[type=submit]').click(function() {
        var bool = true;
        var submitButton = $(this);
        var status = submitButton.data('status');

        $('#form_status').val(status);

        if(status != 'unsubmit')
            bool = checkForm();

        if(bool)
            $.post(
                $form.attr('action'),
                $form.serialize(),
                function(html){
                    var new_url = window.location.href;
                    window.location.href = new_url;
                }, 'html'
            ).error(function (data, textstatus) {
                $modal.modal('hide');
                Notify.error("服务器内部错误，请稍后再试。");
            });
        return false;
    });

    function checkForm(){
        if ($('#incomethismonth').val().trim() == '' || isNaN($('#incomethismonth').val())) {
            $("#incomethismonthErrorMsg").show();
            return false;
        }else{
            $("#incomethismonthErrorMsg").hide();
        }
        if ($('#incomehistorymonth').val().trim() == '' || isNaN($('#incomehistorymonth').val())) {
            $("#incomehistorymonthErrorMsg").show();
            return false;
        }else{
            $("#incomehistorymonthErrorMsg").hide();
        }
       if ($('#incomethismonth2').val().trim() == '' || isNaN($('#incomethismonth2').val())) {
            $("#incomethismonth2ErrorMsg").show();
            return false;
        }else{
            $("#incomethismonth2ErrorMsg").hide();
        }
        if ($('#incomehistorymonth2').val().trim() == '' || isNaN($('#incomehistorymonth2').val())) {
            $("#incomehistorymonth2ErrorMsg").show();
            return false;
        }else{
            $("#incomehistorymonth2ErrorMsg").hide();
        }

        if ($('#profitthismonth').val().trim() == '' || isNaN($('#profitthismonth').val())) {
            $("#profitthismonthErrorMsg").show();
            return false;
        }else{
            $("#profitthismonthErrorMsg").hide();
        }
        if ($('#profithistorymonth').val().trim() == '' || isNaN($('#profithistorymonth').val())) {
            $("#profithistorymonthErrorMsg").show();
            return false;
        }else{
            $("#profithistorymonthErrorMsg").hide();
        }
        if ($('#profitthismonth2').val().trim() == '' || isNaN($('#profitthismonth2').val())) {
            $("#profitthismonth2ErrorMsg").show();
            return false;
        }else{
            $("#profitthismonth2ErrorMsg").hide();
        }
        if ($('#profithistorymonth2').val().trim() == '' || isNaN($('#profithistorymonth2').val())) {
            $("#profithistorymonth2ErrorMsg").show();
            return false;
        }else{
            $("#profithistorymonth2ErrorMsg").hide();
        }

        if ($('#staffthismonth').val().trim() == '' || isNaN($('#staffthismonth').val()) || isInteger($('#staffthismonth').val())) {
            $("#staffthismonthErrorMsg").show();
            return false;
        }else{
            $("#staffthismonthErrorMsg").hide();
        }
        if ($('#staffthismonth2').val().trim() == '' || isNaN($('#staffthismonth2').val()) || isInteger($('#staffthismonth2').val())) {
            $("#staffthismonth2ErrorMsg").show();
            return false;
        }else{
            $("#staffthismonth2ErrorMsg").hide();
        }

        if ($('#gapthismonth').val().trim() == '' || isNaN($('#gapthismonth').val())) {
            $("#gapthismonthErrorMsg").show();
            return false;
        }else{
            $("#gapthismonthErrorMsg").hide();
        }
        if ($('#gaphistorymonth').val().trim() == '' || isNaN($('#gaphistorymonth').val())) {
            $("#gaphistorymonthErrorMsg").show();
            return false;
        }else{
            $("#gaphistorymonthErrorMsg").hide();
        }
        if ($('#gapthismonth2').val().trim() == '' || isNaN($('#gapthismonth2').val())) {
            $("#gapthismonth2ErrorMsg").show();
            return false;
        }else{
            $("#gapthismonth2ErrorMsg").hide();
        }
        if ($('#gaphistorymonth2').val().trim() == '' || isNaN($('#gaphistorymonth2').val())) {
            $("#gaphistorymonth2ErrorMsg").show();
            return false;
        }else{
            $("#gaphistorymonth2ErrorMsg").hide();
        }

        if ($('#taxthismonth').val().trim() == '' || isNaN($('#taxthismonth').val())) {
            $("#taxthismonthErrorMsg").show();
            return false;
        }else{
            $("#taxthismonthErrorMsg").hide();
        }
        if ($('#taxhistorymonth').val().trim() == '' || isNaN($('#taxhistorymonth').val())) {
            $("#taxhistorymonthErrorMsg").show();
            return false;
        }else{
            $("#taxhistorymonthErrorMsg").hide();
        }
        if ($('#taxthismonth2').val().trim() == '' || isNaN($('#taxthismonth2').val())) {
            $("#taxthismonth2ErrorMsg").show();
            return false;
        }else{
            $("#taxthismonth2ErrorMsg").hide();
        }
        if ($('#taxhistorymonth2').val().trim() == '' || isNaN($('#taxhistorymonth2').val())) {
            $("#taxhistorymonth2ErrorMsg").show();
            return false;
        }else{
            $("#taxhistorymonth2ErrorMsg").hide();
        }
        return true;
    }

    function isInteger(obj){
        var bool = false;
        if(obj.indexOf(".") > 0){
            bool = true;
        }
        return bool;
    }
});