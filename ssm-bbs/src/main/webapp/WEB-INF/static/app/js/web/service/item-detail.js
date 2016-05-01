$(function(){
    //alert(fwfs+"11111111"+fwdx);
    if(fwdx != ''){
        var txt='';
        if(fwdx.indexOf("1") != -1){
            txt+=' 微型企业,';
        }
        if(fwdx.indexOf("2") != -1){
            txt+=' 小型企业,';
        }
        if(fwdx.indexOf("3") != -1){
            txt+=' 中型企业,';
        }
        if(fwdx.indexOf("4") != -1){
            txt+=' 大型企业,';
        }
        if(fwdx.indexOf("5") != -1){
            txt+=' 创业个人或团队,';
        }
        if(fwdx.indexOf("6") != -1){
            txt+=' 个体工商户,';
        }
        if(fwdx.indexOf("7") != -1){
            txt+=' 事业单位,';
        }
        if(fwdx.indexOf("8") != -1){
            txt+=' 社会团体,';
        }
        if(fwdx.indexOf("9") != -1){
            txt+=' 民办非企业,';
        }
        if(fwdx.indexOf("10") != -1){
            txt+=' 其他,';
        }
        txt=txt.substring(0, txt.length-1);
        $('#serviceobject').html(txt);
    }

    if(fwfs != ''){
        var tnt='';
        if(fwfs.indexOf("1") != -1){
            tnt+=' 柜台式服务,';
        }
        if(fwfs.indexOf("2") != -1){
            tnt+=' 电话服务,';
        }
        if(fwfs.indexOf("3") != -1){
            tnt+=' 上门服务,';
        }
        if(fwfs.indexOf("4") != -1){
            tnt+=' 刊物服务,';
        }
        if(fwfs.indexOf("5") != -1){
            tnt+=' 信函服务,';
        }
        if(fwfs.indexOf("6") != -1){
            tnt+=' 网络服务,';
        }
        if(fwfs.indexOf("7") != -1){
            tnt+=' 其他服务,';
        }

        tnt=tnt.substring(0, tnt.length-1);
        $('#servicemode-content').html(tnt);
    }

    // 服务方式详情
    $("#servicemode").click(function () {
        var content = $("#servicemode-content").text();
        $("#popup-modal-name").text("详情：");
        $("#popup-modal-title").text("服务方式");
        $("#popup-modal-content").text(content);
        $("#popup-modal").show();
        return false;
    });

    // 服务内容详情
    $("#serviceflow").click(function () {
        var content = $("#serviceflow-content").text();
        $("#popup-modal-name").text("详情：");
        $("#popup-modal-title").text("服务内容");
        $("#popup-modal-content").text(content);
        $("#popup-modal").show();
        return false;
    });

    // 收费模式详情
    $("#chargemode").click(function () {
        var content = $("#chargemode-content").text();
        $("#popup-modal-name").text("详情：");
        $("#popup-modal-title").text("收费模式");
        $("#popup-modal-content").text(content);
        $("#popup-modal").show();
        return false;
    });

    /*$("#seek").attr("href","/service/"+code+"/item");

    $("#seekinput").change(function(){
        $("#seek").attr("href","/service/"+code+"/item?itemName="+$(this).val());
    });*/

});