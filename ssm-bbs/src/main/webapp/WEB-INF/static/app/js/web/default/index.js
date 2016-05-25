/**
 * Created by brave on 2015/11/24.
 */


/**
 *首页轮播
 **/
if (window.chrome) {
    $('.slider li').css('background-size', '100% 100%');
}
$('.slider').unslider({
    speed: 500,               //  滚动速度
    delay: 3000,              //  动画延迟
    complete: function (a, b) {
        var id = b.attr("index");
        $(".a-title").css("background-color", "#444444");
        $("#a-" + id).css("background-color", "#232425");
    },  //  动画完成的回调函数
    keys: true,               //  启动键盘导航
    dots: true,               //  显示点导航
    fluid: true               //  支持响应式设计
});

var record = $('.slider').data('unslider');
$(".dots a").hover(function () {
    var index = $(this).attr("tabindex");
    if (index) {
        record.to(index);
    }
},function(){
});
