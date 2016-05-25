$(function(){
    $('#monitor-data').addClass('active open');
    $('#monitor-auditing').addClass('active');

     $('#addBut').click(function() {
        $.ajax({
            url:ctx +"/dashboard/monitor/check",
            type:"get",
            cache:false,
            success:function(data) {
                var resp = $.parseJSON(data);
                if(resp == "fail"){
                    Notify.warning("该月已有填报数据!");
                }else{

                    $('#addBut').replaceWith('<a data-toggle="modal" id="addBut" class="btn btn-xs btn-primary" href='+ ctx +'"/dashboard/monitor/create" data-target="#myLargeModal" data-backdrop="static">添加填报数据</a>');
                    $('#addBut').click();
                }
            },
            error:function() {
                Notify.error("获取数据异常，请联系管理员。");
            }
        });
     });

    $('#period').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm',
        autoclose: true,
        startView: 3,
        minView: 3,
        todayHighlight:true
    }).on('changeDate', function(ev) {
        var ct = new Date();
        var currentTime = new Date(ct.getFullYear(), ct.getMonth());
        if(ev.date >= currentTime){
            $('#period').val("");
            Notify.warning("请选择当前月份之前的时间！");
        }
    });

    $("#district2").change(function(){
        var str = "";
        var id = $(this).val();
        var target = ctx +"/dashboard/monitor/"+id+"/region";
        $.post(target, function(data){
            var datas = $.parseJSON(data);
            var regions = datas.regions;

            $("#region option:not(:first-child)").remove();

            for(var i=0; i<regions.length; i++){
                str += '<option value="'+regions[i].region+'">'+regions[i].region+'</option>';
            }

            $("#region").append(str);
        })
    });
});