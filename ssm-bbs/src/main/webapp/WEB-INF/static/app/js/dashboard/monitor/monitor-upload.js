$(function(){
    $('#monitor-data').addClass('active open');
    $('#monitor-upload').addClass('active');

    $('#id-input-file-2').ace_file_input({
        //style: 'well',
        no_file: '批量导入 ...',
        btn_choose: '选择',
        btn_change: '更改',
        no_icon: 'ace-icon fa fa-file-o',
        droppable: false,
        allowExt: ["xls", "xlsx"],
        allowMime: ["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        maxSize: 2097152,//bytes
        thumbnail: 'fit'
    });

    $('#id-input-file-2').on('file.error.ace', function(event, info) {
        if(info.error_count['size']) Notify.warning('超出最大上传限制。');
        if(info.error_count['ext'] || info.error_count['mime']) Notify.warning('不合法的文件类型。');
        event.preventDefault();
    });

    if(errorMessage != "" && errorMessage != 'success'){
        Notify.info(errorMessage);
    }
});