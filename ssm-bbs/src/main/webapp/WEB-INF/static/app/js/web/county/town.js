$(function () {
    $("#tab-panel li a").click(function () {
        $("#tab-panel li a").removeClass("cur13");
        $(this).addClass("cur13");
        for (var i = 0; i < 4; i++) {
            $("#tab-content-" + i).hide();
        }
        $("#tab-content-" + $(this).attr("tabindex")).show();
        return false;
    });
})
