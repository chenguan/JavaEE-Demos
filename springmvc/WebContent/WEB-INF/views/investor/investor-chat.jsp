<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html >
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-COMPATIBLE" content="IE=edge,chrome=1" />
    <link rel="stylesheet" type="text/css" href="/stylesheets/invest-header.css">
    <link rel="stylesheet" type="text/css" href="/stylesheets/invest-chat.css">
    <link rel="stylesheet" type="text/css" href="/stylesheets/chat-fonts.css">
    <link rel="stylesheet" type="text/css" href="/stylesheets/customer-footer.css">
   
    <title>投资者业务洽谈</title>
</head>

<body>
    <jsp:include page="investor-header.jsp"></jsp:include>
    <div id="main">
        <div id="content">
            <div id="first-galance">
                <div id="chat-title">
  
                    <div data-uid="${session}" id="title">
                        <span>
	    					<a href="" title="">王女士，欢迎您进行业务洽谈</a>
	    				</span>
                    </div>
                    <div id="show-hidden">
                        <span> 
	    					<a href="javascript:void(0)" title="">隐藏业务洽谈信息</a>
	    				</span>
                    </div>
                </div>
                <div id="to-list">
                    <ul>
                        <li>
                            <span class="to-one">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                            <span class="to-one" data-form="f2">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                            <span class="to-one" data-form="f3">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                            <span class="to-one" data-form="f4">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                            <span class="to-one" data-form="f5">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                            <span class="to-one">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                        </li>
                        <li>
                            <span class="to-one">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士" >联系</a>
	            				</span>
                            </span>
                            <span class="to-one">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                            <span class="to-one">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                            <span class="to-one">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                            <span class="to-one">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                            <span class="to-one">
	            				<span class="name">王女士</span>
                            <span class="connect-btn">
	            					<a href="javascript:void(0)" data-form="王女士" data-nickname="王女士">联系</a>
	            				</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="chat-area">
                <div id="left-nav">
                    <div id="current-to">
                        <span>当前联系人</span>
                    </div>
                    <div id="current-list">
                        <div id="to">
                            <ul id="list-show">
                                <!-- <li>
                                    <span class="tips icon-news-tips">
	            						<a href="javascript:void(0)" title="" data-form="王女士">王女士xx</a>
	            					</span>
                                    <span class="close icon-close" data-index="0"></span>
                                </li>
                                <li>
                                    <span class="tips">
	            						<a href="javascript:void(0)" title="" data-form="王女士">王女士xx</a>
	            					</span>
                                    <span class="close icon-close" data-index="0"></span>
                                </li>
                                <li>
                                    <span class="tips">
	            						<a href="javascript:void(0)" title="" data-form="王女士">王女士xx</a>
	            					</span>
                                    <span class="close icon-close" data-index="0"></span>
                                </li> -->
                            </ul>
                        </div>
                        <div id="historty">
                            <span>
	                    		<a href="/invest_history" title="">查看历史消息</a>
	                		</span>
                        </div>
                    </div>
                </div>
                <div id="right-nav">
                    <div id="sub-nav">
                        <ul>
                            <li>
                                <span>
                					<a href="/springmvc/investor/resavation" title="">一键预约</a>
            					</span>
                            </li>
                            <li>
                                <span>
                					<a href="/" title="">查看合同</a>
            					</span>
                            </li>
                            <li>
                                <span>
                					<a href="/" title="">上传合同</a>
            					</span>
                            </li>
                        </ul>
                    </div>
                    <div id="ichat">
                        <div class="msg-window">
                            <div class="show-msg" data-form="">
                                <ul id="msg-list">
                                    <li>
                                        <div class="msg-form">
                                            <span class="uesrname">我</span>
                                            <span class="time">2015/7/9 &nbsp;&nbsp;14:41</span>
                                        </div>
                                        <p class="msg">hello world!</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div id="send-msg">
                            <div id="input">
                                <input type="text" id="send" name="msg">
                            </div>
                            <div id="send">
                                <span id="send-btn" class="icon-send-btn">
	                        	</span>
                                <span id="fj" class="icon-fj">

	                        	</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="footer">
        <div id="foot-list">
        </div>
    </div>
    <script type="text/javascript" src="/javascripts/jq.js"></script>
  	<script type="text/javascript" src="/javascripts/chat.js"></script>
    <script type="text/javascript">
	var uid = $('#title').data('uid');
    var wsUrl = "ws://localhost:8090/springmvc/webSocketServer?session= " + uid;
    var webSocket = new WebSocket(wsUrl);
    $(document).ready(function() {
 
    webSocket.onopen = function(e) {
    	webSocket.onmessage = function(e) {
    		console.log(e);
    		var html = '<li>' +
    		'<p>' + e.data + '</p>'
    		'</li>';
    		$('#msg-list').append(html);
    	}
    }
    
    var send = document.getElementById('send');
    send.onkeydown = function(e) {
    	if(e.keyCode == 13) {
    		webSocket.send(e.target.value);
    	}
    }
  
   

});
</script>
    
</body>

</html>
    