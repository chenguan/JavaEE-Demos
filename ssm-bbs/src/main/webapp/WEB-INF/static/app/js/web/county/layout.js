$(function () {
    $("#layout-logo").hide();

    $(".m-box2_menu a").removeClass("u-first02");
    $("#" + checkedId).addClass("u-first02");


    $("#dynamic").html(">"+$("#" + checkedId).text());
    var url = $("#dynamic").attr("href");

    if($("#" + checkedId).text()=="市级专业服务机构"){
        $("#dynamic").attr("href",url+"city");
    }else{
        $("#dynamic").attr("href",url+"town");
    }

});