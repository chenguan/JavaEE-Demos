$(function(){
    $('#public-service').addClass('active open');
    $('#demand').addClass('active');

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

    var $form = $('#demand-create-form');
    $form.validate({
        ignore: [],
        rules: {
            contactname: {
                required: true,
                rangelength: [1,32]
            },
            mobile: {
                required: function () {return '' == $("#tel").val();},
                isMobile: true,
                rangelength: [1,32]
            },
            tel: {
                required: function () {return '' == $("#mobile").val();},
                rangelength: [1,32]
            },
            title: {
                required: true,
                rangelength: [1,100]
            },
            email: {
                required: false,
                rangelength: [0,100]
            },
            body: {
                required: true
            },
            servicetypeid: {
                required: function () {return $("input[name=type]:checked").val() == "服务类";}
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

    $("input[name=type]").click(function() {
        if ($(this).val() == "服务类") {
            $("#service-panel").show();
        } else {
            $("#service-panel").hide();
        }
    });

    $("#users-panel").hide();

    $("input[name=replace]").click(function() {
        if ($(this).val() == "1") {
            $("#users-panel").hide();
        } else {
            $("#users-panel").show();
            if ($("#servicetypeidHide").val() != '') {
                getUsersByServiceType($("#servicetypeidHide").val());
            } else {
                $("#users-error").show();
            }
        }
    });

    var volunteers;
    function getUsersByServiceType(serviceTypeId) {
        $.get(ctx + "/dashboard/demand/users/" + serviceTypeId, function (response) {
            var arr = eval('(' + response + ')');
            var users = arr.users; // 机构
            volunteers = arr.volunteers; // 志愿者

            // 先清空
            $("#users").empty();
            $("#users-panel .select2-search-choice").remove();

            // 写入机构
            $("#users").append("<option disabled> =============== 服务机构 =============== </option>");
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                $("#users").append("<option value='" + user.id + "'>" + user.title + "</option>");
            }

            // 写入志愿者
            $("#users").append("<option disabled> =============== 志愿者 =============== </option>");
            for (var i = 0; i < volunteers.length; i++) {
                var volunteer = volunteers[i];
                $("#users").append("<option value='" + volunteer.id + "'>" + volunteer.title + "</option>");
            }
        });
    }

    var simpleSelectTree = new SimpleSelectTree($("#servicetypeid"), $("#servicetypeidHide"), $("#treePanel"), zNodes);

    // 覆写onSelected方法，让其可以选择父节点
    simpleSelectTree.onSelected = function(event, treeId, treeNode) {
        if (!treeNode.isParent) {
            simpleSelectTree.valueInput.val(treeNode.id);
            simpleSelectTree.nameInput.val(treeNode.name);
            simpleSelectTree.treePanel.addClass("hide");

            $("#users-error").hide();
            if ($("input[name=replace]:checked").val() == 0) {
                getUsersByServiceType($("#servicetypeidHide").val());
            }
        }
    };
    // 必须重新加载，否则覆写无效
    simpleSelectTree.reload();

    $('[data-rel=users]').popover({
        container: 'body',
        html: true
    });

    // 机构至多选择3家，其中志愿者最多选择1家
    var select2 = $("#users");
    select2.css('width', '100%');
    select2.select2({
        allowClear:true,
        maximumSelectionSize:3, // 最多只能选3家机构
        formatSelectionTooBig: function (a) {
            return "只能选择 " + a + " 家机构" + (3 == a ? "！" : "，已流转过" + (3 - a) + "家！")
        }
    });
    select2.change(function(e){
        var added = e.added;
        // 如果是添加了一个元素, 并且选择了2个志愿者
        if (added && validate()) {
            // 不添加这个元素（就是把添加的删了），并且提示用户
            var arr = $(".select2-search-choice div");
            for (var i = 0; i < arr.length; i++) {
                if (added.text == arr[i].innerText) {
                    $(arr[i]).parent().remove(); // 显示 移除
                    removeUserId(added.id);// id 移除
                    break;
                }
            }
            alert("最多只能选择1家志愿者！");
        }
    });

    // 校验选择了的自愿者是否大于1个 return 0：否，1：是
    function validate(){
        var arr = select2.val();
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < volunteers.length; j++) {
                if (arr[i] == volunteers[j].id) {
                    count++;
                    break;
                }
            }
        }
        return count > 1;
    }

    // 移除已选中的机构的id
    function removeUserId(id) {
        var arr = select2.val();
        var newArr = [], k = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != id) {
                newArr[k++] = arr[i];
            }
        }
        select2.val(newArr);
    }

    $('[data-rel=mobile]').popover({
        container: 'body',
        html: true,
        content: '<p>手机和联系电话至少填写一个</p>'
    });
});
