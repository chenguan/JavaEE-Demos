$(function() {
    $('#content-' + menu).addClass('active open');
    $('#product_' + menu).addClass('active');

    var imgs = $(".product-imgs-div").children();
    $(imgs).mouseenter(function(e){
        imgs.removeClass("active");
        $(this).addClass("active");
        $(".product-img-div").children("img").attr("src", $(this).children("img").attr("src"));
    });
});
