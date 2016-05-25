$(function(){
    $('#content-manage').addClass('active open');
    $('#notification_work_manage').addClass('active');

    var showNotify = function(response) {
        Notify.success("删除通知成功");
    };

    var $table = $('#notification-table');

    $table.on('click', 'a[data-role=publish-notification],a[data-role=unpublish-notification],a[data-role=trash-notification]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');

        $.post(target, function(html){
            var $tr = $(html);
            $('#' + $tr.attr('id')).replaceWith($tr);
        })
    });

    $table.on('click', 'a[data-role=delete-notification]', function() {
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

});