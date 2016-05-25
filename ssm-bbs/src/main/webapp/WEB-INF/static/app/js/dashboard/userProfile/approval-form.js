$(function(){

    $('#user-settings-2').addClass('active open');
    $('#user-settings-approval').addClass('active');
    $('#opendate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: 1,
        pickerPosition: "bottom-left",
        format: 'yyyy-mm-dd',
        minView: 'month'
    });

    $('textarea.limited').inputlimiter({
        remText: '还可以输入 %n ，',
        limitText: '最多允许 %n 个字。'
    });

    //$('.input-mask-phone').mask('999-99999999');
    //$('.input-mask-product').mask('********-*');

    var $form = $('#approval-form');

    $form.validate({
        ignore: [],
        rules: {
            title: {
                required: true,
                rangelength: [2,50],
                remote: {
                    url: ctx + "/validator/title2",
                    type: 'post',
                    data: {
                        'title': function () { return $('#title').val(); },
                        'origin_title': function () { return $('#origin_title').val(); }
                    }
                }
            },
            code: {
                required: true,
                isEntityCode: true,
                maxlength: [30]
            },
            tag: {
                required: true
            },
            category: {
                required: true
            },
            property: {
                required: true
            },
            type: {
                required: function () { return $('#property').val() == '125'; }
            },
            district2: {
                required: true
            },
            address: {
                required: true,
                maxlength: [500]
            },
            address2: {
                required: true,
                maxlength: [500]
            },
            zip: {
                required: true,
                digits: true,
                maxlength: [32]
            },
            zip2: {
                required: true,
                digits: true,
                maxlength: [32]
            },
            corporation: {
                required: true,
                maxlength: [32]
            },
            opendate: {
                required: true
            },
            contacts: {
                required: true,
                maxlength: [32]
            },
            capital: {
                required: true,
                digits: true,
                maxlength: [20]
            },
            site: {
                url: true,
                maxlength: [100]
            },
            weibo: {
                url: true,
                maxlength: [30]
            },
            weixin: {
                maxlength: [30]
            },
            tel: {
                isTel: true
            },
            fax: {
                isTel: true
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            //if(isFormChanged()){
                form.submit();
            //} else {
            //    Notify.warning("貌似没有修改过内容哦！")
            //}

        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });

    //字典id, 122 企业, 121 个体工商户
    if ($('#property').val() == '122') {
        $('#type_div').removeClass('hide');
    }

    if ($('#property').val() == '121') {
        $('#code_label').text("工商注册号");
        $('#corporation_label').text("负责人");
        $("#code").rules("remove");
        $("#code").rules("add", { required: true, isBizRegNo: true });
    }

    $('#property').on('change', function() {
        switch($(this).val()){
            case '122' :
                $('#type_div').removeClass('hide');
                $('#code_label').text("组织机构代码");
                $('#corporation_label').text("法定代表人");
                $("#code").rules("remove");
                $("#code").rules("add", { required: true, isEntityCode: true });
                break;
            case '121' :
                $('#type_div').addClass('hide');
                $('#code_label').text("工商注册号");
                $('#corporation_label').text("负责人");
                $("#code").rules("remove");
                $("#code").rules("add", { required: true, isBizRegNo: true });
                break;
            default :
                $('#type_div').addClass('hide');
                $('#code_label').text("组织机构代码");
                $('#corporation_label').text("法定代表人");
                $("#code").rules("remove");
                $("#code").rules("add", { required: true, isEntityCode: true });
                break;
        }
    });

    var setting1 = {
        check: {
            enable: true,
            chkStyle: "radio",
            radioType: "all"
        },
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: beforeClick1,
            onCheck: onCheck1
        }
    };

    $.fn.zTree.init($("#tradeCategoryTree"), setting1, zNodes1);

    function beforeClick1(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("tradeCategoryTree");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    }

    //编辑时选中已有内容
    onCheck1();

    function onCheck1() {
        var zTree = $.fn.zTree.getZTreeObj("tradeCategoryTree"),
            nodes = zTree.getCheckedNodes(true),
            v = "", ids = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            v += nodes[i].name + ",";
            ids += nodes[i].id + ",";
        }
        if (v.length > 0) {
            v = v.substring(0, v.length - 1);
            ids = ids.substring(0, ids.length - 1);
        }
        var input = $("#tradeCategoryid");
        input.attr("value", v);
        var hideInput = $("#tradeCategoryHide");
        hideInput.attr("value", ids);
    }

    function hideMenu1() {
        $("#tradeCategoryContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown1);
    }

    function onBodyDown1(event) {
        if (!(event.target.id == "tradeCategoryid" || event.target.id == "tradeCategoryContent" || $(event.target).parents("#tradeCategoryContent").length > 0)) {
            hideMenu1();
        }
    }

    $("#tradeCategoryid").click(function () {
        var cityObj = $("#tradeCategoryid");
        var cityOffset = $("#tradeCategoryid").offset();

        $("#tradeCategoryContent").slideDown("fast");
        $("body").bind("mousedown", onBodyDown1);
        return false;
    });

    var setting2 = {
        check: {
            enable: true,
            chkboxType: {"Y": "", "N": ""}
        },
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: beforeClick2,
            beforeCheck: beforeCheck2,
            onCheck: onCheck2
        }
    };

    $.fn.zTree.init($("#serviceTypeTree"), setting2, zNodes2);

    function beforeClick2(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("serviceTypeTree");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    }

    function beforeCheck2(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("serviceTypeTree"),
            nodes = zTree.getCheckedNodes(true),
            parent_checked = treeNode.getParentNode().name, parent = "";

        if(nodes.length > 0){
            parent = nodes[0].getParentNode().name;
        }

        if(parent != "" && parent != parent_checked){
            alert("不能跨类别选择！");
            return false;
        }
    }

    //编辑时文本框回显已有内容
    onCheck2();

    function onCheck2() {
        var zTree = $.fn.zTree.getZTreeObj("serviceTypeTree");

        //因为服务机构树可能为空会造成上边的 onCheck2 初始化失败
        if(zTree != null){
            var nodes = zTree.getCheckedNodes(true),
                v = "", ids = "";
            for (var i = 0, l = nodes.length; i < l; i++) {
                v += nodes[i].name + ",";
                ids += nodes[i].id + ",";
            }
            if (v.length > 0) {
                v = v.substring(0, v.length - 1);
                ids = ids.substring(0, ids.length - 1);
            }
            var input = $("#serviceTypeNames");
            input.attr("value", v);
            var hideInput = $("#serviceTypeIds");
            hideInput.attr("value", ids);
        }
    }

    function hideMenu2() {
        $("#serviceTypeContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown2);
    }

    function onBodyDown2(event) {
        if (!(event.target.id == "serviceTypeNames" || event.target.id == "serviceTypeContent" || $(event.target).parents("#serviceTypeContent").length > 0)) {
            hideMenu2();
        }
    }

    $("#serviceTypeNames").click(function () {
        var cityObj = $("#serviceTypeNames");
        var cityOffset = $("#serviceTypeNames").offset();

        $("#serviceTypeContent").slideDown("fast");
        $("body").bind("mousedown", onBodyDown2);
        return false;
    });

    var setting3 = {
        check: {
            enable: true,
            chkStyle: "radio",
            radioType: "all"
        },
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: beforeClick3,
            onCheck: onCheck3
        }
    };

    $.fn.zTree.init($("#companyTypeTree"), setting3, zNodes3);

    function beforeClick3(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("companyTypeTree");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    }

    //编辑时选中已有内容
    onCheck3();

    function onCheck3() {
        var zTree = $.fn.zTree.getZTreeObj("companyTypeTree"),
            nodes = zTree.getCheckedNodes(true),
            v = "", ids = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            v += nodes[i].name + ",";
            ids += nodes[i].id + ",";
        }
        if (v.length > 0) {
            v = v.substring(0, v.length - 1);
            ids = ids.substring(0, ids.length - 1);
        }
        var input = $("#companyTypeId");
        input.attr("value", v);
        var hideInput = $("#companyTypeHide");
        hideInput.attr("value", ids);
    }

    function hideMenu3() {
        $("#companyTypeContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown3);
    }

    function onBodyDown3(event) {
        if (!(event.target.id == "companyTypeId" || event.target.id == "companyTypeContent" || $(event.target).parents("#companyTypeContent").length > 0)) {
            hideMenu3();
        }
    }

    $("#companyTypeId").click(function () {
        var cityObj = $("#companyTypeId");
        var cityOffset = $("#companyTypeId").offset();

        $("#companyTypeContent").slideDown("fast");
        $("body").bind("mousedown", onBodyDown3);
        return false;
    });

});