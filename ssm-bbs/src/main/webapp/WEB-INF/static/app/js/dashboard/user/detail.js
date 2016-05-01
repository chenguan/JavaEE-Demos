$(function(){
    $('#user-manage').addClass('active open');
    if(orgtype == 'enterprise'){
        $('#user-manage-list').addClass('active');
    }else{
        $('#user_agency').addClass('active');
    }
});