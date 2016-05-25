$(function () {
    $('#public-service').addClass('active open');
    $('#apply').addClass('active');

    var $form = $('#step2-form');

    $("#temporary-save").click(function(){
        $form.submit();
    });

    if($("#zhuan").prop('checked')){
        $("#zhuan-box").find("input").prop("disabled", false);
    }

    if($("#jing").prop('checked')){
        $("#jing-box").find("input").prop("disabled", false);
    }

    if($("#te").prop('checked')){
        $("#te-box").find("input").prop("disabled", false);
    }

    if($("#xin").prop('checked')){
        $("textarea[name='xinInput1']").prop("disabled", false);
    }

    $('textarea.limited').inputlimiter({
        remText: '还可以输入 %n ，',
        limitText: '最多允许 %n 个字。'
    });

    var options = {
        ignore: [],
        rules: {
            capital: {
                required: true,
                digits: true,
                maxlength: [20]
            },
            regAddress: {
                required: true,
                maxlength: [500]
            },
            regAddressZip: {
                required: true,
                digits: true,
                maxlength: [32]
            },
            linkAddress: {
                required: true,
                maxlength: [500]
            },
            linkAddressZip: {
                required: true,
                digits: true,
                maxlength: [32]
            },
            site: {
                required: true,
                url: true,
                maxlength: [100]
            },
            orgMan: {
                required: true,
                maxlength: [32]
            },
            orgManJob: {
                required: true,
                maxlength: [32]
            },
            orgManTel: {
                required: true,
                isTel: true
            },
            orgManMobile: {
                required: true,
                isMobile: true
            },
            linkMan: {
                required: true,
                maxlength: [32]
            },
            linkManJob: {
                required: true,
                maxlength: [32]
            },
            linkManTel: {
                required: true,
                isTel: true
            },
            linkManMobile: {
                required: true,
                isMobile: true
            },
            linkManFax: {
                required: true,
                isTel: true
            },
            linkManEmail: {
                required: true,
                email: true
            },
            total0: {
                required: true,
                number: true
            },
            total1: {
                required: true,
                number: true
            },
            total2: {
                required: true,
                number: true
            },
            business0: {
                required: true,
                number: true
            },
            business1: {
                required: true,
                number: true
            },
            business2: {
                required: true,
                number: true
            },
            employee0: {
                required: true,
                number: true
            },
            employee1: {
                required: true,
                number: true
            },
            employee2: {
                required: true,
                number: true
            },
            profit0: {
                required: true,
                number: true
            },
            profit1: {
                required: true,
                number: true
            },
            profit2: {
                required: true,
                number: true
            },
            revenue0: {
                required: true,
                number: true
            },
            revenue1: {
                required: true,
                number: true
            },
            revenue2: {
                required: true,
                number: true
            },
            attachment: {
                required: function () {
                    var result = false;
                    $("[data-index]").each(function () {
                        if($(this).has("input").length == 0) {
                            result = true;
                        };
                    });
                    return result;
                }
            }
        },
        messages: {
            attachment: {
                required: "每项至少需要一个附件"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    };

    /**
     * 提交申报信息
     *
     * @param step
     */
    $form.submit(function(){
        var obj = $(this).serializeObject();

        $(this).ajaxSubmit({
            type: 'post',
            data: {
                step2: JSON.stringify(obj)
            },
            dataType : 'json',
            success : function () {
                Notify.success("保存成功。");
            },
            error: function(data,textstatus){
                Notify.error("申报内容保存失败，如果使用 IE9 建议更换 Chrome 浏览器再尝试。");
            }
        });
        return false;
    });

    $('#my-wizard').ace_wizard()
        .on('actionclicked.fu.wizard', function (e, info) {
            var step = info.step;

            if(info.direction == "previous"){
                if (step == 3) {
                    $("#temporary-save").removeClass('hide');
                }
                if (step == 2) {
                    $("#temporary-save").addClass('hide');
                }
                return;
            }

            if (step == 1) {
                $("#temporary-save").removeClass('hide');
                return true;
            }

            if (step == 2) {
                $form.validate(options);
                if($form.valid()){
                    $("#temporary-save").addClass('hide');
                    $form.submit();
                }else{
                    Notify.warning("请先完成表单内容。");
                    return false;
                };
            }
        })
        .on('finished.fu.wizard', function (e) {
            $("#finish-form").submit();
        });

    $('input[name=zhuan]').change(function() {
        if($(this).prop('checked')){
            $("#zhuan-box").find("input").prop("disabled", false);
            $("input[name=zhuanInput0]").rules("add", { required: true, messages: {required: '专项技术名称必须填写<br>'} });
            $("input[name=zhuanInput1]").rules("add", { required: true, messages: {required: '细分市场名次必须填写<br>' } });
            $("input[name=zhuanInput2]").rules("add", { required: true, messages: {required: '产品或服务必须填写<br>' } });
            $("input[name=zhuanInput3]").rules("add", { required: true, messages: {required: '上年度名次必须填写<br>' } });
        }else{
            $("#zhuan-box").find("input").prop("disabled", true);
        }
    });

    $('input[name=jing]').change(function() {
        if($(this).prop('checked')){
            $("#jing-box").find("input").prop("disabled", false);
            $("input[name=jingInput1]").rules("add", { required: true, messages: {required: '发明专利必须填写<br>'} });
            $("input[name=jingInput2]").rules("add", { required: true, messages: {required: '软件著作权必须填写<br>' } });
            $("input[name=jingInput3]").rules("add", { required: true, messages: {required: '专有技术必须填写<br>' } });
            $("input[name=jingInput4]").rules("add", { required: true, messages: {required: '企业设立必须填写<br>' } });
            $("input[name=jingInput5]").rules("add", { required: true, messages: {required: 'R&D投入比例必须填写<br>' } });
        }else{
            $("#jing-box").find("input").prop("disabled", true);
        }
    });

    $('input[name=te]').change(function() {
        if($(this).prop('checked')){
            $("#te-box").find("input").prop("disabled", false);
            $("input[name=teInput1]").rules("add", { required: true, messages: {required: '主制修订必须填写<br>'} });
            $("input[name=teInput2]").rules("add", { required: true, messages: {required: '品牌称号必须填写<br>' } });
        }else{
            $("#te-box").find("input").prop("disabled", true);
        }
    });

    $('input[name=xin]').change(function() {
        if($(this).prop('checked')){
            $("textarea[name='xinInput1']").prop("disabled", false);
            $("textarea[name='xinInput1']").rules("add", { required: true});
        }else{
            $("textarea[name='xinInput1']").prop("disabled", true);
        }
    });

    $('a[data-action=delete]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.profile-activity').hide(300, function () {
            $(this).remove();
        });
    });

    $("input[id^='fileupload']").fileupload({
        dataType: 'json',
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|pdf|doc|docx)$/i,
        maxFileSize: 5210000, // 5 MB
        done: function (e, data) {
            var $file_list_div = $(this).parent().parent().find("[data-index]");
            var index = $file_list_div.data('index');
            var file = $('<div>' + data.result.name + '</div>').appendTo($file_list_div);
            file.wrap('<div class="profile-activity clearfix"></div>')
                .parent()
                .append('<input type="hidden" name="attachment' + index + '" value="' + data.result.name + "|" + data.result.fileName + '"/>')
                .append('<div class="tools action-buttons">\
							<a href="#" data-action="delete" class="red">\
								<i class="ace-icon fa fa-trash-o red bigger-130 middle"></i>\
							</a>\
						</div>')
                .find('a[data-action=delete]').on('click', function (e) {
                    e.preventDefault();
                    $(this).closest('.profile-activity').hide(300, function () {
                        $(this).remove();
                    });
                });
        },
        fail: function (e, data) {
            Notify.error("上传失败！");
        },
        processalways: function (e, data) {
            var index = data.index,
                file = data.files[index];
            if (file.error) {
                Notify.error(file.error);
            }
        },
        messages: {
            acceptFileTypes: '类型不合法。',
            maxFileSize: '大小超过限制。'
        }
    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');

});