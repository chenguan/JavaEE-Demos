$(function(){
    $('#content-manage').addClass('active open');
    $('#article_manager').addClass('active');

    var showNotify = function(response) {
        Notify.success("删除文章成功");
    };

    var $table = $('#article-table');

    $table.on('click', 'a[data-role=published-article],a[data-role=unpublished-article],a[data-role=trash-article]', function() {
        var $trigger = $(this);
        var tr_id = $trigger.parent().parent().attr("index");
        var tr_index = $($("#" + tr_id).children()[0]).text();
        var target = $trigger.data('url');
        $.post(target, function(html){
            var $tr = $(html);
            $('#' + $tr.attr('id')).replaceWith($tr);
            $($("#" + tr_id).children()[0]).text(tr_index);
        })
    });

    $table.on('click', 'a[data-role=delete-article]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');
        var title = $trigger.attr("title");

        if (confirm('确定' + title + ' 吗？')) {
            $.post(target, function(){
                $trigger.parents('tr').remove();
            })
            .success(showNotify)
        }
    });

    $table.on('click', 'a[data-role=featured-article],a[data-role=promoted-article],a[data-role=sticky-article]', function() {
        var $self = $(this);
        var span = $self.find('span');
        var spanClass = span.attr('class');
        var postUrl = "";

        if(spanClass == "label label-default"){
            postUrl = $self.data('setUrl');
            $.post(postUrl, function(response) {
                var labelStatus = "label label-success";
                span.attr('class',labelStatus)
            });
        }else{
            postUrl = $self.data('cancelUrl');
            $.post(postUrl, function(response) {
                var labelStatus = "label label-default";
                span.attr('class',labelStatus)
            });
        }
    });

    var simpleSelectTree = new SimpleSelectTree($("#categoryNameInput"), $("#categoryIdInput"), $("#treePanel"), zNodes);

    // 覆写onSelected方法，让其可以选择父节点
    simpleSelectTree.onSelected = function(event, treeId, treeNode) {
        simpleSelectTree.valueInput.val(treeNode.id);
        simpleSelectTree.nameInput.val(treeNode.name);
        simpleSelectTree.treePanel.addClass("hide");
    };
    // 必须重新加载，否则覆写无效
    simpleSelectTree.reload();

    //selectmenu
    $("#siteId").selectmenu({
        width: 200,
        position: {my: "left top", at: "left bottom"},
        change: function(e, u) {
            $("#categoryNameInput").val("");
            $("#categoryIdInput").val("");
            $.get(ctx + "/dashboard/article2/site/" + u.item.value + "/categories", function (data, status) {
                if (status == "success") {
                    data = eval(data);
                    zNodes = [];
                    zNodes[0] = { id:0, pId:0, name:'全部栏目', open:true, isParent:false};
                    for (var i = 0; i < data.length; i++) {
                        var category = data[i];
                        zNodes[i + 1] = { id:category.id, pId:category.pid, name:category.name, open:!category.isleaf && category.pid == 0, isParent:!category.isleaf};
                    }
                    simpleSelectTree = new SimpleSelectTree($("#categoryNameInput"), $("#categoryIdInput"), $("#treePanel"), zNodes);

                    // 覆写onSelected方法，让其可以选择父节点
                    simpleSelectTree.onSelected = function(event, treeId, treeNode) {
                        simpleSelectTree.valueInput.val(treeNode.id);
                        simpleSelectTree.nameInput.val(treeNode.name);
                        simpleSelectTree.treePanel.addClass("hide");
                    };
                    // 必须重新加载，否则覆写无效
                    simpleSelectTree.reload();
                }
            });
        }
    })
});