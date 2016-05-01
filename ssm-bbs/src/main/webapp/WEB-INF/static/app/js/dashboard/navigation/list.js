$(function(){

    $('#content-manage').addClass('active open');
    $('#sub_navigation_manage').addClass('active');

    var showNotify = function(response) {
        Notify.success("删除导航成功");
    };

    var $table = $('#navigation-table');

    $table.on('click', 'a[data-role=delete-navigation]', function() {
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