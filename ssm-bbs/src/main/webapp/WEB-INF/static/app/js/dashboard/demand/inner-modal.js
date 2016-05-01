$(function(){

    var $form = $('#demand-inner-form');
    var $modal = $form.parents('.modal');

    var showNotify = function(html) {
        window.location.href = window.location.href;
    };

    $("#servicetype-error").hide();

    $form.validate({
        ignore: [],
        submitHandler: function(form, event) {
            var val = $("#serviceTypeNameInput").val();
            if (!val || val == null || val == '') {
                $("#servicetype-error").show();
                return false;
            }
            event.preventDefault();
            $(form).ajaxSubmit({
                success: showNotify,
                error: function(data,textstatus){
                    $modal.modal('hide');
                    Notify.error("服务器内部错误，请稍后再试。");
                }
            });
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });

    var simpleSelectTree = new SimpleSelectTree($("#serviceTypeNameInput"), $("#serviceTypeIdInput"), $("#treePanel"), zNodes);

    // 覆写onSelected方法，让其可以选择父节点
    simpleSelectTree.onSelected = function(event, treeId, treeNode) {
        simpleSelectTree.valueInput.val(treeNode.id);
        simpleSelectTree.nameInput.val(treeNode.name);
        simpleSelectTree.treePanel.addClass("hide");
        $("#servicetype-error").hide();
    };
    // 必须重新加载，否则覆写无效
    simpleSelectTree.reload();
});