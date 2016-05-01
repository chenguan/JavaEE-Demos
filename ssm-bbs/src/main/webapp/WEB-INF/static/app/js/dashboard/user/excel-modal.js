$(function(){

    var $form = $('#user-excel-form');
    var $modal = $form.parents('.modal');
    var file_input = $form.find('input[type=file]');

    file_input.ace_file_input({
        style: 'well',
        btn_choose: '点击这里添加Excel文件',
        btn_change: null,
        no_icon: 'ace-icon fa fa-file-o',
        droppable: false,
        allowExt: ["xls", "xlsx"],
        allowMime: ["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        maxSize: 2097152,//bytes
        thumbnail: 'fit'
    });

    file_input.on('file.error.ace', function(event, info) {
        if(info.error_count['size']) Notify.warning('超出最大上传限制。');
        if(info.error_count['ext'] || info.error_count['mime']) Notify.warning('不合法的文件类型。');
        event.preventDefault();
    });

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("导入企业失败，" + response.errorMessage);
        }
        else
        {
            $modal.modal('hide');
            Notify.success("成功导入" + response.count + "个企业。");
            // 局部刷新（分页也得更新）
            updateUserList(response.page);
        }
    };

    $form.validate({
        submitHandler: function(form, event) {
            var files = file_input.data('ace_input_files');
            if (!files || files.length == 0) {
                Notify.warning('请先选择要导入的文件');
                return;
            }
            event.preventDefault();
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

    /**
     * 局部刷新list
     *
     * @param page
     */
    function updateUserList(page) {
        // 清空list
        $("#user-table tbody").empty();
        // 写入list
        for (var i = 0; i < page.list.length; i++) {
            var user = page.list[i];
            // tr开始
            var tr = '<tr id="user-table-tr-' + user.id + '">';

            // 行号
            var td = '<td>' + (i + 1) + '</td>';
            tr += td;

            // 企业名称
            td = '<td><a data-toggle="modal" href="' + ctx + '/dashboard/user/' + user.id
            + '" data-target="#myLargeModal">' + user.title + '</a><label class="label label-danger">'
            + (user.locked == 1 ? '禁' : '') + '</label></td>';
            tr += td;

            // 账号
            td = '<td>' + user.username + '</td>';
            tr += td;

            // 注册时间
            var date = new Date();
            date.setTime(user.createdtime);
            td = '<td>' + dateToString(date) + '</td>';
            tr += td;

            // 最近登录
            date.setTime(user.logintime);
            td = '<td>' + dateToRelative(date) + '</td>';
            tr += td;

            // 操作
            td = '<td><div class="btn-group">'
            + '<a data-toggle="modal" class="btn btn-xs btn-inverse" href="' + ctx + '/dashboard/user/' + user.id + '" data-target="#myLargeModal">查看</a>'
            + '<button data-toggle="dropdown" class="btn btn-xs btn-inverse dropdown-toggle"><span class="ace-icon fa fa-caret-down icon-only"></span></button>'
            + '<ul class="dropdown-menu dropdown-menu-right dropdown-inverse">'
            + '<li><a href="' + ctx + '/dashboard/user/' + user.id + '/edit" >编辑企业信息</a></li>'
            + '<li><a data-backdrop="static" data-toggle="modal" href="${ctx}/dashboard/user/' + user.id + '/roles" data-target="#myModal">设置企业角色</a></li>'
            + '<li><a data-toggle="modal" data-backdrop="static" data-target="#myLargeModal" href="' + ctx + '/dashboard/user/' + user.id + '/account" >查看账号</a></li>'
            + '<li class="divider"></li>'
            + '<li>'
            + (user.locked == 1 ? '<a href="javascript:" title="解禁账号 ${user.username}" data-role="unlock-user" data-url="' + ctx + '/dashboard/user/' + user.id + '/unlock">解禁账号</a>'
                : '<a href="javascript:" title="封禁账号 ' + 'user.username' + '" data-role="lock-user" data-url="' + ctx + '/dashboard/user/' + user.id + '/lock">封禁账号</a>')
            + '</li>'
            + '</ul></div></td>';
            tr += td;

            // tr结束
            tr += '</tr>';
            // 追加到list最后一行
            $("#user-table tbody").append(tr);
        }

        // 清空分页
        $(".pagination").empty();
        // 写入分页
        for (var i = page.firstPage; i <= page.lastPage; i++) {
            $(".pagination").append('<li' + (page.pageNum == i ? ' class="active"' : '')
            + '><a href="/dashboard/user?p=' + i + '&amp;roleId=&amp;keywordType=&amp;keywords=">' + i + '</a></li>');
        }
    }

    // 日期时间转字符串
    function dateToString(date) {
        return date.getFullYear() + "-" + oneToTwo((date.getMonth() + 1) + "") + "-" + oneToTwo(date.getDate() + "") + " " + oneToTwo(date.getHours() + "") + ":"
            + oneToTwo(date.getMinutes() + "") + ":"
            + oneToTwo(date.getSeconds() + "");
    }

    // 日期时间转那个什么鬼
    function dateToRelative(date) {
        var ct = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        if (ct >= 31104000) {
            if (Math.floor((ct / 31104000)) > 45) {
                return "";
            }
            return Math.floor((ct / 31104000)) + "年前";
        } else if(ct >= 2592000) {
            return Math.floor((ct / 2592000)) + "个月前";
        } else if(ct >= 86400 * 2) {
            return Math.floor((ct / 86400)) + "天前";
        } else if(ct >= 86400) {
            return "昨天";
        } else if(ct >= 3600) {
            return Math.floor((ct / 3600)) + "小时前";
        } else if(ct >= 60) {
            return Math.floor((ct / 60)) + "分钟前";
        } else if(ct > 0) {
            return Math.floor(ct) + "秒前";
        } else {
            return "刚刚";
        }
    }

    // 补零
    function oneToTwo(number) {
        if (number.trim().length == 1) {
            return "0" + number;
        }
        return number;
    }

});