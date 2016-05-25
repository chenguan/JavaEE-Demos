$(function() {
    $('#public-service-accept').addClass('active open');
    $('#hotline').addClass('active');

    $('#looktime, #contacttime, #replytime, #finishtime').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: 1,
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd hh:ii:ss',
        minView: 'hour'
    });

    if(fadeback != ''){
        alert(fadeback);
    }

    $("#uploadify").uploadify({
        'swf':  ctx + '/static/libs/uploadify/uploadify.swf',
        'uploader': ctx + '/dashboard/hotline/upload;JSESSIONID='+sessionid,
        /*formData : {'session_id' : $('#sessionid').val()},*/
        'buttonText': '导入文件',
        'fileSizeLimit': '2048KB',
        'queueSizeLimit': 1,
        'width': 150,
        'fileObjName' : 'file',
        'auto': true,
        'onUploadStart' : function(file) {
            //var data = {'name': id, fileName: file.name};
            //$('#' + id).uploadify('settings','formData', data);
            //$("#uploadify").uploadify("settings","buttonText", file.name);
        },
        'onUploadSuccess' : function(file, data, response) {
            var dataObj = eval("("+data+")");
            if(dataObj.success == 1){
                var fileName = dataObj.fileName;
                $("#fileurl").val(fileName);
                $("#uploadify").uploadify("settings","buttonText", file.name);
                $(".ace-file-name").attr('data-title', file.name);
            }else{
                alert("导入文件失败");
            }
        }
    });

    var $form = $('#hotline-handle-form');
    $form.validate({
        rules: {
            telephone:{
                required: true,
                isTel: true
            },
            cjperson:{
                required: true,
                rangelength: [1, 100]
            },
            cfperson:{
                required: true,
                rangelength: [1, 100]
            },
            level2handler:{
                required: true,
                rangelength: [1, 50]
            },
            level2charger:{
                required: true,
                rangelength: [1, 50]
            },
            fact:{
                required: true
            },
            isview:{
                required: true
            },
            factexplain:{
                required: true,
                rangelength: [1, 500]
            },
            appeal:{
                required: true
            },
            appealexplain:{
                required: true,
                rangelength: [1, 500]
            },
            firstcontact:{
                required: true
            },
            result:{
                required: true
            },
            notreason:{
                required: true
            },
            firstcontactor:{
                required: true,
                rangelength: [1, 50]
            },
            replypoint:{
                required: true,
                rangelength: [1, 500]
            },
            badgingunit:{
                required: true,
                rangelength: [1, 100]
            },
            satisfiedexplain:{
                required: true,
                rangelength: [1, 500]
            },
            replytype:{
                required: true
            },
            alispublic:{
                required: true
            },
            satisfied:{
                required: true
            },
            handlerreturns:{
                required: true
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            if($('#looktime').val() == ''){
                Notify.warning("现场查看日期不能为空");
            }else if($('#contacttime').val() == ''){
                Notify.warning("联系时间不能为空");
            }else if($('#replytime').val() == ''){
                Notify.warning("答复市民时间不能为空");
            }else if($('#finishtime').val() == ''){
                Notify.warning("处理完结时间不能为空");
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
