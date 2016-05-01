<#--<#import "/spring.ftl" as spring/>-->
<!DOCTYPE html>
<html lang="en" class="no-js" ng-app="login">

<head>

    <meta charset="utf-8">
    <title>用户登录</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <#assign basePath=request.contextPath>
    <!-- CSS -->
    <link rel="stylesheet" href="js/login/css/reset.css">
    <link rel="stylesheet" href="js/login/css/supersized.css">
    <link rel="stylesheet" href="js/login/css/style.css">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="/js/html5.js"></script>
    <![endif]-->

</head>

<body ng-controller="loginCtrl">

<div class="page-container">
    <h1>用户登录</h1>
    <form action="" method="post">
        <#--<@spring.bind "command.name"/>-->
        <input type="text" name="username" class="username" placeholder="用户名">
        <#--<#list spring.status.errorMessages as error> <b>${error}</b> <br> </#list>-->
        <input type="password" name="password" class="password" placeholder="密码">
        <button type="submit" ng-click="login();">登录</button>
        <div class="error"><span>+</span></div>
    </form>
    <div class="connect">
        <p>Or connect with:</p>
        <p>
            <a class="facebook" href="http://www.facebook.com"></a>
            <a class="twitter" href="http://www.twitter.com"></a>
        </p>
    </div>
</div>


<!-- Javascript -->
<script src="js/jquery/jquery.min.js"></script>
<script src="js/login/js/supersized.3.2.7.min.js"></script>
<script src="js/login/js/supersized-init.js"></script>
<script src="js/login/js/scripts.js"></script>
<script src="js/angular/angular.js"></script>
<script type="text/javascript">
    angular.module('login', [])
            .controller('loginCtrl', ['$scope', '$http', function($scope, $http) {
                $scope.login = function() {
                    $http({
                        method: 'post',
                        url: '/user/login',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: {}
                    }).success(function(data) {
                        alert(data);
                    }).error(function() {
                        alert('login failed!');
                    });
                };
            }]);
</script>
</body>

</html>

