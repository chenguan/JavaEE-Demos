<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
 
<!DOCTYPE html>
<html lang="en">
<head>
	<link rel="stylesheet" href="/stylesheets/business-header.css">
	<link rel="stylesheet" type="text/css" href="/stylesheets/task1.css">
	<link rel="stylesheet" type="text/css" href="/stylesheets/finacing-publish.css">
	<link rel="stylesheet" type="text/css" href="/stylesheets/customer-footer.css">
	<title>意向发布</title>
</head>
<body>
	<jsp:include page="business-header.jsp"></jsp:include>
    <div class="wrap">
        <jsp:include page="finance-publish-sidenav.jsp"></jsp:include>
    	<div class="main">
            <form action="#" method="post">
        		<div class="basic_info">
        			<p class="tit">基本信息</p>
        			<div class="left fl">
        				<p>公司名称：<span>自行获取</span></p>
    					<p>公司注册时间：<span>自行获取</span></p>
    					<p>产品类型：<span>自行获取</span></p>
        			</div><!--left-->
        			<div class="right fr">
        				<p>公司注册地区：<span>自行获取</span></p>
    					<p>公司注册资本：<span>自行获取</span></p>
    					<p>所属行业：<span>自行获取</span></p>
        			</div><!--right-->
        			<div class="buttom">
    	    			<p>
    	    				发行金额：
    	    				<input type="text" >
    	    				—
    	    				<input type="text">
    	    				万
    	    			</p>
    	    			<p>
    	    				<label>发行年限：</label>
    	    				<input type="text" id="year">
    	    				年
    	    			</p>
    	    			<p>
                            <label for="text">发行完成:</label>
    	    				<textarea id="textarea"  cols=50 rows=6 >
                            </textarea>
                        </p>
    	    		</div>
        		</div>
        		<div class="more_info">
        			<p class="tit">更多信息</p>
                    <div class="left fl">
                         <p> 
                            资金方占股比例：
                            <input class="por" type="text">
                            —
                            <input class="por" type="text">
                            %
                         </p>
                         <p>
                             投资退出方式：
                             <input class="exit" type="text">
                         </p>
                         <p>
                             项目所处阶段:
                            <input class="stage" type="text">
                         </p>
                         <p>
                             最短退出年限:
                            <input class="short" type="text">
                         </p>
                         <p>
                             担保方:
                            <input class="ensure" type="text">
                         </p>
                    </div><!--left-->
                    <div class="right right1 fl">
                        <p>
                            企业当前净资产:
                            <input  class="pro" type="text">
                            万
                        </p>
                        <p>
                             去年营业额：
                            <input class="trunover" type="text">
                            万
                        </p>
                        <p>
                            公司净利润：
                            <input  class="profits" type="text">
                            万
                        </p>
                        <p>
                            投资门槛：
                            <input type="text" class="threshold">
                            万
                        </p>
                        <p>
                            最低追加资金:
                            <input type="text" class="add">
                            万
                        </p>
                    </div>
        		</div>
                <input class="submit" type="submit" value="发布">
            </form>
    	</div>
    </div>
     <div id="footer">
        <div id="foot-list">
        </div>
    </div>
</body>
</html>