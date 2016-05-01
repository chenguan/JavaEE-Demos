$(function(){

    $('#content-manage').addClass('active open');
    $('#site-manage-list').addClass('active');

    var $table = $('#site-table');

    $table.on('click', 'a[data-role=publish-site],a[data-role=unpublish-site]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');

        $.post(target, function(html){
            var $tr = $(html);
            $('#' + $tr.attr('id')).replaceWith($tr);
        })
    });

});