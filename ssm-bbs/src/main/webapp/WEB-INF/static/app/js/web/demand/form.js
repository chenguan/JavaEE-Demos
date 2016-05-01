$(function(){

    var result1 = false;
    var result2 = false;
    var result3 = false;
    var result4 = false;
    var result5 = false;
    var result6 = false;
    var result7 = false;
    var result8 = false;

    /*function illegalChar(str)
    {
        var pattern=/[\&]/;
        if(pattern.test(str)){
            return false;
        }
        return true;
    }*/

    KindEditor.ready(function (K) {
        window.editor = K.create('#textarea', {
            height: "300px",
            uploadJson: ctx + '/file/editor',
            fileManagerJson: ctx + '/file/manager',
            items : [
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist']
        });
    });

    $("#tdbody").mouseout(function(){
        var value = $.trim($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html());
        $("#textarea").text(value);
    });

    $("input[name=orgname]").blur(function(){ a(); });

    var a = function(){
        if( $("input[name=orgname]").val().replace(/(^\s*)|(\s*$)/g,"")==""){
            $("span[name=orgname]").remove();
            result1 = false;
            $("input[name=orgname]").parent().append("<span class='u-ico29' name='orgname'>企业名称不能为空！</span>");
        }else{
            if($("input[name=orgname]").val().replace(/(^\s*)|(\s*$)/g,"").length >= 30){
                $("span[name=orgname]").remove();
                result1 = false;
                $("input[name=orgname]").parent().append("<span class='u-ico29' name='orgname'>企业名称过长！请输入2-30之间</span>");
            }else{
                $("span[name=orgname]").remove();
                result1 = true;
/*                if(illegalChar($("input[name=orgname]").val())){
                    $("span[name=orgname]").remove();
                    result1 = true;
                }else{
                    $("span[name=orgname]").remove();
                    result1 = false;
                    $("input[name=orgname]").parent().append("<span class='u-ico29' name='orgname'>请勿输入特殊字符（&）</span>");
                }*/
            }
        }
    }

    $("input[name=contactname]").blur(function(){ b(); });

    var b = function(){
        if( $("input[name=contactname]").val().replace(/(^\s*)|(\s*$)/g,"")==""){
            $("span[name=contactname]").remove();
            result2 = false;
            $("input[name=contactname]").parent().append("<span class='u-ico29' name='contactname'>联系人姓名不能为空！</span>");
        }else{
            if($("input[name=contactname]").val().replace(/(^\s*)|(\s*$)/g,"").length >= 20){
                $("span[name=contactname]").remove();
                result2 = false;
                $("input[name=contactname]").parent().append("<span class='u-ico29' name='contactname'>联系人姓名过长！请输入2-20之间</span>");
            }else{
                $("span[name=contactname]").remove();
                result2 = true;
               /* if(illegalChar($("input[name=contactname]").val())){
                    $("span[name=contactname]").remove();
                    result2 = true;
                }else{
                    $("span[name=contactname]").remove();
                    result2 = false;
                    $("input[name=contactname]").parent().append("<span class='u-ico29' name='contactname'>请勿输入特殊字符（&）</span>");
                }*/
            }
        }
    }

    $("input[name=mobile]").blur(function(){ c(); });

    var c = function(){
        if(/^0?1[3|4|5|8][0-9]\d{8}$/.test($("input[name=mobile]").val())){
            $("span[name=mobile]").remove();
            result3 = true;
        }else{
            $("span[name=mobile]").remove();
            result3 = false;
            $("input[name=mobile]").parent().append("<span class='u-ico29' name='mobile'>手机不能为空，或者格式不对！</span>");

        }
    }

    $("input[name=tel]").blur(function(){ d(); });

    var d = function(){//0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}     /^0?1[3|4|5|8][0-9]\d{8}$/
        if(/0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}/.test($("input[name=tel]").val())){
            $("span[name=tel]").remove();
            result3 = true;
        }else{
            $("span[name=tel]").remove();
            result3 = false;
            $("input[name=tel]").parent().append("<span class='u-ico29' name='tel'>联系电话不能为空,或者格式不对！</span>");
        }
    }

    $("input[name=email]").blur(function(){ e(); });

    var e =function(){
        if(/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test($("input[name=email]").val())){
            $("span[name=email]").remove();
            result4 = true;
        }else{
            $("span[name=email]").remove();
            result4 = false;
            $("input[name=email]").parent().append("<span class='u-ico29' name='email'>邮箱不能为空，或者格式不对！</span>");
        }
    }

    $("input[name=title]").blur(function(){ f(); });

    var f = function(){
        if($("input[name=title]").val().replace(/(^\s*)|(\s*$)/g,"")==""){
            $("span[name=title]").remove();
            result5 = false;
            $("input[name=title]").parent().append("<span class='u-ico29' name='title'>诉求标题不能为空！</span>");
        }else{
            if($("input[name=title]").val().replace(/(^\s*)|(\s*$)/g,"").length >= 100){
                $("span[name=title]").remove();
                result5 = false;
                $("input[name=title]").parent().append("<span class='u-ico29' name='title'>诉求标题过长！请输入1-100之间。</span>");
            }else{
                $("span[name=title]").remove();
                result5 = true;
               /* if(illegalChar($("input[name=title]").val())){
                    $("span[name=title]").remove();
                    result5 = true;
                }else{
                    $("span[name=title]").remove();
                    result5 = false;
                    $("input[name=title]").parent().append("<span class='u-ico29' name='title'>请勿输入特殊字符（&）</span>");
                }*/
            }
        }
    }

    $("textarea[name=body]").blur(function(){ g(); });

    var g =function(){
        if($("textarea[name=body]").val().replace(/(^\s*)|(\s*$)/g,"")==""){
            $("span[name=body]").remove();
            result6 = false;
            $("textarea[name=body]").parent().append("<span class='u-ico29' name='body'>诉求内容不能为空！</span>");
        }else{
            $("span[name=body]").remove();
            result6 = true;
            /*if(illegalChar($("textarea[name=body]").val())){
                $("span[name=body]").remove();
                result6 = true;
            }else{
                $("span[name=body]").remove();
                result6 = false;
                $("textarea[name=body]").parent().append("<span class='u-ico29' name='body'>请勿输入特殊字符（&）</span>");
            }*/
        }
    }

    $("#servicetypeid").mouseleave(function(){ h(); });
    $("#servicetypeidContent").mouseleave(function(){ h(); });

    var h =function(){
        if($("#servicetypeid").val().length==0){
            $("span[name=servicetypeidHide]").remove();
            result8 = false;
            $("#servicetypeid").parent().append("<span class='u-ico29' name='servicetypeidHide'>服务分类不能为空！</span>");
        }else{
            $("span[name=servicetypeidHide]").remove();
            result8 = true;
        }
    }

    $("#captcha").change(function(){
        $.post(ctx + "/demand/check?captcha=" + $(this).val(), function (response) {
            if(response == "true"){
                result7 = true;
                $("#reminder").html("");
            }else{
                result7 = false;
                $("#reminder").html("验证码错误！");
            }
        });
    });

    $("#users-panel").hide();

    $("#submit").click(function(){
        if($("input[name=type]:checked").val() == '1'){
            result8 = true;
        }else{
            result8 = false;
            h();
        }
         if(result1 && result2 && result3 && result4 && result5 && result6 && result7 && result8){
             return true;
         }else{
             a();
             b();
             c();
             d();
             e();
             e();
             f();
             g();
             if($("input[name=type]:checked").val() == '0'){
                 h();
             }
             if(!result7){
                 $("#reminder").html("验证码错误！");
             }
             return false;
         }
    });

    var setting = {
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
            beforeClick: beforeClick,
            onCheck: onCheck
        }
    };

    $.fn.zTree.init($("#servicetypeidTree"), setting, zNodes);

    function beforeClick(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("servicetypeidTree");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    }

    onCheck(0, 0, 0);

    function onCheck(e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("servicetypeidTree"),
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
        var input = $("#servicetypeid");
        input.attr("value", v);
        var hideInput = $("#servicetypeidHide");
        hideInput.attr("value", ids);
        $("#servicetypeidContent").hide();

        if ($("#servicetypeidHide").val() != '') {
            $("#hint").hide();
        } else {
            $("#users-error").show();
            $("#hint").show();
        }
    }

    $("input[name=replace]").click(function() {
        if ($(this).val() == "1") {
            var obj = document.getElementById("users");
            obj.selectedIndex = -1;
            $("#users-panel").hide();
        } else {
            $("#users-panel").show();
            if ($("#servicetypeidHide").val() != '') {
                $("#hint").hide();
            } else {
                $("#users-error").show();
                $("#hint").show();
            }
        }
    });

    $("input[name=type]").click(function() {
        if ($(this).val() == "1") {
            $("#tr_1").hide();
            $("#tr_2").hide();
            $("#users-panel").hide();
        } else {
            $("#tr_1").show();
            $("#tr_2").show();
            }
    });

    var flag = 1;
    $("#servicetypeid").click(function(){
        if(flag == 1){
            $("#servicetypeidContent").show();
            flag = 0;
        }else if(flag == 0){
            $("#servicetypeidContent").hide();
            flag = 1;
        }
    });

    //$().ready(function() {
    //    $("#demand-create-form").validate({
    //        rules: {
    //            orgname: "required",
    //            contactname: "required",
    //            mobile: "required",
    //            tel: "required",
    //            title: "required",
    //            body: "required",
    //            type: "required",
    //            email: {
    //                required: true,
    //                email: true
    //            }
    //        },
    //        messages: {
    //            orgname: {
    //                required: "请输入单位名称"
    //            },
    //            contactname: {
    //                required: "请输入联系人姓名"
    //            },
    //            mobile: {
    //                required: "请输入"
    //            },
    //            tel: {
    //                required: "请输入"
    //            },
    //            title: {
    //                required: "请输入"
    //            },
    //            body: {
    //                required: "请输入"
    //            },
    //            type: {
    //                required: "请输入"
    //            },
    //            email: {
    //                required: "请输入Email地址",
    //                email: "请输入正确的email地址"
    //            }
    //        }
    //
    //    });
    //});

});
