$(function(){
    $('#public-service' + (menu!="operator"&&menu!="type"?"":"-accept")).addClass('active open');
    $('#apply' + (menu=="apply"?"":("_"+menu))).addClass('active');

    if (menu != 'type') {
        //init(step2);
        /*init(step3);
        init(step4);
        init(step5);*/
    }

    /**
     *
     * 把json型数据data,回写到详情界面
     *
     * @param data
     */
    function init(data) {
        if (data != '') {
            //data = eval("(" + data + ")");
            var obj = eval ("(" + data + ")");
            $.each(obj, function (key, val) {
                var e = $("#detail-body #" + key);
                var type = e.attr("type");
                if (type == "checkbox" || type == "radio") {
                    $("#detail-body" + " input[name=" + key + "][value=" + val + "]").attr("checked", "true");
                } else if (type == "text") {
                    e.val(val);
                } else {
                    e.text(val);
                }
            })

        }
    }

});