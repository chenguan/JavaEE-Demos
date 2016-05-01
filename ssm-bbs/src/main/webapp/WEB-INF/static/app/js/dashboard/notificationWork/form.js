$(function(){

    $('#content-manage').addClass('active open');
    $('#notification_work_manage').addClass('active');

    KindEditor.ready(function (K) {
        window.editor = K.create('#body', {
            uploadJson: ctx + '/kindeditor/upload',
            fileManagerJson: ctx + '/kindeditor/manager'
        });
    });

    var $form = $('#notification-work-create-form');

    $form.validate({
        ignore: [],
        rules: {
            title: {
                required: true,
                rangelength: [1,100]
            },
            users: {
                required: function () { return $('#scope').val() != 'all'; }
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            var value = $.trim($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html());
            if(value == ""){
                Notify.error("正文必须填写！");
                return;
            }
            $("#body").text(value);
            form.submit();
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });

    $('#scope').on('change', function() {
        switch(this.value){
            case 'all' :
                $('#users').addClass('hide');
                $("#nw-users").select2("val", "");
                $("input[name='sms'][value='0']").prop("checked", true);
                $('#sms-box').addClass('hide');
                break;
            case 'piece' :
                $('#users').removeClass('hide');
                $('#sms-box').removeClass('hide');
                break;
            case 'agency' :
                $('#users').removeClass('hide');
                $('#sms-box').removeClass('hide');
                break;
        }
    });

    $('#nw-users').select2({
        ajax: {
            url: function(){
                return $("#scope").val() == 'piece'? ctx + '/dashboard/user/match/user' : ctx + '/dashboard/user/match/agency';
            },
            dataType: 'json',
            quietMillis: 100,
            cache: true,
            data: function(term, page) {
                return {
                    q: term,
                    page_limit: 30,
                    page: page
                };
            },
            results: function(data, page) {

                var results = [];
                var more = (page * 30) < data.total;

                $.each(data.users, function(index, item) {
                    results.push({
                        id: item.id,
                        name: item.title
                    });
                });

                return { results: results, more: more };
            }
        },
        initSelection: function(element, callback) {
            var data = [];
            $(element.val().split(",")).each(function() {
                data.push({
                    id: this,
                    name: this
                });
            });
            callback(data);
        },
        formatSelection: function(item) {
            return item.name;
        },
        formatResult: function(item) {
            return item.name;
        },
        multiple: true,
        minimumInputLength: 0,
        maximumSelectionSize: 200,
        placeholder: "请输入企业名称",
        width: 'off',
        createSearchChoice: function() {
            return null;
        }
    });

    $('#notification-work-create-form').on('reset', function() {
        $("#nw-users").select2("val", "");
    });

});