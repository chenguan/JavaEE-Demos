<%--
  Created by IntelliJ IDEA.
  User: 2015-10-28
  Date: 2016/4/14
  Time: 11:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>SpringMVC Demo 首页</title>

    <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>查询商品列表</title>
    <script type="text/javascript">
        function deleteFunc(){
            document.queryForm.action="${pageContext.request.contextPath }/items/deleteItems";
            document.queryForm.submit();
        }
        function queryFunc(){
            document.queryForm.action="${pageContext.request.contextPath }/items/queryItems";
            document.queryForm.submit();
        }
        function updateFunc(){
            document.queryForm.action="${pageContext.request.contextPath }/items/updateItems";
            document.queryForm.submit();
        }
        function addFunc(){
            document.queryForm.action="${pageContext.request.contextPath }/items/addItems";
            document.queryForm.submit();
        }
    </script>
</head>
<body>
<div class="container">
当前用户:${username}
<c:if test="${username!=null }">
    <a href="${pageContext.request.contextPath }/logout.action">退出</a>

</c:if>
<form name="queryForm" action="${pageContext.request.contextPath }/items/queryItems" method="post">
    <table width="100%" border=1 class="table table-bordered table-striped">
        <tr>
            <td>查询条件：<input name="itemsCustom.name"></td>
            <td><input type="button" value="查询" onclick="queryFunc()" class="btn btn-sm btn-success"/></td>
            <td><input type="button" value="批量删除" onclick="deleteFunc()" class="btn btn-sm btn-warning"/></td>
            <td><input type="button" value="添加" onclick="addFunc()" class="btn btn-sm btn-sm"/></td>

            <!-- <td><input type="button" value="批量修改" onclick="updateFunc()"/></td> -->
        </tr>
    </table>
    商品列表：
    <table width="100%" border=1 class="table table-bordered table-striped">
        <tr>
            <td>选择</td>
            <td>商品名称</td>
            <td>商品类型</td>
            <td>商品价格</td>
            <td>生产日期</td>
            <td>商品描述</td>
            <td>操作</td>
            <td>操作</td>
        </tr>
        <c:forEach items="${itemsList }" var="item">
            <tr>
                <td><input type="checkbox" name="items_id" value="${item.id }"></td>
                <td>${item.name }</td>
                <td><select name="itemtype">
                    <c:forEach items="${itemtypes}" var="itemtype">
                        <option value="${itemtype.key}">${itemtype.value}</option>
                    </c:forEach>
                </select>
                </td>
                <td>${item.price }</td>
                <td><fmt:formatDate value="${item.createtime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                <td>${item.detail }</td>

                <td><a href="${pageContext.request.contextPath }/items/editItems?id=${item.id}">修改</a></td>

                <td><a href="${pageContext.request.contextPath }/items/itemDetail/${item.id}">详情</a></td>
            </tr>
        </c:forEach>

    </table>
</form>
</div>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</body>
</html>
