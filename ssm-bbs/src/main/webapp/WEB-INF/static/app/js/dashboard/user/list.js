$(function(){
    $('#user-manage').addClass('active open');
    $('#user-manage-list').addClass('active');

    var $table = $('#user-table');

    $table.on('click', 'a[data-role=lock-user], a[data-role=unlock-user]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');
        var title = $trigger.attr("title");

        if (confirm('确定' + title + ' 吗？')) {
            $.post(target, function(html){
                var $tr = $(html);
                $('#' + $tr.attr('id')).replaceWith($tr);
            })
        }
    });

    $("input[name='advanceSearch']").click(function(){
        if($(this).val() == 1){
            $("#style10").hide();
            $("#style11").show();
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
        }else{
            $("#style12").hide();
            $("#style13").hide();
            $("#style11").hide();

            $("input[name='roleUser']").prop("checked", "");
            $("input[name='roleEnterprise']").prop("checked", "");
            $("input[name='roleEnterprisepro']").prop("checked", "");
            $("input[name='roleAgency']").prop("checked", "");

            $("input[name='roleUser']").prop("disabled", false);
            $("input[name='roleEnterprise']").prop("disabled", false);
            $("input[name='roleEnterprisepro']").prop("disabled", false);
            $("input[name='roleAgency']").prop("disabled", false);
            $("#style10").show();
        }
    });

    /*$("input[name='roleEnterprise']").click(function(){
        if($("input[name='roleEnterprise']").prop("checked")){
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
        }else{
            $("input[name='roleUser']").prop("checked", "");
            $("input[name='roleUser']").prop("disabled", false);
        }
    });*/

    $("input[name='roleEnterprisepro']").click(function(){
        if($("input[name='roleEnterprisepro']").prop("checked")){
            //$("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            //$("input[name='roleUser']").prop("disabled", true);
            $("input[name='roleEnterprise']").prop("disabled", true);
        }else{
            if(!$("input[name='roleAgency']").prop("checked")){
                //$("input[name='roleUser']").prop("checked", "");
                $("input[name='roleEnterprise']").prop("checked", "");
                //$("input[name='roleUser']").prop("disabled", false);
                $("input[name='roleEnterprise']").prop("disabled", false);
            }
        }
    });

    $("input[name='roleAgency']").click(function(){
        if($("input[name='roleAgency']").prop("checked")){
            //$("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            //$("input[name='roleUser']").prop("disabled", true);
            $("input[name='roleEnterprise']").prop("disabled", true);
            $("#style12").show();
            $("#style13").show();
        }else{
            if(!$("input[name='roleEnterprisepro']").prop("checked")){
                //$("input[name='roleUser']").prop("checked", "");
                $("input[name='roleEnterprise']").prop("checked", "");
                //$("input[name='roleUser']").prop("disabled", false);
                $("input[name='roleEnterprise']").prop("disabled", false);
            }
            $("#style12").hide();
            $("#style13").hide();
        }
    });

    var $form = $('#enterprise-form');
    $form.validate({
        rules: {

        },
        submitHandler: function(form, event) {
            event.preventDefault();
            var advanceSearch = $("input:checked[name='advanceSearch']").val();
            var stVal = $("#slt1").val();
            if(advanceSearch == 1){
                $("select[name='roleId']").val("");
                $("input[name='keywords']").val("");
            }

            if(advanceSearch == 1 && stVal == 0){
                var valEnt1 =$("input[name='roleUser']").prop("checked");
                var valEnt2 =$("input[name='roleEnterprise']").prop("checked");
                var valEnt3 =$("input[name='roleEnterprisepro']").prop("checked");
                var valEnt4 =$("input[name='roleAgency']").prop("checked");

                var i = 0;
                if(valEnt1 && !valEnt2 && !valEnt3 && !valEnt4){
                    i = 1;
                }else if(valEnt1 && valEnt2 && !valEnt3 && !valEnt4){
                    i = 2;
                }else if(valEnt1 && valEnt2 && valEnt3 && !valEnt4){
                    i = 3;
                }else if(valEnt1 && valEnt2 && !valEnt3 && valEnt4){
                    i = 4;
                }else if(valEnt1 && valEnt2 && valEnt3 && valEnt4){
                    i = 5;
                }
                $("#searchState").val(i);
            }else if(advanceSearch == 0){
                $("#searchState").val(0);
            }else if(advanceSearch == 1 && stVal == 1){
                $("#searchState").val(9);
                $("#serviceType").val($("#slt2").val());
                $("#serviceChildType").val($("#slt3").val());
            }else if(advanceSearch == 1 && stVal == 2){
                $("#searchState").val(8);
                $("#serviceType").val($("#slt2").val());
                $("#serviceChildType").val($("#slt3").val());
            }else if(advanceSearch == 1 && stVal == 3){
                $("#searchState").val(7);
                $("#serviceType").val($("#slt2").val());
                $("#serviceChildType").val($("#slt3").val());
            }else if(advanceSearch == 1 && stVal == 4){
                $("#searchState").val(6);
            }
            form.submit();
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });

    if(advanceSearch == '1'){
        $("input[name='advanceSearch'][value='1']").prop("checked", "checked");
        $("#style10").hide();
        $("#style11").show();
        var stb ="";
        var stv ="";
        if(searchState == '1'){
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
        }else if(searchState == '2'){
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
        }else if(searchState == '3'){
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            $("input[name='roleEnterprisepro']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
            $("input[name='roleEnterprise']").prop("disabled", true);
        }else if(searchState == '4'){
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            $("input[name='roleAgency']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
            $("input[name='roleEnterprise']").prop("disabled", true);
            $("#style12").show();
            $("#style13").show();
        }else if(searchState == '5'){
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            $("input[name='roleEnterprisepro']").prop("checked", "checked");
            $("input[name='roleAgency']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
            $("input[name='roleEnterprise']").prop("disabled", true);
            $("#style12").show();
            $("#style13").show();
        }else if(searchState == '6'){
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            $("input[name='roleAgency']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
            $("input[name='roleEnterprise']").prop("disabled", true);
            $("#style12").show();
            $("#style13").show();

            $("#slt2 option").remove();
            $("#slt3 option").remove();
            stb += '<option value="">担保机构</option>';
            $("#slt2").append(stb);
            $("#slt3").append(stb);
            $("#slt1").val('4');
        }else if(searchState == '7'){
            $("#slt1").val('3');
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            $("input[name='roleAgency']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
            $("input[name='roleEnterprise']").prop("disabled", true);
            $("#style12").show();
            $("#style13").show();
            $("#slt2 option").remove();
            $("#slt3 option").remove();
            if($("#slt2 option[value='0']").length == 0){
                stb += '<option value="0">--全部--</option>';
            }
            var target = ctx +"/dashboard/dictionary/7";
            $.post(target, function(data){
                var datas = $.parseJSON(data);
                var dictionary = datas.dictionary;
                for(var i=0; i<dictionary.length; i++){
                    if(dictionary[i].id == 219){
                        continue;
                    }
                    stb += '<option value="'+dictionary[i].id+'">'+dictionary[i].value+'</option>';
                }
                $("#slt2").append(stb);
            });

            if($("#slt3 option[value='0']").length == 0){
                stv += '<option value="0">--全部--</option>';
            }

            if(serviceType != 0){
                var target = ctx +"/dashboard/dictionary/"+serviceType;
                $.post(target, function(data){
                    var datas = $.parseJSON(data);
                    var dictionary = datas.dictionary;
                    for(var i=0; i<dictionary.length; i++){
                        stv += '<option value="'+dictionary[i].id+'">'+dictionary[i].value+'</option>';
                    }
                    $("#slt3").append(stv);
                });
            }else{
                $("#slt3").append(stv);
            }

            window.setTimeout(function(){
                $("#slt2").val(serviceType);
            }, 300);

            window.setTimeout(function(){
                $("#slt3").val(serviceChildType);
            }, 300);
        }else if(searchState == '8'){
            $("#slt1").val('2');
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            $("input[name='roleAgency']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
            $("input[name='roleEnterprise']").prop("disabled", true);
            $("#style12").show();
            $("#style13").show();
            $("#slt2 option").remove();
            $("#slt3 option").remove();
            stb = '<option value="219">综合服务</option>';
            $("#slt2").append(stb);
            if($("#slt3 option[value='0']").length == 0){
                stv += '<option value="0">--全部--</option>';
            }
            var target = ctx +"/dashboard/dictionary/219";
            $.post(target, function(data){
                var datas = $.parseJSON(data);
                var dictionary = datas.dictionary;
                for(var i=0; i<dictionary.length; i++){
                    stv += '<option value="'+dictionary[i].id+'">'+dictionary[i].value+'</option>';
                }
                $("#slt3").append(stv);
            });

            window.setTimeout(function(){
                $("#slt3").val(serviceChildType);
            }, 300);
        }else if(searchState == '9'){
            $("#slt1").val('1');
            $("input[name='roleUser']").prop("checked", "checked");
            $("input[name='roleEnterprise']").prop("checked", "checked");
            $("input[name='roleAgency']").prop("checked", "checked");
            $("input[name='roleUser']").prop("disabled", true);
            $("input[name='roleEnterprise']").prop("disabled", true);
            $("#style12").show();
            $("#style13").show();
            $("#slt2 option").remove();
            $("#slt3 option").remove();
            if($("#slt2 option[value='0']").length == 0){
                stb += '<option value="0">--全部--</option>';
            }
            var target = ctx +"/dashboard/dictionary/7";
            $.post(target, function(data){
                var datas = $.parseJSON(data);
                var dictionary = datas.dictionary;
                for(var i=0; i<dictionary.length; i++){
                    if(dictionary[i].id == 219){
                        continue;
                    }
                    stb += '<option value="'+dictionary[i].id+'">'+dictionary[i].value+'</option>';
                }
                $("#slt2").append(stb);
            });

            if($("#slt3 option[value='0']").length == 0){
                stv += '<option value="0">--全部--</option>';
            }

            if(serviceType != 0){
                var target = ctx +"/dashboard/dictionary/"+serviceType;
                $.post(target, function(data){
                    var datas = $.parseJSON(data);
                    var dictionary = datas.dictionary;
                    for(var i=0; i<dictionary.length; i++){
                        stv += '<option value="'+dictionary[i].id+'">'+dictionary[i].value+'</option>';
                    }
                    $("#slt3").append(stv);
                });
            }else{
                $("#slt3").append(stv);
            }

            window.setTimeout(function(){
                $("#slt2").val(serviceType);
            }, 300);

            window.setTimeout(function(){
                $("#slt3").val(serviceChildType);
            }, 300);
        }
    }else{
        $("#style10").show();
    }

    $("#slt1").change(function(){
        var str = "";
        var stz = "";
        var val = $(this).val();
        if(val == 4){
            $("#slt2 option").remove();
            $("#slt3 option").remove();
            str += '<option value="">担保机构</option>';
            $("#slt2").append(str);
            $("#slt3").append(str);
        }else if(val == 3){
            $("#slt2 option").remove();
            $("#slt3 option").remove();

            if($("#slt2 option[value='0']").length == 0){
                stz += '<option value="0">--全部--</option>';
            }

            if($("#slt3 option[value='-1']").length == 0){
                str += '<option value="0">--全部--</option>';
                $("#slt3").append(str);
            }

            var target = ctx +"/dashboard/dictionary/7";
            $.post(target, function(data){
                var datas = $.parseJSON(data);
                var dictionary = datas.dictionary;
                for(var i=0; i<dictionary.length; i++){
                    if(dictionary[i].id == 219){
                        continue;
                    }
                    stz += '<option value="'+dictionary[i].id+'">'+dictionary[i].value+'</option>';
                }
                $("#slt2").append(stz);
            });
        }else if(val == 2){
            $("#slt2 option").remove();
            $("#slt3 option").remove();
            str += '<option value="219">综合服务</option>';
            $("#slt2").append(str);
            if($("#slt3 option[value='0']").length == 0){
                stz += '<option value="0">--全部--</option>';
            }

            var target = ctx +"/dashboard/dictionary/219";
             $.post(target, function(data){
                 var datas = $.parseJSON(data);
                 var dictionary = datas.dictionary;
                 for(var i=0; i<dictionary.length; i++){
                     stz += '<option value="'+dictionary[i].id+'">'+dictionary[i].value+'</option>';
                 }
                 $("#slt3").append(stz);
             });
        }else if(val == 1){
            $("#slt2 option").remove();
            $("#slt3 option").remove();

            if($("#slt2 option[value='0']").length == 0){
                stz += '<option value="0">--全部--</option>';
            }

            if($("#slt3 option[value='-1']").length == 0){
                str += '<option value="0">--全部--</option>';
                $("#slt3").append(str);
            }

            var target = ctx +"/dashboard/dictionary/7";
            $.post(target, function(data){
                var datas = $.parseJSON(data);
                var dictionary = datas.dictionary;
                for(var i=0; i<dictionary.length; i++){
                    if(dictionary[i].id == 219){
                        continue;
                    }
                    stz += '<option value="'+dictionary[i].id+'">'+dictionary[i].value+'</option>';
                }
                $("#slt2").append(stz);
            });
        }else if(val == -1){
            $("#slt2 option").remove();
            $("#slt3 option").remove();
            if($("#slt2 option[value='0']").length == 0){
                stz += '<option value="">--全部--</option>';
                $("#slt2").append(stz);
            }
            if($("#slt3 option[value='0']").length == 0){
                str += '<option value="">--全部--</option>';
                $("#slt3").append(str);
            }
        }
    });

    $("#slt2").change(function(){
        var str = "";
        var val = $(this).val();
        $("#slt3 option:not(:first-child)").remove();
        if(val != 0) {
            var target = ctx +"/dashboard/dictionary/"+val;
            $.post(target, function (data) {
                var datas = $.parseJSON(data);
                var dictionary = datas.dictionary;
                for (var i = 0; i < dictionary.length; i++) {
                    str += '<option value="' + dictionary[i].id + '">' + dictionary[i].value + '</option>';
                }
                $("#slt3").append(str);
            });
        }
    });
});