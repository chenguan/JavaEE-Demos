<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
</head>
<body>

<div class="navbar navbar-default navbar-fixed-bottom" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <p class="navbar-text navbar-right">
                <a href="#" class="navbar-link" data-toggle="modal" data-target="#signinModal">登录</a>
                <span>&nbsp;|&nbsp;</span>
                <a href="#" class="navbar-link" data-toggle="modal" data-target="#signupModal">注册</a>
            </p>
        </div>
    </div>
</div>
<div class="modal fade" id="signinModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"
                        data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    用户登录
                </h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="regForm1" method="post" action="/test/query">
                    <div class="form-group">
                        <label for="inputName" class="col-sm-2 col-sm-offset-2 control-label">姓名</label>
                        <div class="col-sm-4">
                            <input class="form-control" id="inputName" placeholder="姓名" name="username">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword" class="col-sm-2 col-sm-offset-2 control-label">密码</label>
                        <div class="col-sm-4">
                            <input type="password" class="form-control" id="inputPassword" placeholder="密码" name="password">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭
                </button>
                <button type="submit" class="btn btn-primary" form="regForm1">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<div class="modal fade" id="signupModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close"
                        data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    用户注册
                </h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="regForm2" method="post" action="/test/add">
                    <div class="form-group">
                        <label for="inputName" class="col-sm-2 col-sm-offset-2 control-label">姓名</label>
                        <div class="col-sm-4">
                            <input class="form-control" id="inputName" placeholder="姓名" name="username">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 col-sm-offset-2 control-label">邮箱</label>
                        <div class="col-sm-4">
                            <input type="email" class="form-control" id="inputEmail" placeholder="邮箱" name="useremail">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword" class="col-sm-2 col-sm-offset-2 control-label">密码</label>
                        <div class="col-sm-4">
                            <input type="password" class="form-control" id="inputPassword1" placeholder="密码" name="password">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="inputAvator" class="col-sm-2 col-sm-offset-2 control-label">头像</label>
                        <div class="col-sm-4">
                            <input type="file" name="avator" style="margin-top: 6px">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default"
                        data-dismiss="modal">关闭
                </button>
                <button type="submit" class="btn btn-primary" form="regForm2">
                    提交
                </button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
</body>

</html>