//$(function(){
    var time = 5;
    var closeWindow = function() {
        setTimeout('closeWindow()', 1000);
        if (time > 0) {
            $('.text-info').html(" 倒计时 " + time + " 秒后窗口自动关闭。");
            time--;
        } else {
            window.opener = null;
            window.open('','_self','');
            window.close();
        }
    };

    closeWindow();
//});