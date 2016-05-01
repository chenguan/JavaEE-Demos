$(function(){
    $('#monitor-data').addClass('active open');
    $('#monitor-micro-setting').addClass('active');

    $("#district2").change(function(){
        var str = "";
        var id = $(this).val();

        if(id == ""){
            $("#region option:not(:first-child)").remove();
        }else{
            var target = ctx +"/dashboard/monitor/"+id+"/region";
            $.post(target, function(data){
                var datas = $.parseJSON(data);
                var regions = datas.regions;

                $("#region option:not(:first-child)").remove();

                for(var i=0; i<regions.length; i++){
                    str += '<option value="'+regions[i].region+'">'+regions[i].region+'</option>';
                }
                $("#region").append(str);
            });
        }
    });


    var showNotify = function(response) {
        Notify.success("操作成功");
    };

    var $table = $('#monitor-table');

    $table.on('click', 'a[data-role=setting-micro]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');
        var title = $trigger.attr("title");

        if (confirm('确定' + title + '吗？')) {
            $.post(target, function(data){
                var obj = eval("("+data+")");
                var id = obj.id;
                var status = obj.status;
                if(status == "complete"){
                    $("#monitor-"+id).find("td:eq(6) span").replaceWith('<span class="label label-info ">是</span>');
                    $("#monitor-"+id).find("td:eq(7) div ul li a.monitor").replaceWith('<a class="monitor" href="javascript:" title="取消监控状态" data-role="setting-micro" data-url="'+ctx+'/dashboard/monitor/update/'+id+'/cancel">取消监控状态</a>');
                }else{
                    $("#monitor-"+id).find("td:eq(6) span").replaceWith('<span class="label label-grey ">否</span>');
                    $("#monitor-"+id).find("td:eq(7) div ul li a.monitor").replaceWith('<a class="monitor" href="javascript:" title="设置监控状态" data-role="setting-micro" data-url="'+ctx+'/dashboard/monitor/update/'+id+'/complete">设置监控状态</a>');
                }
            }).success(showNotify);
        }
    });

    $('table th input:checkbox').on('click' , function(){
        var that = this;
        $(this).closest('table').find('tr > td:first-child input:checkbox')
            .each(function(){
                this.checked = that.checked;
                $(this).closest('tr').toggleClass('selected');
            });

    });

    $('#batchSetting').on('click',function(){
        var orgid = "";
        $('table tr > td:first-child input:checkbox').each(function(){
           if(this.checked){
               orgid += $(this).closest('td').find("input[type='hidden']").val()+",";
           }
        });

        if(orgid == ""){
            Notify.success("请选中要设置的数据");
            return;
        }

        orgid = orgid.substring(0, orgid.length-1);
        var target = ctx +"/dashboard/monitor/batch/setting";
        $.post(target, {'orgid': orgid}, function(data){
            var ids = orgid.split(",");
            window.setTimeout(function(){
                for(var i = 0; i < ids.length; i++){
                    var id = ids[i];
                    $("#monitor-"+id).find("td:eq(6) span").replaceWith('<span class="label label-info ">是</span>');
                    $("#monitor-"+id).find("td:eq(7) div ul li a.monitor").replaceWith('<a class="monitor" href="javascript:" title="取消监控状态" data-role="setting-micro" data-url="'+ctx+'/dashboard/monitor/update/'+id+'/cancel">取消监控状态</a>');
                }
            } , 200);
        }).success(showNotify);
    });

    $('#batchCancel').on('click',function(){
        var orgid = "";
        $('table tr > td:first-child input:checkbox').each(function(){
            if(this.checked){
                orgid += $(this).closest('td').find("input[type='hidden']").val()+",";
            }
        });

        if(orgid == ""){
            Notify.success("请选中要取消的数据");
            return;
        }

        orgid = orgid.substring(0, orgid.length-1);
        var target = ctx +"/dashboard/monitor/batch/cancel";
        $.post(target, {'orgid': orgid}, function(data){
            var ids = orgid.split(",");
            window.setTimeout(function(){
                for(var i = 0; i < ids.length; i++){
                    var id = ids[i];
                    $("#monitor-"+id).find("td:eq(6) span").replaceWith('<span class="label label-grey ">否</span>');
                    $("#monitor-"+id).find("td:eq(7) div ul li a.monitor").replaceWith('<a class="monitor" href="javascript:" title="设置监控状态" data-role="setting-micro" data-url="'+ctx+'/dashboard/monitor/update/'+id+'/complete">设置监控状态</a>');
                }
            } , 200);
        }).success(showNotify);
    });

});