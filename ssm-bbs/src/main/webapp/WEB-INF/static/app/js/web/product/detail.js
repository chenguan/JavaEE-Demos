$(function(){

    $("a img").click(function(){
        //alert($(this).attr("src"));
        $("#main").attr("src",$(this).attr("src"));
        $("a").removeClass("cur12");
        $(this).parent().addClass("cur12");
    });

    $("#productbody").click(function () {
        var content = $("#body").text();
        var title = $("#title").text();
       // $("#popup-modal-name").text("详情：");
       // $("#popup-modal-title").text(title);
        $("#popup-modal-content").text(content);
        $("#popup-modal").show();
        return false;
    });
});
