$(function(){

    var $form = $('#type-open-form');
    var $modal = $form.parents('.modal');

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("开启申报失败。");
        }
        else
        {
            $modal.modal('hide');
            window.location.reload();
        }
    };

    $form.validate({
        rules: {
            starttime: {
                required: true
            },
            endtime: {
                required: true
            },
            districtstarttime: {
                required: true
            },
            districtendtime: {
                required: true
            },
            operatorstarttime: {
                required: true
            },
            operatorendtime: {
                required: true
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            if($("#starttime").val() == "" || $("#starttime").val() == null){
                Notify.warning("申报开启时间不能为空");
                return;
            }
            if($("#endtime").val() == "" || $("#endtime").val() == null){
                Notify.warning("申报结束时间不能为空");
                return;
            }
            if($("#districtstarttime").val() == "" || $("#districtstarttime").val() == null){
                Notify.warning("区县审核开始时间不能为空");
                return;
            }
            if($("#districtendtime").val() == "" || $("#districtendtime").val() == null){
                Notify.warning("区县审核结束时间不能为空");
                return;
            }
            if($("#operatorstarttime").val() == "" || $("#operatorstarttime").val() == null){
                Notify.warning("运营审核开始时间不能为空");
                return;
            }
            if($("#operatorstarttime").val() == "" || $("#operatorstarttime").val() == null){
                Notify.warning("运营审核结束时间不能为空");
                return;
            }
            if(!compareTime($("#starttime").val(),$("#endtime").val())){
                Notify.warning("申报结束时间不能小于申报开启时间");
                return;
            }
            if(!compareTime($("#starttime").val(),$("#districtstarttime").val())){
                Notify.warning("区县审核开始时间不能小于申报开启时间");
                return;
            }
            if(!compareTime($("#districtstarttime").val(),$("#districtendtime").val())){
                Notify.warning("区县审核结束时间不能小于区县审核开始时间");
                return;
            }
            if(!compareTime($("#starttime").val(),$("#operatorstarttime").val())){
                Notify.warning("运营审核开始时间不能小于申报开启时间"); 
                return;
            }
            if(!compareTime($("#operatorstarttime").val(),$("#operatorendtime").val())){
                Notify.warning("运营审核结束时间不能小于运营审核开始时间");
                return;
            }
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

    setDatetimepicker("#starttime");
    setDatetimepicker("#endtime");
    setDatetimepicker("#districtstarttime");
    setDatetimepicker("#districtendtime");
    setDatetimepicker("#operatorstarttime");
    setDatetimepicker("#operatorendtime");

    function setDatetimepicker(id) {
        $(id).datetimepicker({
            language: 'zh-CN',
            autoclose: 1,
            todayBtn: 1,
            pickerPosition: "bottom-left",
            minuteStep: 5,
            format: 'yyyy-mm-dd hh:ii:ss',
            minView: 'hour'
        });
    }


    //判断日期，时间大小
    function compareTime(startDate, endDate) {
        if (startDate.length > 0 && endDate.length > 0) {
            var startDateTemp = startDate.split(" ");
            var endDateTemp = endDate.split(" ");

            var arrStartDate = startDateTemp[0].split("s-");
            var arrEndDate = endDateTemp[0].split("-");

            var arrStartTime = startDateTemp[1].split(":");
            var arrEndTime = endDateTemp[1].split(":");

            var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);
            var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);

            if (allStartDate.getTime() > allEndDate.getTime()) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

});