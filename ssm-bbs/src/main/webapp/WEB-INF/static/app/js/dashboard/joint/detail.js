$(function() {
    $('#' + (type == 'inner' ? 'content-manage' : 'public-service')).addClass('active open');
    $('#' + menu + '_joint' + (type == 'inner' ? '2' : '')).addClass('active');
});