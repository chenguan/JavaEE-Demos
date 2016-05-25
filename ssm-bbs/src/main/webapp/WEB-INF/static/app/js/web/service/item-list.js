/**
 * Created by Administrator on 2015/12/23.
 */
$(function(){

    $("#seek").click(function(){
        $(this).attr("href", $(this).attr("href") + $("#seekinput").val());
    });

});