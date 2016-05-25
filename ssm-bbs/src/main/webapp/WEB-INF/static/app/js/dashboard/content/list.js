$(function(){
    $('#content-manage').addClass('active open');
    $('#content_manage').addClass('active');

    var showNotify = function(response) {
        Notify.success("删除页面成功");
    };

    var $table = $('#content-table');

    $table.on('click', 'a[data-role=publish-content],a[data-role=unpublish-content],a[data-role=trash-content]', function() {
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

    $table.on('click', 'a[data-role=delete-content]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');
        var title = $trigger.attr("title");

        if (confirm('确定' + title + ' 吗？')) {
            $.post(target, function(){
                $trigger.parents('tr').remove();
            })
            .success(showNotify)
        };
    });

});