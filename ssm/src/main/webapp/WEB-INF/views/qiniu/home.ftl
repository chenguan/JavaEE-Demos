<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${user.username}的个人相册</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="container">
    <!-- 首部 start -->
    <div class="row">
        <div class="col-xs-8 col-xs-offset-2">
            <h3 class="page-header">
            ${user.username}&nbsp;&nbsp;&nbsp;
                <small>共<span class="badge">${imageList.size()}</span>张</small>
                <div class="btn-group pull-right">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        操作<span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#" data-toggle="modal" data-target="#myModa2">上传</a></li>
                        <li><a href="#" data-toggle="modal" data-target="#myModa3">删除</a></li>
                        <li><a href="#" data-toggle="modal" data-target="#myModa4">退出</a></li>
                    </ul>
                </div>
            </h3>
        </div>
    </div>
    <!-- 首部 end -->

    <!-- 显示图片列表 -->
    <c:forEach items="${imageList}" varStatus="status" var="image">
        <c:choose>
            <c:when test="${status.first or status.index % 4 eq 0}">
                <div class="row">
                    <div class="col-xs-2 col-xs-offset-2">
                        <a href="#" class="thumbnail text-center">
                            <img name="${image.name}"
                                 date="<fmt:formatDate value='${image.date}' pattern='yyyy-MM-dd HH:mm'/>"
                                 style="width: 140px; height: 130px;"
                                 src="http://shiyanlouphoto.qiniudn.com/${image.url}">
                            <input class="pull-left" type="checkbox" value="${image.id}"
                                   url="${image.url}"/>${image.name }
                        </a>
                    </div>
            </c:when>
            <c:when test="${status.index % 4 eq 3 and not status.last }">
                <div class="col-xs-2">
                    <a href="#" class="thumbnail text-center">
                        <img name="${image.name}"
                             date="<fmt:formatDate value='${image.date}' pattern='yyyy-MM-dd HH:mm'/>"
                             style="width: 140px; height: 130px;" src="http://shiyanlouphoto.qiniudn.com/${image.url}">
                        <input class="pull-left" type="checkbox" value="${image.id}" url="${image.url}"/>${image.name }
                    </a>
                </div>
</div>
</c:when>
<c:otherwise>
    <div class="col-xs-2">
        <a href="#" class="thumbnail text-center">
            <img name="${image.name}" date="<fmt:formatDate value='${image.date}' pattern='yyyy-MM-dd HH:mm'/>"
                 style="width: 140px; height: 130px;" src="http://shiyanlouphoto.qiniudn.com/${image.url}">
            <input class="pull-left" type="checkbox" value="${image.id}" url="${image.url}"/>${image.name }
        </a>
    </div>
</c:otherwise>
</c:choose>
<c:if test="${status.last}">
    </div>
</c:if>
</c:forEach>
<!-- 显示图片列表 end -->
</div>

<!-- 显示图片对话框 start -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel"></h4>
            </div>
            <div class="modal-body" id="modal-content">
            </div>
        </div>
    </div>
</div>
<!-- 显示图片对话框 end -->

<!-- 上传图片对话框 start -->
<div class="modal fade" id="myModa2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabe2">图片上传</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form" id="form">
                    <div class="form-group">
                        <label for="image_name" class="col-xs-2 control-label">名称</label>
                        <div class="col-xs-4">
                            <input type="text" class="form-control" id="image_name" name="image_name"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="image" class="col-xs-2 control-label">图片</label>
                        <div class="col-xs-4">
                            <input type="file" id="image" name="image"/>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" id="upload">上传</button>
            </div>
        </div>
    </div>
</div>
<!-- 上传图片对话框 end -->

<!-- 删除图片对话框 start -->
<div class="modal fade" id="myModa3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabe3">确定删除吗？</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" id="delete">确定</button>
            </div>
        </div>
    </div>
</div>
<!-- 删除图片对话框 end -->

<!-- 退出对话框 start -->
<div class="modal fade" id="myModa4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabe4">确定退出吗？</h4>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" id="exit">确定</button>
            </div>
        </div>
    </div>
</div>
<!-- 退出对话框 end -->

<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //点击图片
        $('img').click(function () {
            $('#myModalLabel').html($(this).attr('name') + '&nbsp;&nbsp;&nbsp;<small>' + $(this).attr('date') + '</small>');
            $('#modal-content').html('<img class=\'img-responsive\' src=\'' + $(this).attr('src') + '\'/>');
            $('#myModal').modal('show');
        });

        //点击上传
        $('#upload').click(function () {
            if ($('#image_name').val() == '' || $('#image').val() == '') {
            } else {
                $('#form').attr('action', '${pageContext.request.contextPath}' + '/ImageController?type=1');
                $('#form').attr('enctype', 'multipart/form-data');
                $('#form').attr('method', 'post');
                $('#form').submit();
            }
        });

        //点击确定退出
        $('#exit').click(function () {
            $.get('${pageContext.request.contextPath}' + '/UserController?type=3', function (data, status) {
                location.href = '${pageContext.request.contextPath}' + '/index.ftl';
            });
        });

        //点击确定删除图片
        $('#delete').click(function () {
            var ids = "";
            var urls = "";
            $('input[type=checkbox]:checked').each(function () {
                ids += $(this).val() + ',';
                urls += $(this).attr('url') + ',';
            });
            $.post('${pageContext.request.contextPath}' + '/ImageController?type=2', {
                ids: ids,
                urls: urls
            }, function (data, status) {
                $('#myModa3').modal('hide');
                location.href = '${pageContext.request.contextPath}' + '/home.jsp';
            });
        });
    });
</script>
</body>
</html>