$(function(){

    var $form = $('#category-categories-form');
    var $modal = $form.parents('.modal');

    var setting = {
        check: {
            enable: true,
            chkStyle: "radio",
            radioType: "all"
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };

    $.fn.zTree.init($("#tree"), setting, zNodes);

    var showNotify = function(response) {
        if(!response){
            Notify.error("绑定栏目失败。");
        }
        else
        {
            $modal.modal('hide');
            Notify.success("绑定栏目成功。");
        }
    };

    $form.submit(function(){
        $(this).ajaxSubmit({
            beforeSubmit: function(arr, $form, options) {
                var zTree = $.fn.zTree.getZTreeObj("tree");
                var nodes = zTree.getCheckedNodes(true);
                if (nodes.length == 0) {
                    arr[0].value = 0;
                } else {
                    arr[0].value = nodes[0].id;
                }
            },
            dataType : 'json',
            success: showNotify,
            error: function(data,textstatus){
                $modal.modal('hide');
                Notify.error("服务器内部错误，请稍后再试。");
            }
        });
        return false;
    });
});