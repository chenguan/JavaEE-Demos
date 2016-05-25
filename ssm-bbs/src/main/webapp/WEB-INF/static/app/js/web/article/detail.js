$(function () {

    // 马上报名
    $("#signup").click(function () {
        if (hasLogin) {


            $.ajax({url:ctx + "/article/" + articleId + "/signup", cache:false, success:function (data, status) {
                if (status == "success") {
                    var activities = eval(data);
                    $("#signup-tbody").empty();


                    if (activities.length == 0) {

                        $("#signup-tbody").append('<tr id="signup-tr-' + 0+ '" class="signup-tr"><td>' + (0 + 1) + '</td><td><input type="text" name="name" value="'+contacts+'"/></td><td><input type="text" name="dept" value=""/></td><td><input type="text" name="post" value=""/></td><td><input type="text" name="mobile" value="'+mobile+'"/></td><td><input type="text" name="mail" value="'+email+'"/></td><td><a href="#" class="signup-del">删除</a></td></tr>');


                     //   $("#signup-tbody").append('<tr class="signup-empty"><td colspan="20"><div class="empty">暂无报名记录</div></td></tr>');
                    } else {
                        for (var i = 0; i < activities.length; i++) {
                            var activity = activities[i];
                            if (i % 2 == 0) {
                                $("#signup-tbody").append('<tr id="signup-tr-' + i + '" class="signup-tr"><td>' + (i + 1) + '</td><td><input type="text" name="name" value="'+activity.name+'"/></td><td><input type="text" name="dept" value="'+activity.dept+'"/></td><td><input type="text" name="post" value="'+activity.post+'"/></td><td><input type="text" name="mobile" value="'+activity.mobile+'"/></td><td><input type="text" name="mail" value="'+activity.mail+'"/></td><td><a href="#" class="signup-del">删除</a></td></tr>');
                            } else {
                                $("#signup-tbody").append('<tr id="signup-tr-' + i + '" class="signup-tr oushu"><td>' + (i + 1) + '</td><td><input type="text" name="name" value="'+activity.name+'"/></td><td><input type="text" name="dept" value="'+activity.dept+'"/></td><td><input type="text" name="post" value="'+activity.post+'"/></td><td><input type="text" name="mobile" value="'+activity.mobile+'"/></td><td><input type="text" name="mail" value="'+activity.mail+'"/></td><td><a href="#" class="signup-del">删除</a></td></tr>');
                            }
                        }
                        // 删除
                        $(".signup-del").bind("click", remove);
                    }
                } else {
                    alert("报名失败，请稍后重试！");
                }
            }});
            $("#signup-modal").show();
        } else {
            // 弹出登陆框
            //var url = window.location.href;
            //window.location.href = url.substr(0, url.indexOf("article")) + "login";
            //alert("请成功登录工作台后，再返回当前页进行活动报名！");
            $("#no-login").show();
        }
        return false;
    });

    // 叉掉弹出框
    $("#signup-modal-dismiss").click(function () {
        $("#signup-modal").hide();
        return false;
    });

    // 叉掉弹出框
    $("#login-info-dismiss").click(function () {
        $("#no-login").hide();
        return false;
    });

    // 添加
    $("#signup-add").click(function () {
        if ($(".signup-empty")) {
            $(".signup-empty").remove();
        }
        var lastIndex = $(".signup-tr").length;
        if (lastIndex % 2 == 0) {
            $("#signup-tbody").append('<tr id="signup-tr-' + lastIndex + '" class="signup-tr"><td>' + (lastIndex + 1) + '</td><td><input type="text" name="name" value=""/></td><td><input type="text" name="dept" value=""/></td><td><input type="text" name="post" value=""/></td><td><input type="text" name="mobile" value=""/></td><td><input type="text" name="mail" value=""/></td><td><a href="#" class="signup-del">删除</a></td></tr>');
        } else {
            $("#signup-tbody").append('<tr id="signup-tr-' + lastIndex + '" class="signup-tr oushu"><td>' + (lastIndex + 1) + '</td><td><input type="text" name="name" value=""/></td><td><input type="text" name="dept" value=""/></td><td><input type="text" name="post" value=""/></td><td><input type="text" name="mobile" value=""/></td><td><input type="text" name="mail" value=""/></td><td><a href="#" class="signup-del">删除</a></td></tr>');
        }
        // 删除
        $(".signup-del").bind("click", remove);
        return false;
    });

    // 删除
    $(".signup-del").click(remove);

    function remove() {
        var id = $(this).parent().parent().attr("id");
        $("#" + id).remove();
        // 重整tr的颜色和序号
        var trs = $(".signup-tr");
        for (var i = 0; i < trs.length; i++) {
            $(trs[i]).removeClass("oushu");
            if (i % 2 != 0) {
                $(trs[i]).addClass("oushu");
            }
            $($(trs[i]).children()[0]).html(i + 1);
        }
        return false;
    }

    // 提交报名
    $("#signup-submit").click(function () {
        var trs = $(".signup-tr");
        var users = [];
        for (var i = 0; i < trs.length; i++) {
            var tr = $(trs[i]);
            var user = {};
            user.name = $($(tr.children()[1]).children()[0]).val();
            if (user.name == '') {
                alert("第" + (i + 1) + "行，参与人员必须填写！");
                return false;
            }
            user.dept = $($(tr.children()[2]).children()[0]).val();
            if (user.dept == '') {
                alert("第" + (i + 1) + "行，所在部门必须填写！");
                return false;
            }
            user.post = $($(tr.children()[3]).children()[0]).val();
            /*if (user.post == '') {
                alert("第" + (i + 1) + "行，职位必须填写！");
                return false;
            }*/

            user.mobile = $($(tr.children()[4]).children()[0]).val();
            if (!/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(user.mobile+"")) {
                alert("第" + (i + 1) + "行，联系方式必须正确填写！");
                return false;
            }

            user.mail = $($(tr.children()[5]).children()[0]).val();
            if($($(tr.children()[5]).children()[0]).val().length != 0) {
                var aa = $($(tr.children()[5]).children()[0]).val()+"";
               if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(aa)){
                    alert("第" + (i + 1) + "行，邮箱方式必须正确填写（可以不填）！");
                    return false;
                }
            }
            user.articleid = articleId;
            users[i] = user;

        }

        if (users.length == 0) {
            alert("请填写活动报名信息");
        } else {
            $.post(ctx + "/article/" + articleId + "/signup", {
                json: JSON.stringify(users)
            }, function (data, status) {
                alert("提交成功！");
                $("#signup-modal").hide();
            });

        }

        return false;
    });


})