$(function () {
    function testAuto(clazz, needLeng) {
        //var ididid = document.getElementById(thisId);
        //var nowLeng = ididid.innerHTML.length;
        //if(nowLeng > needLeng){
        //    var nowWord = ididid.innerHTML.substr(0,needLeng)+'...';
        //    ididid.innerHTML = nowWord;
        //}
        var arr = $("." + clazz);
        for (var i = 0; i < arr.length; i++) {
            var html = $(arr[i]).html();
            if (html.length > needLeng) {
                var newHtml = html.substr(0, needLeng) + '...';
                $(arr[i]).html(newHtml);
            }
        }
    }


    testAuto('x_test', 85);
    testAuto('x_test2', 45);
    testAuto('x_test3', 95);
    testAuto('x_test4', 11);
    testAuto('x_test5', 15);
    testAuto('x_test6', 6);





    function alignHeight(eleA,eleB){
        if(!document.getElementById(eleA)){return false;}
        if(!document.getElementById(eleB)){return false;}
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
    window.onload =
        function z_align(){
            alignHeight("x_m-left","x_m-right"); //只需将需要对齐的两个模块的id写在此处即可。
//alignHeight("AAA","BBB") 可依此连续多组。
        }

})



