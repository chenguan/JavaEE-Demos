$(function(){
    $('#public-service').addClass('active open');
    $('#outer_service_item').addClass('active');

    var showNotify = function(response) {
        Notify.success("删除成功");
    };

    var $table = $('#serviceItem-table');

    $table.on('click', 'a[data-role=delete-serviceItem]', function() {
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

    $table.on('click', 'a[data-role=edit-serviceItem]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');

            $.post(target, function(){
            })
    });

});