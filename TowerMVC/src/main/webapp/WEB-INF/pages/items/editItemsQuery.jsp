<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
		document.queryForm.action="${pageContext.request.contextPath }/items/deleteItems.action";
		document.queryForm.submit();
	}
	function queryFunc(){
		document.queryForm.action="${pageContext.request.contextPath }/items/queryItems.action";
		document.queryForm.submit();
	}
	function updateFunc(){
		document.queryForm.action="${pageContext.request.contextPath }/items/updateItems.action";
		document.queryForm.submit();
	}
</script>
</head>
<body> 
<form name="queryForm" action="${pageContext.request.contextPath }/items/queryItems.action" method="post">
<table width="100%" border=1>
<tr>
<td>查询条件：<input name="itemsCustom.name"></td>
<td><input type="button" value="查询" onclick="queryFunc()"/></td>
<td><input type="button" value="批量修改" onclick="updateFunc()"/></td>
</tr>
</table>
商品列表：
<table width="100%" border=1>
<tr>
	<td>选择</td>
	<td>商品名称</td>
	<td>商品价格</td>
	<td>生产日期</td>
	<td>商品描述</td>
	<td>操作</td>
</tr>
<c:forEach items="${itemsCustomList }" var="item" varStatus="status">
<tr>
	<td><input type="text" name="itemsCustomList[${status.index}].name" value="${item.name }"/></td>
	<td><input type="text" name="itemsCustomList[${status.index}].price" value="${item.price }"/></td>
	<td><input type="text" name="itemsCustomList[${status.index}].createtime" value="<fmt:formatDate value="${item.createtime}" pattern="yyyy-MM-dd HH:mm:ss"/>"/></td>
	<td><input type="text" name="itemsCustomList[${status.index}].detail" value="${item.detail }"/></td>

</tr>
</c:forEach>

<tr>
	<td>姓名</td>
	<td>年龄</td>
</tr>

<tr>
	<td><input type="text" name="itemInfo['name']" value="${itemInfo.name }"/></td>
	<td><input type="text" name="itemInfo['price']" value="${itemInfo.price }"/></td>	
</tr>
</table>
</form>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</body>

</html>