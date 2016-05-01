$(function () {
    $("#tab-panel li a").click(function () {
        $("#tab-panel li a").removeClass("cur13");
        $(this).addClass("cur13");
        for (var i = 0; i < 4; i++) {
            $("#tab-content-" + i).hide();
        }
        $("#tab-content-" + $(this).attr("tabindex")).show();
        alignHeight("x_m-left","x_m-right");
        return false;
    });

    // 抄common.js中的部分逻辑
    function alignHeight(eleA,eleB) {
        $("#" + eleA).css("height", "auto");
        $("#" + eleB).css("height", "auto");
        var heightA = document.getElementById(eleA).clientHeight;
        var heightB = document.getElementById(eleB).clientHeight;
        if(heightA > heightB){
            document.getElementById(eleB).style.height = heightA + "px";
            document.getElementById(eleA).style.height = heightA + "px";
        }else{
            document.getElementById(eleA).style.height = heightB + "px";
            document.getElementById(eleB).style.height = heightB + "px";
        }
    }
})
