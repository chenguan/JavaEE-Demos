<%@ page pageEncoding="UTF-8" %>
<%@ include file="common/config.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <title>Sample - 注册</title>
    <%@ include file="common/meta.jsp" %>
    <%@ include file="common/style.jsp" %>
</head>
<body>

<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand">Sample</a>
        </div>
    </div>
</nav>

<div class="container">
    <h1>欢迎使用 Sample</h1>
    <div class="row">
        <div class="col-md-4">
            <form id="registerForm" class="form-horizontal">
                <div class="form-group">
                    <label for="username" class="col-md-4 control-label">用户名：</label>
                    <div class="col-md-8">
                        <input type="text" id="username" name="username" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-md-4 control-label">密码：</label>
                    <div class="col-md-8">
                        <input type="password" id="password" name="password" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-md-4 control-label">手机号码：</label>
                    <div class="col-md-8">
                        <input type="text" id="mobile" name="mobile" class="form-control"/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-md-4 control-label">验证码：</label>
                    <div class="col-md-4">
                        <input type="text" id="verificationCode" name="verificationCode" class="form-control"/>
                    </div>
                    <div class="col-md-4">
                        <img alt="" data-source-url="/code?source=1" >
                    </div>
                </div>
                <div class="form-group">
                	<div class="row">
	                     <div class="col-md-offset-4 col-md-8">
	                        <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-sign-up"></i>立即注册</button>
	                    </div>
                	</div>
                </div>
            </form>
        </div>
    </div>
</div>

<%@ include file="common/script.jsp" %>

<script>
    $(function () {
        var $username = $('#username');
        var $password = $('#password');
		var $mobile = $('#mobile');
        var $verificationCode = $('#verificationCode');
        
        var username = $.cookie(Cookie.USERNAME);
        if (username) {
            $username.val(username);
            $password.focus();
        } else {
            $username.focus();
        }

        $('#registerForm').submit(function () {
            Ajax.postForm({
                url: '${API}/register',
                data: {
                    'username': $username.val(),
                    'password': $password.val(),
                    'mobile': $mobile.val(),
                    'verificationCode': $verificationCode.val()
                },
                beforeSend: function () {
                    if ($username.val() == '') {
                        alert('请输入用户名！');
                        $username.focus();
                        return false;
                    }
                    if ($password.val() == '') {
                        alert('请输入密码！');
                        $password.focus();
                        return false;
                    }
                    if ($mobile.val() == '') {
                        alert('请输入手机号码！');
                        $mobile.focus();
                        return false;
                    }
                    if ($verificationCode.val() == '') {
                        alert('请输入验证码！');
                        $verificationCode.focus();
                        return false;
                    }
                },
                success: function (response) {
                    if (response.meta.success) {
						alert('注册成功！')                        
                        location.href = '${CTX}/login';
                    } else {
                        alert('用户名或密码有误！');
                    }
                }
            });
            return false;
        });
    });
</script>

</body>
</html>
