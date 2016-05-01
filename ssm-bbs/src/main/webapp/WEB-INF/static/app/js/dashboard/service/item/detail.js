$(function(){
    $('#performance-evaluation').addClass('active open');

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
        $('#fwdx').html(txt);
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
        $('#fwfs').html(tnt);
    }


    var $form = $('#article-create-form');
    $form.validate({
        submitHandler: function (form, event) {
            event.preventDefault();
            if($(".checkOpinion:checked").val() == 1) {
                $("#status").val('complete');
            }else{
                $("#status").val('back');
                $("#note").val($("#noteArea").val());
                if($("#noteArea").val().length > 100){
                    Notify.warning("退回修改意见请不要超过100个字");
                    return;
                }
            }
            form.submit();
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        focusInvalid : false,
        onfocusout: false,
        errorElement: "span",
        errorClass: "error"
    });


    $(".checkOpinion").click(function(){
        if($(this).val() == 0){
            $("#noteArea").show();
        }else{
            $("#noteArea").hide();
        }
    });

    $("button[type='reset']").click(function(){
        $("#noteArea").val('');
    });

});