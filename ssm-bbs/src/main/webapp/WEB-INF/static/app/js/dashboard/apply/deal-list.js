$(function(){
    $('#public-service' + (menu=="district"?"":"-accept")).addClass('active open');
    $('#apply_' + menu).addClass('active');

    //selectmenu
    $("#typeId").selectmenu({width: 220, position: {my: "left top", at: "left bottom"}})
    //selectmenu
    $("#status").selectmenu({width: 200, position: {my: "left top", at: "left bottom"}})
    //selectmenu
    $("#districtId").selectmenu({width: 200, position: {my: "left top", at: "left bottom"}})

});