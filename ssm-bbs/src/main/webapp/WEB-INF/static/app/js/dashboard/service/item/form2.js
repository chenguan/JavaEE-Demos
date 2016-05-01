$(function(){
    $('#performance-evaluation').addClass('active open');
    $('#inner_service_item').addClass('active');

    jQuery.validator.addMethod("isCheckBox", function (value) {
        var checked;
        check("input[name=serviceobject]");
        var serviceobjectChecked = checked ;
        check("input[name=servicemode]");
        var servicemodeChecked = checked ;
        function check(name){
            $(name).each(function(){
                if(this.checked==true){
                    checked = true;
                    return false;
                }else{
                    checked = false;
                }
            });
        };
        return serviceobjectChecked&&servicemodeChecked;
    }, function(){
        Notify.error("必须选择一项服务对象和一项服务方式！");
    });

    var $form = $('#serviceItem-create-form');
    $form.validate({
        rules: {
            serviceclass:{
                required: true
            },
            linkman: {
                required: true,
                rangelength: [1, 32]
            },
            telephone: {
                required: true,
                isTel:true
            },
            mobilephone: {
                required: true,
                isMobile:true
            },
            email: {
                email:true
            },
            servicemode: {
                isCheckBox:true
            },
            serviceflow: {
                rangelength: [1, 2000]
            },
            chargemode: {
                rangelength: [1, 2000]
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            if($(".titleOption:checked").val() == 1) {
                $("#itemname").val($("#item11").val());
            }else{
                if($("#item21 option:selected").text() != '--服务项目--' ){
                    $("#itemname").val($("#item21 option:selected").text());
                }
            }

            if($("#itemname").val() == '' ){
                Notify.warning("服务名称不能为空");
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

    /*var setting2 = {
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
    }

    function hideMenu2() {
        $("#serviceTypeContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown2);
    }

    function onBodyDown2(event) {
        if (!(event.target.id == "serviceTypeid" || event.target.id == "serviceTypeContent" || $(event.target).parents("#serviceTypeContent").length > 0)) {
            hideMenu2();
        }
    }*/

    /*$("#serviceTypeid").click(function () {
        var cityObj = $("#serviceTypeid");
        var cityOffset = $("#serviceTypeid").offset();

        $("#serviceTypeContent").slideDown("fast");
        $("body").bind("mousedown", onBodyDown2);
        return false;
    });

    if($("#serviceclass").val() != ''){
        $("#serviceTypeid").attr("value", $("#servicename").val());
        $("#serviceTypeHide").attr("value", $("#serviceclass").val());

        var zTree = $.fn.zTree.getZTreeObj("serviceTypeTree");
        var nodes = zTree.getNodes();
        for(var n = 0; n < nodes.length; n++){
            for(var m = 0; m < nodes[n].children.length; m++){
                if(nodes[n].children[m].id == $("#serviceclass").val()){
                    var tid = nodes[n].children[m].tId;
                    var tnodes = zTree.getNodeByTId(tid);
                    tnodes.checked = 'true'
                    zTree.updateNode(tnodes);
                }
            }
        }
    }*/

    $(".titleOption").click(function(){
        if($(this).val() == 1){
             $("#item1").show();
             $("#item2").hide();
        }else{
             $("#item1").hide();
             $("#item2").show();
        }
    });

    $("#item21").change(function(){
        var id = $(this).val();
        if(id == ''){
            $("input[type='checkbox']").prop("checked", "");
            $("#serviceflow").val('');
            $("#chargemode").val('');
            rerutn;
        }
        var target = ctx +"/dashboard/service/item2/"+id+"/content";
        $.post(target, function(data){
            var item = $.parseJSON(data);
            //$("#serviceTypeid").attr("value", item.serviceItem.servicename);
            //$("#serviceTypeHide").attr("value", item.serviceItem.serviceclass);
            $("#serviceclass").val(item.serviceItem.serviceclass);
            $("input[type='checkbox']").prop("checked", "");

            if(item.serviceItem.serviceobject != ''){
                var serviceobject = item.serviceItem.serviceobject;
                var servObj = serviceobject.split(",");
                for(var i = 0; i < servObj.length; i++){
                    if(servObj[i] == 1){
                        $(".serviceobject[value='1']").prop("checked", "checked")
                    }
                    if(servObj[i] == 2){
                        $(".serviceobject[value='2']").prop("checked", "checked")
                    }
                    if(servObj[i] == 3){
                        $(".serviceobject[value='3']").prop("checked", "checked")
                    }
                    if(servObj[i] == 4){
                        $(".serviceobject[value='4']").prop("checked", "checked")
                    }
                    if(servObj[i] == 5){
                        $(".serviceobject[value='5']").prop("checked", "checked")
                    }
                    if(servObj[i] == 6){
                        $(".serviceobject[value='6']").prop("checked", "checked")
                    }
                    if(servObj[i] == 7){
                        $(".serviceobject[value='7']").prop("checked", "checked")
                    }
                    if(servObj[i] == 8){
                        $(".serviceobject[value='8']").prop("checked", "checked")
                    }
                    if(servObj[i] == 9){
                        $(".serviceobject[value='9']").prop("checked", "checked")
                    }
                    if(servObj[i] == 10){
                        $(".serviceobject[value='10']").prop("checked", "checked")
                    }

                }
            }

            if(item.serviceItem.servicemode != ''){
                var servicemode = item.serviceItem.servicemode;
                var mode = servicemode.split(",");
                for(var i = 0; i < mode.length; i++){
                    if(mode[i] == 1){
                        $(".servicemode[value='1']").prop("checked", "checked")
                    }
                    if(mode[i] == 2){
                        $(".servicemode[value='2']").prop("checked", "checked")
                    }
                    if(mode[i] == 3){
                        $(".servicemode[value='3']").prop("checked", "checked")
                    }
                    if(mode[i] == 4){
                        $(".servicemode[value='4']").prop("checked", "checked")
                    }
                    if(mode[i] == 5){
                        $(".servicemode[value='5']").prop("checked", "checked")
                    }
                    if(mode[i] == 6){
                        $(".servicemode[value='6']").prop("checked", "checked")
                    }
                    if(mode[i] == 7){
                        $(".servicemode[value='7']").prop("checked", "checked")
                    }

                }
            }

            $("#serviceflow").val(item.serviceItem.serviceflow);
            $("#chargemode").val(item.serviceItem.chargemode);
        })
    });

});