$(function () {
    $('#content-' + menu).addClass('active open');
    $('#product_' + menu).addClass('active');

    KindEditor.ready(function (K) {
        window.editor = K.create('#body', {
            height: "300px",
            uploadJson: ctx + '/file/editor',
            fileManagerJson: ctx + '/file/manager',
            items : [
                'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                'insertunorderedlist']
        });
    });

    $("div[class=col-xs-12]").mouseout(function(){
        var value = $.trim($(document.getElementsByTagName("iframe")[0].contentWindow.document.body).html());
        $("#body").text(value);
    });

    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");

    jQuery.validator.addMethod("isTel", function(value, element) {
        var length = value.length;
        var tel =  /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;
        return (tel.test(value));
    }, "请正确填写您的联系电话( 固定电话) ");

    var $form = $('#product-create-form');

    $form.validate({
        ignore: [],
        rules: {
            title: {
                required: true,
                rangelength: [1, 30]
            },
            producttradeid: {
                required: true
            },
            contactname: {
                required: true,
                rangelength: [1, 16]
            },
            tel: {
                required: true,
                rangelength: [1, 16],
                isTel:true
            },
            mobile: {
                required: false,
                rangelength: [1, 16],
                isMobile:true
            },
            email: {
                required: true,
                rangelength: [1, 32],
                email:true
            },
            pictureone: {
                required: true
            },
            body: {
                required: true
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            form.submit();
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        },
        errorElement: "span",
        errorClass: "error"
    });

    $("#product-submit").click(function () {
        $form.submit();
    });

    new SimpleSelectTree($("#productTradeName"), $("#productTradeId"), $("#treePanel"), zNodes);

    $('[data-rel=picture]').popover({
        container: 'body',
        html: true
    });

    // 产品图片
    var pictures = $("#product-pictures").children();

    var file_input = $form.find('input[type=file]');

    var myDropzone, maxFiles = 5;
    try {
        Dropzone.autoDiscover = false;
        myDropzone = new Dropzone("#dropzone" , {
            // 文件提交的name
            paramName: "file",

            // 文件数量
            maxFiles: maxFiles,
            dictMaxFilesExceeded: "最多可上传{{maxFiles}}张图片！",

            // 文件类型
            acceptedFiles: "image/jpg, image/jpeg, image/png, image/gif, image/bmp",
            dictInvalidFileType: "不支持此文件类型！",
            accept: function(file, done) {
                if (getFileCount() == maxFiles) {
                    done("最多可上传" + maxFiles + "张图片！");
                } else {
                    return done();
                }
            },

            // 文件大小
            maxFilesize: 2, // MB
            dictFileTooBig: "图片太大({{filesize}}MB). 最大限制: {{maxFilesize}}MB.",

            // 删除按钮
            addRemoveLinks : true,
            dictRemoveFile: "删除文件",
            dictRemoveFileConfirmation: "确认删除文件？",
            removedfile: function(file) {
                for (var i = 0; i < pictures.length; i++) {
                    var picture = $(pictures[i]);
                    // 查找想要删除的文件
                    if (file.name == picture.attr("filename")) {
                        var j;
                        // 把后面的文件向前挪
                        for (j = i; j < pictures.length - 1; j++) {
                            var picture_next = $(pictures[j + 1]);
                            $(pictures[j]).val(picture_next.val());
                            $(pictures[j]).attr("filename", picture_next.attr("filename"));
                        }
                        // 上面的循环不能覆盖最后一个问题，所以手动覆盖一下
                        $(pictures[j]).val("");
                        $(pictures[j]).attr("filename", "");
                    }
                }

                var _ref;
                if (file.previewElement) {
                    if ((_ref = file.previewElement) != null) {
                        _ref.parentNode.removeChild(file.previewElement);
                        Notify.success("删除成功！");

                        // 如果删除的是最后一个文件，就显示提示信息
                        if (getFileCount() == 0) {
                            $("#dropzone .dz-message").show();
                        }
                    }
                }
                return this._updateMaxFilesReachedClass();
            },

            // 默认提示信息
            dictDefaultMessage :
                '<span class="bigger-150 bolder"><i class="ace-icon fa fa-caret-right red"></i>点击此处</span> 上传图片<br />\<span class="smaller-80 grey">最多可上传5张图片，每张不大于2MB，仅限*.jpg;*.png;*.jpeg格式</span> <br /> \<i class="upload-icon ace-icon fa fa-cloud-upload blue fa-3x"></i>',

            // 错误提示
            dictResponseError: '上传文件失败!',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>"
        });

        // 上传成功
        Dropzone.prototype._finished = function(files, responseText, e) {
            var file, _i, _len;
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                file.status = Dropzone.SUCCESS;
                this.emit("success", file, responseText, e);
                this.emit("complete", file);

                // 此处是重写的部分 start
                // 写入表单隐藏域
                var path = responseText.fileName;
                for (var k = 0; k < pictures.length; k++) {
                    var picture = $(pictures[k]);
                    if (picture.val() == '') {
                        Notify.success("上传成功！");
                        picture.val(path);
                        picture.attr("filename", file.name);
                        break;
                    }
                }
                // 此处是重写的部分 end

            }

            if (this.options.uploadMultiple) {
                this.emit("successmultiple", files, responseText, e);
                this.emit("completemultiple", files);
                return this._updateMaxFilesReachedClass();
            }
            if (this.options.autoProcessQueue) {
                return this.processQueue();
            }
        };

        // 上传失败
        Dropzone.prototype._errorProcessing = function(files, message, xhr) {
            var file, _i, _len;
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                file.status = Dropzone.ERROR;
                this.emit("error", file, message, xhr);
                this.emit("complete", file);
            }
            if (this.options.uploadMultiple) {
                this.emit("errormultiple", files, message, xhr);
                this.emit("completemultiple", files);
            }

            // 重新此部分 start
            for (var i = 0; i < files.length; i++) {
                var file = ($(files[i])[0]);
                file.previewElement.parentNode.removeChild(file.previewElement);
                Notify.error(message);
                return;
                //return this._updateMaxFilesReachedClass();
            }
            // 重新此部分 end

            if (this.options.autoProcessQueue) {
                return this.processQueue();
            }
        };
    } catch(e) {
        alert('文件上传插件不支持此版本浏览器！');
    }

    var values = [$("#pictureone").val(), $("#picturetwo").val(), $("#picturethree").val(), $("#picturefour").val(), $("#picturefive").val()];

    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        if (value != '') {
            $("#dropzone .dz-message").hide();
            $("#dropzone").append(getTemplate(value));
            addRemoveFileListener(value);
        }
    }

    function getTemplate(value) {
        var src = ctx + value;
        $("#picture-template div div img").attr("src", src);
        var id = value.substring(value.lastIndexOf("/") + 1, value.lastIndexOf("."));
        $("#picture-template div a").attr("id", id);
        return $("#picture-template").html();
    }

    function addRemoveFileListener(value) {
        var id = value.substring(value.lastIndexOf("/") + 1, value.lastIndexOf("."));
        $("#" + id).click(function() {
            if (window.confirm("确认删除文件？")) {
                $(this).parent().hide();
                var count = 0;
                for (var i = 0; i < pictures.length; i++) {
                    var picture = $(pictures[i]);
                    // 查找想要删除的文件
                    if (picture.val().indexOf(id) >= 0) {
                        Notify.success("删除成功！");
                        var j;
                        // 把后面的文件向前挪
                        for (j = i; j < pictures.length - 1; j++) {
                            var picture_next = $(pictures[j + 1]);
                            $(pictures[j]).val(picture_next.val());
                            $(pictures[j]).attr("filename", picture_next.attr("filename"));
                        }
                        // 上面的循环不能覆盖最后一个问题，所以手动覆盖一下
                        $(pictures[j]).val("");
                        $(pictures[j]).attr("filename", "");
                    }
                    if (picture.val() != '') {
                        count++;
                    }
                }

                // 如果删除的是最后一个文件，就显示提示信息
                if (count == 0) {
                    $("#dropzone .dz-message").show();
                }
            }
        });
    }

    function getFileCount() {
        var count = 0;
        for (var i = 0; i < pictures.length; i++) {
            if ($(pictures[i]).val() != '') {
                count++;
            }
        }
        return count
    }
});
