$(function () {
    $('#content-' + menu).addClass('active open');
    $('#product_' + menu).addClass('active');

    var showNotify = function(response) {
        Notify.success("删除产品成功");
    };

    var $table = $('#product-table');

    $table.on('click', 'a[data-role=published-product],a[data-role=unpublished-product],a[data-role=trash-product]', function () {
        var $trigger = $(this);
        var tr_id = $trigger.parent().parent().attr("index");
        var tr_index = $($("#" + tr_id).children()[0]).text();
        var target = $trigger.data('url');
        $.post(target, function (html) {
            var $tr = $(html);
            $('#' + $tr.attr('id')).replaceWith($tr);
            $($("#" + tr_id).children()[0]).text(tr_index);
        })
    });

    $table.on('click', 'a[data-role=delete-product]', function () {
        var $trigger = $(this);
        var target = $trigger.data('url');
        var title = $trigger.attr("title");

        if (confirm('确定' + title + ' 吗？')) {
            $.get(target, function () {
                $trigger.parents('tr').remove();
            })
                .success(showNotify)
        }
    });

    var simpleSelectTree = new SimpleSelectTree($("#productTradeName"), $("#productTradeId"), $("#treePanel"), zNodes);

    // 覆写onSelected方法，让其可以选择父节点
    simpleSelectTree.onSelected = function(event, treeId, treeNode) {
        simpleSelectTree.valueInput.val(treeNode.id);
        simpleSelectTree.nameInput.val(treeNode.name);
        simpleSelectTree.treePanel.addClass("hide");
    };
    // 必须重新加载，否则覆写无效
    simpleSelectTree.reload();
});
