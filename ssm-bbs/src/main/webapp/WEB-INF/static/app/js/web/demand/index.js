$(function(){

    var form = $("hide-form");

    $("#demandno").attr("readonly","readonly");
    $("#demandtoken").attr("readonly","readonly");

    $("input[name=radio]").click(function(){
        if($("input[name=radio]:checked").val() == "search"){
            $("#demandno").removeAttr("readonly");
            $("#demandtoken").removeAttr("readonly");
        }
        if($("input[name=radio]:checked").val() == "login"){
            $("#demandno").attr("readonly","readonly");
            $("#demandtoken").attr("readonly","readonly");
        }
        if($("input[name=radio]:checked").val() == "skip"){

            $("#demandno").attr("readonly","readonly");
            $("#demandtoken").attr("readonly","readonly");
        }
    });

    $("#select-type").click(function () {
        var type = $("input[name=radio]:checked").val();
        if (type == "login") {
            self.location.href = ctx+"/dashboard/demand/create";
        } else if(type == "search") {
            if( $("#demandtoken").val().replace(/(^\s*)|(\s*$)/g,"") == "" || $("#demandno").val().replace(/(^\s*)|(\s*$)/g,"") == ""){
                alert("处理号或密码不能为空！");
                return ;
            }
            document.getElementById('demand-detail-form').submit();
        }else if(type == "skip") {
            if(userlog){
                self.location.href = ctx+"/dashboard/demand/create";
                return;
            }
            self.location.href = ctx+"/demand/form";
        }
        return false;
    });

    if(message != ''){
        $("#demandno").removeAttr("readonly");
        $("#demandtoken").removeAttr("readonly");
        $("input[value=search]").attr("checked", 'true');
        alert("查无此诉求！");
    }

});

