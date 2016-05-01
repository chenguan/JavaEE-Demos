$(function(){
    $('#public-service-accept').addClass('active open');
    $('#hotline').addClass('active');

    $('#applytime').datetimepicker({
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

    var $form = $('#hotline-return-form');
    $form.validate({
        rules: {
            operator:{
                required: true,
                rangelength: [1, 32]
            },
            backsummary:{
                required: true,
                rangelength: [1, 999]
            }
        },

        submitHandler: function (form, event) {
            event.preventDefault();
            if($('#applytime').val() == ''){
                Notify.warning("退单申请日期不能为空");
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

});