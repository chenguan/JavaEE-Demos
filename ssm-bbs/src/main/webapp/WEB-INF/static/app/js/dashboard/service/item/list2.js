$(function(){
    $('#performance-evaluation').addClass('active open');
    $('#inner_service_item').addClass('active');

    var showNotify = function(response) {
        Notify.success("删除成功");
    };

    var $table = $('#serviceItem-table');

    $table.on('click', 'a[data-role=delete-serviceItem]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');
        var title = $trigger.attr("title");

        if (confirm('确定' + title + ' 吗？')) {
            $.post(target, function(data){
                $trigger.parents('tr').remove();
            })
                .success(showNotify)
        }
    });

    $table.on('click', 'a[data-role=edit-serviceItem]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');

            $.post(target, function(){
            })
    });

    $table.on('click', 'a[data-role=underline-serviceItem]', function() {
        var $trigger = $(this);
        var target = $trigger.data('url');

        $.post(target, function(html){
            var $tr = $(html);
            $('#' + $tr.attr('id')).replaceWith($tr);
        })
    });


    var setting2 = {
        check: {
            enable: true,
            chkboxType: {"Y": "", "N": ""}
        },
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: beforeClick2,
            onCheck: onCheck2
        }
    };

    $.fn.zTree.init($("#serviceTypeTree"), setting2, zNodes2);

    function beforeClick2(treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("serviceTypeTree");
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        return false;
    }

    onCheck2(0, 0, 0);

    function onCheck2(e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("serviceTypeTree"),
            nodes = zTree.getCheckedNodes(true),
            v = "", ids = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            v += nodes[i].name + ",";
            ids += nodes[i].id + ",";
        }
        if (v.length > 0) {
            v = v.substring(0, v.length - 1);
            ids = ids.substring(0, ids.length - 1);
        }
        var input = $("#serviceTypeid");
        input.val(v);
        var hideInput = $("#serviceTypeHide");
        hideInput.val(ids);
    }

    function hideMenu2() {
        $("#serviceTypeContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown2);
    }

    function onBodyDown2(event) {
        if (!(event.target.id == "serviceTypeid" || event.target.id == "serviceTypeContent" || $(event.target).parents("#serviceTypeContent").length > 0)) {
            hideMenu2();
        }
    }

    $("#serviceTypeid").click(function () {
        var cityObj = $("#serviceTypeid");
        var cityOffset = $("#serviceTypeid").offset();

        $("#serviceTypeContent").slideDown("fast");
        $("body").bind("mousedown", onBodyDown2);
        return false;
    });

    if(valueId != ''){
        $("#serviceTypeid").val(valueName);
        $("#serviceTypeHide").val(valueId);

        //checkbox反选
        var ids = valueId.split(',');
        for(var i = 0; i < ids.length; i++){
            var val = ids[i];
            var zTree = $.fn.zTree.getZTreeObj("serviceTypeTree");
            var nodes = zTree.getNodes();
            for(var n = 0; n < nodes.length; n++){
                for(var m = 0; m < nodes[n].children.length; m++){
                    if(nodes[n].children[m].id == val){
                        var tid = nodes[n].children[m].tId;
                        var tnodes = zTree.getNodeByTId(tid);
                        tnodes.checked = true;
                        zTree.updateNode(tnodes);
                    }
                }
            }
        }
    }
});