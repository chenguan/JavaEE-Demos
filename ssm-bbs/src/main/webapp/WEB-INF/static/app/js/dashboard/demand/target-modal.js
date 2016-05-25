$(function(){

    var $form = $('#target-edit-form');
    var $modal = $form.parents('.modal');

    var showNotify = function(html) {
        window.location.href = window.location.href;
    };

    $form.validate({
        ignore: [],
        rules: {
            users: {
                required: true
            }
        },
        submitHandler: function(form, event) {
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

    $('[data-rel=users]').popover({
        container: 'body',
        html: true
    });

    // 机构至多选择3家，其中志愿者最多选择1家
    var select2 = $("#users");
    select2.css('width', '100%');
    select2.select2({
        allowClear:true,
        maximumSelectionSize:3 - count,// 最多只能选3家机构
        formatSelectionTooBig: function (a) {
            return "只能选择 " + a + " 家机构" + (3 == a ? "！" : "，已流转过" + (3 - a) + "家！")
        }
    });
    select2.change(function(e){
        var added = e.added;
        // 如果是添加了一个元素, 并且选择了2个志愿者
        if (added && validate()) {
            // 不添加这个元素（就是把添加的删了），并且提示用户
            var arr = $(".select2-search-choice div");
            for (var i = 0; i < arr.length; i++) {
                if (added.text == arr[i].innerText) {
                    $(arr[i]).parent().remove(); // 显示 移除
                    removeUserId(added.id);// id 移除
                    break;
                }
            }
            if (volunteersCount == 0) {
                alert("最多只能选择1家志愿者！");
            } else {
                alert("最多只能选择1家志愿者，已流转过1家自愿者！");
            }
        }
    });

    // 校验选择了的自愿者是否大于1个 return 0：否，1：是
    function validate(){
        var arr = select2.val();
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < volunteers.length; j++) {
                if (arr[i] == volunteers[j]) {
                    count++;
                    break;
                }
            }
        }
        return count > 1 - volunteersCount;
    }

    // 移除已选中的机构的id
    function removeUserId(id) {
        var arr = select2.val();
        var newArr = [], k = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != id) {
                newArr[k++] = arr[i];
            }
        }
        select2.val(newArr);
    }


});