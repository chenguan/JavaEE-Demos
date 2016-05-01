$(function(){
    $('#' + (type == 'inner' ? 'content-manage' : 'public-service')).addClass('active open');
    $('#launch_joint' + (type == 'inner' ? '2' : '')).addClass('active');

    KindEditor.ready(function (K) {
        window.editor = K.create('#body', {
            height: "300px",
            uploadJson: ctx + '/file/editor',
            fileManagerJson: ctx + '/file/manager',
            items : [
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist']
        });
    });

    $("div[class=col-xs-12]").mouseout(function(){
        var value = $.trim($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html());
        $("#body").text(value);
    });

    var $form = $('#joint-create-form');
    $form.validate({
        ignore: [],
        rules: {
            orgname: {
                required: true,
                rangelength: [1,32]
            },
            contactname: {
                required: true,
                rangelength: [1,32]
            },
            tel: {
                required: function() {return $("#mobile").val() == ''},
                rangelength: [1,32]
            },
            mobile: {
                required: function() {return $("#tel").val() == '' && $("#mobile").val() != ''},
                rangelength: [1,32]
            },
            email: {
                required: false,
                rangelength: [0,100]
            },
            title: {
                required: true,
                rangelength: [1,30]
            },
            body: {
                required: true
            },
            type: {
                required: true
            },
            servicetypeid: {
                required: function () {return $("input[name=type]:checked").val() == "outer";}
            },
            users: {
                required: function () {return $("input[name=type]:checked").val() == "outer";}
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

    $("#service-panel").hide();
    $("input[name=type]").click(function () {
        if ($(this).val() == "outer") {
            $("#service-panel").show();
        } else {
            $("#service-panel").hide();
        }
    });


    var simpleSelectTree = new SimpleSelectTree($("#servicetypeid"), $("#servicetypeidHide"), $("#treePanel"), zNodes);

    // 覆写onSelected方法，让其可以选择父节点
    simpleSelectTree.onSelected = function(event, treeId, treeNode) {
        if (!treeNode.isParent) {
            simpleSelectTree.valueInput.val(treeNode.id);
            simpleSelectTree.nameInput.val(treeNode.name);
            simpleSelectTree.treePanel.addClass("hide");

            $("#no-select-servicetype-error").hide();
            getUsersByServiceType($("#servicetypeidHide").val());
        }
    };
    // 必须重新加载，否则覆写无效
    simpleSelectTree.reload();

    $('[data-rel=users]').popover({
        container: 'body',
        html: true
    });

    // 协同机构至多选择3家
    var select2 = $("#users");
    select2.css('width', '100%');
    select2.select2({
        allowClear:true,
        maximumSelectionSize:3, // 协同机构至多选择3家
        formatSelectionTooBig: function (a) {
            return "协同机构至多选择3家!";
        }
    });

    function getUsersByServiceType(serviceTypeId) {
        $.get(ctx + "/dashboard/joint/users/" + serviceTypeId, function (response) {
            // 1、区县2、窗口平台3、街镇4、园区/楼宇5、行业协会6、其他服务机构
            var arr = eval('(' + response + ')');
            var users = arr.users; // 机构

            // 先清空
            $("#users").empty();
            $("#users-panel .select2-search-choice").remove();

            // 写入机构
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                $("#users").append("<option value='" + user.id + "'>" + user.title + "</option>");
            }
        });
    }

    $('[data-rel=mobile]').popover({
        container: 'body',
        html: true,
        content: '<p>联系电话和手机号码至少填写一个！</p>'
    });
});
