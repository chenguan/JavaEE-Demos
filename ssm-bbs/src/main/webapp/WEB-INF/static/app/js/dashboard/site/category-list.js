$(function(){

    $('#content-manage').addClass('active open');
    $('#site-manage-list').addClass('active');

    var addHoverDom = function(treeId, treeNode) {
        var sObj = $("#" + treeNode.tId + "_span");
        if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) {
            return;
        }
        var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
            + "' title='绑定公共栏目'></span>";
        sObj.after(addStr);

        var addBtn = $("#addBtn_" + treeNode.tId);
        if (addBtn) {
            addBtn.bind("click", function() {
                $("#myModal").modal({
                    remote : ctx + "/dashboard/site/" + siteId + "/category/" + treeNode.id
                });
            });
        }
    };

    var removeHoverDom = function(treeId, treeNode) {
        $("#addBtn_" + treeNode.tId).unbind().remove();
    };

    var setting = {
        view : {
            addHoverDom : addHoverDom,
            removeHoverDom : removeHoverDom
        },
        edit : {
            enable : false
        },
        data : {
            simpleData : {
                enable : true
            }
        },
        callback : {
        }
    };

    $.fn.zTree.init($("#category_tree"), setting, category_zNodes);

});