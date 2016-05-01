/**
 * Created by brave on 2015/12/11.
 */
$(function(){
    // 导航选中
    var navs = $(".layer-01 .text");
    // 先清除所有导航的选中状态
    for (var i = 0; i < navs.length; i++) {
        $(navs[i]).removeClass("mark");
    }
    // 再激活选中的导航
    if (active_index != -1) {
        $(navs[active_index * 1]).addClass("mark");
    }

    // 导航效果
    function j_firstBox(box, boxFor, tree, treeFor){// 服务导航j_firstBox(".j-firstBox3", ".j-firstBoxFor3", ".j-firstTree3", ".j-firstTreeFor3");

        $(box).mouseenter(function(){

            $(boxFor).removeClass("hide-me");
        });
        $(box).mouseleave(
            function(){
                $(boxFor).addClass("hide-me");
            });

        $(tree).mouseenter(function(event){

            $(treeFor).hide();
            var obj = event.target;
            var left = $(obj).parent().position().left;
            if(left<= 500 ){
                $(obj).prev(treeFor).css("left","0");
            }else{$(obj).prev(treeFor).css("right","0");}
            $(obj).prev(treeFor).show(300);
        });
        $(tree).mouseleave(
            function(){
                $(treeFor).hide();
            });
        $(treeFor).mouseenter(function(event){
            //alert("111");
            var obj = event.target;
            $(tree).find(".text-02").removeClass("mark-02");
            $(obj).next(".text-02").addClass("mark-02");
        });
        $(treeFor).mouseleave(function(){

            $(".text-02").removeClass("mark-02");

        });
    }

    $(document).ready(function()
    {
        // 通知公告
        j_firstBox(".j-firstBox", ".j-firstBoxFor", ".j-firstTree", ".j-firstTreeFor");
        // 政策法规
        j_firstBox(".j-firstBox2", ".j-firstBoxFor2", ".j-firstTree2", ".j-firstTreeFor2");
        // 服务导航
        j_firstBox(".j-firstBox3", ".j-firstBoxFor3", ".j-firstTree3", ".j-firstTreeFor3");

    });

});