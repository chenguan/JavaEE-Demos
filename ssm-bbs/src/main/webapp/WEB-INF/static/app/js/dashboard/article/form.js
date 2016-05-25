$(function() {

    $('#content-service').addClass('active open');
    $('#pub_content').addClass('active');

    $('#expiredate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: 1,
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'
    });

    KindEditor.ready(function (K) {
        window.editor = K.create('#body', {
            uploadJson: ctx + '/file/editor',
            fileManagerJson: ctx + '/file/manager'
        });
    });

    var categoryData = [1, 1, 0, 0];

    ajaxValidate();

    function ajaxValidate() {
        var cid = $("#categoryIdInput").val();
        // 拿着栏目id去后台校验需要显示和隐藏的东西
        if (cid != "") {
            $.get(ctx + "/dashboard/article/category/" + cid + "/validation", function (data, status) {
                if (status == "success") {
                    categoryData = eval(data);
                    redValidate();
                    // data[0]标识服务分类
                    if (categoryData[0] == 0) {// 不出现
                        $("#servicetypefield").hide();
                        $("#serviceTypeid").attr("value", "");
                        $("#serviceTypeHide").attr("value", "");
                    } else if (categoryData[0] == 1) {// 可选
                        $("#servicetypefield").show();
                    } else if (categoryData[0] == 2) {// 必填
                        $("#servicetypefield").show();
                    }

                    // data[1]标识所属行业
                    if (categoryData[1] == 0) {// 不出现
                        $("#tradecategoryfield").hide();
                        $("#tradeCategoryid").attr("value", "");
                        $("#tradeCategoryHide").attr("value", "");
                    } else if (categoryData[1] == 1) {// 可选
                        $("#tradecategoryfield").show();
                    } else if (categoryData[1] == 2) {// 必填
                        $("#tradecategoryfield").show();
                    }

                    // data[2]标识是否需要在线报名
                    if (categoryData[2] == 0) {// 不出现
                        $("#isNeed").hide();
                        $("#signup").attr("value", "0");
                        $("#activityPanel").hide();
                        $("#signupoption").attr("selected",true);
                    } else if (categoryData[2] == 2) {// 必填
                        $("#isNeed").show();

                    }

                    // data[3]标识是否显示图片
                    if (categoryData[3] == 0) {// 不出现
                        $("#picture-panel").hide();
                    } else if (categoryData[3] == 2) {// 必填
                        $("#picture-panel").show();
                    }
                }
            });
        } else {
            $("#isNeed").hide();
            $("#signup").attr("value", "0");
            $("#siteid").empty();
            $("#site-div .select2-search-choice").remove();
            $("#picture-panel").hide();
            redValidate();
            return;
        }
    }

    function redValidate() {
        if (categoryData[0] == 2) {
            $("#serviceTypeid-red").show();
        } else {
            $("#serviceTypeid-red").hide();
        }
        if (categoryData[1] == 2) {
            $("#tradeCategoryid-red").show();
        } else {
            $("#tradeCategoryid-red").hide();
        }
    }
    //$("#categoryNameInput").change(function () {
    //    ajaxValidate();
    //});

    //select2
    $('.select2').css('width','100%').select2({allowClear:true});

    //jQuery.validator.addMethod("compareDate", function (value, element) {
    //    var str = /^[0-9]*$/;
    //        if($("#categoryid").get(0).selectedIndex == 0){
    //            var startNum = parseInt($("#publishedtime").val().replace(/-/g, ''), 10);
    //            var endNum = parseInt($("#expiredate").val().replace(/-/g, ''), 10);
    //            return startNum < endNum;
    //        }else{
    //            return true;
    //        }
    //}, "过期日期必须大于发布日期！");

    var $form = $('#article-create-form');
    var file_input = $form.find('input[type=file]');

    // 重新本页面的检验，使之校验readonly
    $.validator.prototype.elements = function () {
        var b = this, c = {};
        //return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function () {
        //    return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
        //})
        return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
            return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength($(this).rules()) ? !1 : (c[this.name] = !0, !0)
        })
    };

    var old_picture = $("input[name='old_picture']").val();
    var old_picture_path = $("input[name='old_picture_path']").val();
    if (old_picture != "") {
        file_input.ace_file_input('show_file_list', [
            {type: 'image', name: old_picture, path: old_picture_path}
        ]);
    }

    $(".remove").click(function(){
        $("input[name='old_picture']").val("");
    });

    $form.validate({
        //ignore: ":hidden",
        // input type=file 为隐藏域，需要校验
        ignore: "",
        rules: {
            title: {
                required: true,
                rangelength: [1, 100]
            },
            categoryNameInput: {
                required: true
            },
            tradeCategoryid: {
                required: function() {return categoryData[1] == 2;}
            },
            serviceTypeid: {
                required: function() {return categoryData[0] == 2;}
            },
            summary: {
                required: true,
                rangelength: [1, 100]
            },
            activitydate: {
                required: function() {return $("#activityPanel").is(":visible");}
            },
            picture2: {
                required: function() {return categoryData[3] == 2 && $("input[name='old_picture']").val() == '';}
            },
            signup: {
                required: function() {return categoryData[2] == 2;}
            },
            source: {
                required: true,
                rangelength: [1, 100]
            },
            expiredate: {
                required: true
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            var value = $.trim($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html());
            if(value == ""){
                Notify.error("正文必须填写！");
                return;
            }
            $("#body").text(value);
            form.submit();
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        },
        focusInvalid : false,
        onfocusout: false,
        errorElement: "span",
        errorClass: "error"
    });

    file_input.ace_file_input({
        style: 'well',
        btn_choose: '点击这里添加图片',
        btn_change: null,
        no_icon: 'ace-icon fa fa-picture-o',
        droppable: false,
        allowExt: ["jpeg", "jpg", "png", "gif"],
        allowMime: ["image/jpeg", "image/jpg", "image/png", "image/gif"],
        maxSize: 2097152,
        thumbnail: 'small'
    });

    file_input.on('file.error.ace', function(event, info) {
        if(info.error_count['size']) Notify.warning('超出最大上传限制。');
        if(info.error_count['ext'] || info.error_count['mime']) Notify.warning('不合法的文件类型。');
        event.preventDefault();
    });

    var setting1 = {
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

    onCheck1(0, 0, 0);

    function onCheck1(e, treeId, treeNode) {
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
            beforeClick: beforeClick2,
            onCheck: onCheck2
        }
    };

    $.fn.zTree.init($("#serviceTypeTree"), setting2, zNodes2);

    function beforeClick2(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("serviceTypeTree");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    }

    onCheck2(0, 0, 0);

    function onCheck2(e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("serviceTypeTree"),
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
        var input = $("#serviceTypeid");
        input.attr("value", v);
        var hideInput = $("#serviceTypeHide");
        hideInput.attr("value", ids);
        $("#serviceTypeid-error").hide();
    }

    function hideMenu2() {
        $("#serviceTypeContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown2);
    }

    function onBodyDown2(event) {
        if (!(event.target.id == "serviceTypeid" || event.target.id == "serviceTypeContent" || $(event.target).parents("#serviceTypeContent").length > 0)) {
            hideMenu2();
        }
    }

    $("#serviceTypeid").click(function () {
        var cityObj = $("#serviceTypeid");
        var cityOffset = $("#serviceTypeid").offset();

        $("#serviceTypeContent").slideDown("fast");
        $("body").bind("mousedown", onBodyDown2);
        return false;
    });

    $("#category").click(function () {
        var cityObj = $("#category");
        var cityOffset = $("#category").offset();

        $("#categoryContent").slideDown("fast");
        $("body").bind("mousedown", onBodyDown3);
        return false;
    });

    var simpleSelectTree = new SimpleSelectTree($("#categoryNameInput"), $("#categoryIdInput"), $("#treePanel"), zNodes, readOnly == "true");

    // 覆写onSelected方法，让其可以选择父节点
    simpleSelectTree.onSelected = function(event, treeId, treeNode) {
        if (!treeNode.isParent) {
            simpleSelectTree.valueInput.val(treeNode.id);
            simpleSelectTree.nameInput.val(treeNode.name);
            simpleSelectTree.treePanel.addClass("hide");
            var date = new Date();
            var expire = treeNode.expire * 24 * 60 * 60 * 1000;
            date.setTime(date.getTime() + expire);
            $("#expiredate").val(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            $("#categoryNameInput-error").hide();
            $("#expiredate-error").hide();
            ajaxValidate();
        }
    };
    // 必须重新加载，否则覆写无效
    simpleSelectTree.reload();

    if ($("select[name='signup']").val() == 1) {
        $("#activityPanel").show();
   }

    // 报名截止日期
    $("select[name='signup']").click(function () {
        if ($(this).val() == 1) {
            $("#activityPanel").show();
        } else {
            $("#activityPanel").hide();
        }
    });

    $('#activitydate').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: 1,
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'
    });
});