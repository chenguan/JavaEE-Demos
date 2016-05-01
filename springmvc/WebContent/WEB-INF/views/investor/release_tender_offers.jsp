<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="renderer" content="webkit" />
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge,chrome=1" />
    <link rel="stylesheet" type="text/css" href="/stylesheets/business-header.css">
    <link rel="stylesheet" type="text/css" href="/stylesheets/customer-footer.css">
    <link rel="stylesheet" type="text/css" href="/stylesheets/release_tender_offers.css">
    <title>股权发布</title>

</head>
<body>
<jsp:include page="investor-header.jsp"></jsp:include>
<div id="main_body_m">
    <div id="swap">
        <div id="list">
            <div id="list-title">
                <span>意向发布</span>
            </div>
            <jsp:include page="release-debt-left-nav.jsp"></jsp:include>

        </div>

        <div class="main_body">
            <div id="main_first">
                <div class="body_title">
                    基本信息
                </div>
                <hr >
                <div class="first">
                    <p >
                        姓名：自动获取<br/>
                        所在地区：自动获取<br/>
                        产品类型：股权投资<br/>
                    </p>
                </div>
                <div class="first">
                    <p >
                        投资地区：自动获取<br/>
                        资金主体：自动获取<br/>
                        投资行业：自动获取<br/>
                    </p>
                </div>
                <div class="input_text">
                    <form class="input_form">
                        <label >投资金额：</label>
                        <input class="input" type="text"/>
                        <label> — </label>
                        <input class="input" type="text"/>
                        <label>万</label>
                    </form>
                    <form >
                        <label >投资年限：</label>
                        <input class="input" type="text"/>
                        <label> 年 </label>
                    </form>
                </div>

            </div>
            <div class="main_first">
                <div class="body_title">
                    更多信息
                </div>
                <hr>
                <div class="input_text">
                    <form class="input_form">
                        <label >参股比例:</label>
                        <input class="input" type="text"/>
                        <label> — </label>
                        <input class="input" type="text"/>
                        <label>%</label>
                    </form>
                    <form >
                        <label >投资阶段:</label>
                        <select>
                            <option value="看书">看书</option>
                            <option value="旅游" selected="selectd">种子</option>
                            <option value="运动">运动</option>
                            <option value="购物">购物</option>
                        </select>
                    </form>
                    <form class="input_form">
                        <label >要求提供文件:</label>
                        <input class="input_doc" type="text"/>
                        <br/>
                        <div class="input_textarea"> 投资要求概述: </div>
                        <textarea rows="7" cols="60"></textarea>
                    </form>
                </div>
                <div id="button">
                    <a>发布</a>
                </div>

            </div>
        </div>
    </div>
</div>



<div id="footer">
</div>
<script type="text/javascript">
  window.onload = function() {
	  var flag = ${flag};
	  var navItemList = document.getElementsByClassName('nav-item');
	  navItemList[flag].className = navItemList[flag].className + ' active';
  }
</script>
</body>
</html>