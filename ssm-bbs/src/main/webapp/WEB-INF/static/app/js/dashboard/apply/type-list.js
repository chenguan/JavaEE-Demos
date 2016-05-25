$(function(){
    $('#public-service-accept').addClass('active open');
    $('#apply_type').addClass('active');

    var $table = $('#apply-type-table');

    $table.on('click', 'a[data-role=close-apply-type]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');
        var title = $trigger.attr("title");

        if (confirm('确定' + title + ' 吗？')) {
            $.post(target, function(html){
                var $tr = $(html);
                $('#' + $tr.attr('id')).replaceWith($tr);
            })
        }
    });
});