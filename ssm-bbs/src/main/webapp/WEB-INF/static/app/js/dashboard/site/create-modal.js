$(function(){

    var $form = $('#site-create-form');
    var $modal = $form.parents('.modal');

    var showNotify = function(response) {
        if(response.status == 'fail'){
            Notify.error("添加发布域失败。");
        }
        else
        {
            $modal.modal('hide');
            window.location.reload();
        }
    };

    $form.validate({
        //ignore: ":hidden",
        // select2为隐藏域，需要校验
        ignore: "",
        rules: {
            name: {
                required: true,
                rangelength: [1,100]
            },
            description: {
                required: true,
                rangelength: [1,200]
            },
            adminuserid: {
                required: true
            },
            alias: {
                required: true,
                rangelength: [2,10],
                isLowLetterAndNum: true,
                remote: {
                    url: ctx + "/dashboard/site/verify-alias",
                    type: 'post',
                    data: {
                        'alias': function () { return $('#alias').val(); },
                        'origin_alias': function () { return $('#origin_alias').val(); }
                    }
                }
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $(form).ajaxSubmit({
                dataType : 'json',
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

    initSelect2();
    function initSelect2() {
        $('#adminuserid').select2({
            ajax: {
                url: function(){
                    return ctx + '/dashboard/user/match/agency';
                },
                dataType: 'json',
                quietMillis: 100,
                cache: true,
                data: function(term, page) {
                    return {
                        q: term,
                        page_limit: 30,
                        page: page
                    };
                },
                results: function(data, page) {

                    var results = [];
                    var more = (page * 30) < data.total;

                    $.each(data.users, function(index, item) {
                        results.push({
                            id: item.id,
                            name: item.title
                        });
                    });

                    return { results: results, more: more };
                }
            },
            initSelection: function(element, callback) {
                var data = [];
                $(element.val().split(",")).each(function() {
                    data.push({
                        id: this,
                        name: this
                    });
                });
                callback(data);
            },
            formatSelection: function(item) {
                return item.name;
            },
            formatResult: function(item) {
                return item.name;
            },
            multiple: true,
            minimumInputLength: 1,
            formatInputTooShort: "请输入至少一个字符",
            maximumSelectionSize: 200,
            placeholder: "请输入服务机构名称",
            width: 'off',
            createSearchChoice: function() {
                return null;
            }
        });
    }

    var adminuserid = $("#adminuserid").val();
    var adminusername = $("#adminuserid").attr("username");

    if (adminuserid != '') {
        $("#adminuserid-div .select2-choices").empty();
        $("#adminuserid-div .select2-choices").prepend("<li class='select2-search-choice'>    <div>" + adminusername + "</div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>");
        $("#adminuserid").append("<option selected value='" + adminuserid + "'>" + adminusername + "</option>");

        $("#adminuserid-div .select2-choices .select2-search-choice-close").click(function() {
            $("#adminuserid-div").empty();
            $("#adminuserid-div").append('<div class="col-md-3 control-label"><label for="adminuserid">管理员<span class="red">*</span></label></div><div class="col-md-7 controls"><input type="text" id="adminuserid" name="adminuserid" username="" value="" class="width-full select2-search-choice-close" data-match-url="${ctx}/dashboard/user/match/agency"></div>');
            initSelect2();
        });
    }

});