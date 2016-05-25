$(function () {
    $("#layout-logo").hide();

    var url = window.location+"";

    var arr = [];

    $("div[class=m-box2_menu] a").each(function(i){
        arr[i] = $(this).attr("id");
    });

    $("div[class=m-box2_menu] a").removeClass("u-first02");

    for(abc in arr){

        if(url.indexOf(arr[abc]) > 0 ){
            $("#"+arr[abc]).addClass("u-first02");
        }
    }

    if(!$("div[class=m-box2_menu] a").hasClass("u-first02")){
        $("#main").addClass("u-first02");
    }
});