$(function(){
    $("#apply-agency").click(function () {
        if(user == 0){
            window.location.href=ctx+"/login";
        }
        $.get(ctx+"/apply/check/rolernterprise", function(data){
            if(data == "false"){
                if(confirm("该用户不是认证企业，是否去认证页面？。")){
                    window.location.href=ctx+"/dashboard/user/profile/approval";
                };
                return;
            }else{
                $.get(ctx+"/apply/check/agency", function(data){
                    if(data){
                        window.location.href=ctx+"/dashboard/apply";
                        return;
                    }else{
                        alert("申报暂未开始！");
                        return;
                    }
                });
            }
        });
    });

    $("#apply-pro").click(function () {
        if(user == 0){
            window.location.href=ctx+"/login";
        }
        $.get(ctx+"/apply/check/rolernterprise", function(data){
            if(data == "false"){
                if(confirm("该用户不是认证企业，是否去认证页面？。")){
                    window.location.href=ctx+"/dashboard/user/profile/approval";
                }
                return;
            }else{
                $.get(ctx+"/apply/check/enterprise", function(data){
                    if(data){
                        window.location.href=ctx+"/dashboard/apply";
                        return;
                    }else{
                        alert("申报暂未开始！");
                        return;
                    }
                });
            }
        });
    });

});
