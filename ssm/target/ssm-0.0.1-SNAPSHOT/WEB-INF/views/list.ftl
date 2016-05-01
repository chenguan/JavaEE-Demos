<!DOCTYPE html>
<html>
<head>
    <title>User</title>
    <link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
            <table class="table table-hover">
                <caption>User</caption>
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>邮箱</th>
                    <th>管理</th>
                </tr>
                </thead>
                <tbody>
                <#list users.getData() as u>
                <tr>
                    <td>${u.name}</td>
                    <td>${u.email}</td>
                    <td></td>
                </tr>
                </#list>
                </tbody>
            </table>
            <ul class="pagination">
            <#list 1..users.getTotalPage() as i>
                <li><a href="/test/list?page=${i}">${i}</a></li>
            </#list>
            </ul>
        <#--<#list users as u>-->
        <#--${u_index}. ${u.name}-->
        <#--</#list>-->
        </div>
    </div>
</div>
</body>
</html>