$(function() {
    $('#public-service').addClass('active open');
    $('#outer_service_archive').addClass('active');

    if(orgCode != ""){
        $('#sponsororgcode').val(orgCode);
    }

    if(orgTitle != ""){
        $('#sponsororgname').val(orgTitle);
    }

    $('#starttime').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: 1,
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'
    });

    $('#endtime').datetimepicker({
        language: 'zh-CN',
        autoclose: 1,
        todayBtn: 1,
        pickerPosition: "bottom-left",
        minuteStep: 5,
        format: 'yyyy-mm-dd',
        minView: 'month'
    });

    function isTel(value,x,y) {
        var str =  /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,6})?$/;
        if(str.test(value)){
            return true;
        }else{
            Notify.error("第"+x+"行第"+y+"列请填写正确的联系电话！");
            return false;
        }
    };

    function isMobile(value,x,y) {
        var length = value.length;
        var mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(length == 11 && mobile.test(value)){
            return true;
        }else{
            Notify.error("第"+x+"行第"+y+"列请填写正确的移动电话！");
            return false;
        }
    };

    function strLength(value,min,max,x,y) {
        var length = value.length;
        if(length <= max && length >= min){
            return true;
        }else{
            Notify.error("第"+x+"行第"+y+"列请输入"+min+"到"+max+"之间的字符！");
            return false;
        }
    };

    jQuery.validator.addMethod("compareDate", function (value, element) {
        var startNum = parseInt($("#starttime").val().replace(/-/g, ''), 10);
        var endNum = parseInt($("#endtime").val().replace(/-/g, ''), 10);
        return startNum <= endNum;
    }, "活动结束日期必须大于活动开始日期！");

    jQuery.validator.addMethod("selectId", function (value, element) {
        if($("#serviceitemid").val() ==""){
            return false;
        }else{
            return true;
        }
    }, "请选择服务项目！");

    jQuery.validator.addMethod("validateNumber1", function (value, element) {
        if($("#servicerevenue").val() !=""){
            var value = $("#servicerevenue").val();
            var numberStley = /^\d+(\.\d+)?$/;
            if( numberStley.test(value)){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }, "请输入正确的数值！");

    jQuery.validator.addMethod("validateNumber2", function (value, element) {
        if($("#financegrant").val() !=""){
            var value = $("#financegrant").val();
            var numberStley = /^\d+(\.\d+)?$/;
            if( numberStley.test(value)){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    }, "请输入正确的数值！");

    var $form = $('#archive-create-form');
    $form.validate({
        rules: {
            title: {
                required: true,
                rangelength: [1, 255]
            },
            starttime: {
                required: true,
            },
            endtime: {
                required: true,
                compareDate:true
            },
            serviceitemid:{
                selectId:true
            },
            activecontent: {
                required: true,
                rangelength: [1, 2000]
            },
            sponsororgcode: {
                required: true,
                isEntityCode: true,
                maxlength: [30]
            },
            sponsororgname: {
                required: true,
                rangelength: [1, 225]
            },
            servicerevenue:{
                validateNumber1: true
            },
            financegrant:{
                validateNumber2: true
            },
            assistorgname: {
                rangelength: [1, 1000]
            },
            serviceresults: {
                rangelength: [1, 2000]
            },
            activesummary: {
                required: true,
                rangelength: [1, 2000]
            }
        },
        submitHandler: function (form, event) {
            event.preventDefault();
            var p = new Array();
            var isPass ;
            if($("#totalNum").find("tr").length == 0){
                Notify.error("请添加参与单位！");
                return ;
            }
            $("#totalNum").find("tr").each(function (i) {
                var tds = $(this).find("td");
                var arr1 = {};
                tds.each(function (j) {
                    if (j == 0) {
                        /*var ngId = $(this).find("input:eq(0)").val();
                        if(ngId != "" && ngId != "undefined"){
                            arr1.id = ngId;
                        }*/
                        isPass = strLength($(this).find("input:eq(1)").val().trim(),1,40,i+1,j+1);
                        if(!isPass){
                            return false
                        }
                        arr1.orgname = $(this).find("input:eq(1)").val();
                    } else if (j == 1) {
                        isPass = strLength($(this).find("input").val().trim(),1,15,i+1,j+1);
                        if(!isPass){
                            return false
                        }
                        arr1.contactperson = $(this).find("input").val();
                    } else if (j == 2) {
                        var telVal = $(this).find("input").val().trim();
                        var mobVal = $(this).next().find("input").val().trim();
                        if(telVal == ""){
                            if(mobVal == ""){
                                var n = i+1;
                                Notify.error("第"+ n +"行请填写正确的联系电话或手机号码！");
                                isPass =  false;
                                return false
                            }else{
                                arr1.telephone = "";
                            }
                        }else{
                            isPass = isTel($(this).find("input").val().trim(),i+1,j+1);
                            if(!isPass){
                                return false
                            }
                            arr1.telephone = $(this).find("input").val();
                        }
                    } else if (j == 3) {
                        var mobVal = $(this).find("input").val().trim();
                        var telVal = $(this).prev().find("input").val().trim();
                        if(mobVal == ""){
                            if(telVal == ""){
                                var n = i+1;
                                Notify.error("第"+ n +"行请填写正确的联系电话或手机号码！");
                                isPass =  false;
                                return false
                            }else{
                                arr1.mobilephone = "";
                            }
                        }else{
                            isPass= isMobile($(this).find("input").val().trim(),i+1,j+1);
                            if(!isPass){
                                return false
                            }
                            arr1.mobilephone = $(this).find("input").val();
                        }
                    } else if (j == 4) {
                        arr1.serviceevaluation = $(this).find("select").val();
                    } else if (j == 5) {
                        isPass = strLength($(this).find("input").val().trim(),1,255,i+1,j+1);
                        if(!isPass){
                            return false
                        }
                        arr1.serviceopinion = $(this).find("input").val();
                    }
                });
                if(isPass){
                    p.push(arr1);
                }else{
                    return false;
                }
            });
            if(!isPass){
                return ;
            }
            var jsonText = JSON.stringify(p);
            $("#jsonValue").val(jsonText);
            form.submit();
        },
        focusInvalid : false,
        onfocusout: false,
        errorElement: "span",
        errorClass: "error"
    });

    //增加
    $("#add").click(function(){

        var tr = '<tr>' +
            '<td><input type="hidden" name="ngid"/><input class="col-xs-12 col-sm-12" maxlength="40" name="orgname" onkeyup="calculate()" autocomplete="off"/></td>' +
            '<td><input class="col-xs-12 col-sm-12" maxlength="15" name="contactperson"/></td>' +
            '<td><input class="col-xs-12 col-sm-12" maxlength="15" name="telephone"/></td>' +
            '<td><input class="col-xs-12 col-sm-12" name="mobilephone"/></td>' +
            '<td><select class="col-xs-12 col-sm-12" name="serviceevaluation">' +
            '<option selected="" value="1">很满意</option>' +
            '<option value="2">满意</option>' +
            '<option value="3">一般</option>' +
            '<option value="4">不满意</option>' +
            '<option value="5">差</option>' +
            '</select></td>' +
            '<td><input class="col-xs-12 col-sm-12" maxlength="255" name="serviceopinion"/></td>' +
            '<td align="center">' +
            '<a href="javascript:;" class="dele">删除</a>' +
            '</td></tr>';
        $("#totalNum").append(tr);
    });

    $(document).delegate(".success", "click", function () {
        var $tr = $(this).parent().parent();
        var $tds = $tr.find("td");
        var tr = '<tr>';
        $tds.each(function (i) {
            if (i < $tds.length - 1) {
                var $input = $(this).find("input");
                var name = $input.attr("name");
                var value = $.trim($input.val());
                tr = tr + '<td><span>' + value + '</span></td>';
            }
        });
        tr = tr + '<td><a href="javascript:;" class="dele">删除</a></td></tr>';
        $("#step3-table").append(tr);
        $tr.remove();
    });

    //删除
    $(document).delegate(".dele", "click", function () {
        var $tr = $(this).parent().parent();
        var name = $tr.find("td").first().find("span").text();
        if (confirm('确定删除' + name + '吗？')) {
            $tr.remove();
            calculate();
        }
    });

    $("#uploadify").uploadify({
        'swf':  ctx + '/static/libs/uploadify/uploadify.swf',
        'uploader': ctx + '/dashboard/service/archive/uploadorg;JSESSIONID='+sessionid,
        /*formData : {'session_id' : $('#sessionid').val()},*/
        'buttonText': '批量导入',
        'fileTypeExts' : '*.xlsx',
        'fileSizeLimit': '2048KB',
        'queueSizeLimit': 1,
        'width': 150,
        'fileObjName' : 'file',
        'auto': true,
        'onUploadStart' : function(file) {
        },
        'onUploadSuccess' : function(file, data, response) {
            var dataObj = eval("("+data+")");
            if(dataObj.success == 1){
                var partOrg = dataObj.partOrg;
                //console.info(partOrg);
                backresponse(partOrg);
                $(".ace-file-name").attr('data-title', file.name);
            }else{
                alert(dataObj.message);
            }
        }
    });

   if(jsonValue != ''){
       $("#contM").html($("#partakeorgnum").val());
       $("#contN").html($("#partakeorgnumpeople").val());
       var obj = JSON.parse(jsonValue);
       for(var i=0; i < obj.length; i++){

           var k= obj[i].serviceevaluation;
           var tr = '<tr>' +
               '<td><input type="hidden" name="ngid" value="'+ obj[i].id+'"/><input class="col-xs-12 col-sm-12" maxlength="15" name="orgname" onkeyup="calculate()" autocomplete="off" value="'+ obj[i].orgname+'"/></td>' +
               '<td><input class="col-xs-12 col-sm-12" maxlength="15" name="contactperson" value="'+ obj[i].contactperson+'"/></td>' +
               '<td><input class="col-xs-12 col-sm-12" maxlength="15" name="telephone" value="'+ obj[i].telephone+'"/></td>' +
               '<td><input class="col-xs-12 col-sm-12" name="mobilephone" value="'+ obj[i].mobilephone+'" /></td>' +
               '<td><select class="col-xs-12 col-sm-12" name="serviceevaluation">' ;
               if(k==1){
                   tr+='<option selected="" value="1">很满意</option>';
               }else{
                   tr+='<option value="1">很满意</option>';
               }

               if(k == 2){
                   tr+='<option selected="" value="2">满意</option>';
               }else{
                   tr+='<option value="2">满意</option>';
               }

                if(k == 3){
                    tr+='<option selected="" value="3">一般</option>';
                }else{
                    tr+='<option value="3">一般</option>';
                }

                if(k == 4){
                    tr+='<option selected="" value="4">不满意</option>';
                }else{
                    tr+='<option value="4">不满意</option>';
                }

                if(k == 5){
                   tr+='<option selected="" value="5">差</option>';
                }else{
                   tr+='<option value="5">差</option>';
                }


               tr+='</select></td>' +
               '<td><input class="col-xs-12 col-sm-12" maxlength="255" name="serviceopinion" value="'+ obj[i].serviceopinion+'"/></td>' +
               '<td align="center">' +
               '<a href="javascript:;" class="dele">删除</a>' +
               '</td></tr>';
                $("#totalNum").append(tr);
       }
   }


    if(jsonOrg != ''){
        $("#contM").html(partakeorgnum);
        $("#contN").html(partakeorgnumpeople);
        var obj = JSON.parse(jsonOrg);
        for(var i=0; i < obj.length; i++){

            var valueOpinion = obj[i].returnvisitopinion;
            var k= obj[i].serviceevaluation;
            var tr = '<tr>' +
                '<td>'+ obj[i].orgname+'</td>' +
                '<td>'+ obj[i].contactperson+'</td>' +
                '<td>'+ obj[i].telephone+'</td>' +
                '<td>'+ obj[i].mobilephone+'</td>';
            if(k==1){
                tr+='<td>很满意</td>';
            }

            if(k == 2){
                tr+='<td>满意</td>';
            }

            if(k == 3){
                tr+='<td>一般</td>';
            }

            if(k == 4){
                tr+='<td>不满意</td>';
            }

            if(k == 5){
                tr+='<td>差</td>';
            }

                tr+='<td>'+ obj[i].serviceopinion+'</td>' +
                '<td>' +
                '<div class="btn-group">';
            if(valueOpinion =='' || valueOpinion == null || valueOpinion == undefined || valueOpinion == '0'){
                /*tr+= '<a data-toggle="modal" class="btn btn-xs btn-inverse" href="'+ctx+'/dashboard/service/archive/'+obj[i].id+'/visitopinion" data-target="#myModal">设置评价</a>'+
                    '</div>' +
                    '</td>' +
                    '</tr>';*/
            }else{
                tr+= '<a data-toggle="modal" href="'+ctx+'/dashboard/service/archive/'+obj[i].id+'/viewopinion" data-target="#myModal">' +
                    '<span class="label label-info">查看评价</span></a>'+
                    '</div>' +
                    '</td>' +
                    '</tr>';
            }

            $("#totalNum").append(tr);
        }
    }

    $('#foo').bind('mouseenter mouseleave', function() {
        $(this).toggleClass('entered');
    });

});


function backresponse(partOrg){
    var obj = JSON.parse(partOrg);
    for(var i=0; i < obj.length; i++){

        var k= obj[i].serviceevaluation;
        var tr = '<tr>' +
            '<td><input type="hidden" name="ngid" value="'+ obj[i].id+'"/><input class="col-xs-12 col-sm-12" maxlength="15" name="orgname" onkeyup="calculate()" autocomplete="off" value="'+ obj[i].orgname+'"/></td>' +
            '<td><input class="col-xs-12 col-sm-12" maxlength="15" name="contactperson" value="'+ obj[i].contactperson+'"/></td>' +
            '<td><input class="col-xs-12 col-sm-12" maxlength="15" name="telephone" value="'+ obj[i].telephone+'"/></td>' +
            '<td><input class="col-xs-12 col-sm-12" name="mobilephone" value="'+ obj[i].mobilephone+'" /></td>' +
            '<td><select class="col-xs-12 col-sm-12" name="serviceevaluation">' ;
        if(k==1){
            tr+='<option selected="" value="1">很满意</option>';
        }else{
            tr+='<option value="1">很满意</option>';
        }

        if(k == 2){
            tr+='<option selected="" value="2">满意</option>';
        }else{
            tr+='<option value="2">满意</option>';
        }

        if(k == 3){
            tr+='<option selected="" value="3">一般</option>';
        }else{
            tr+='<option value="3">一般</option>';
        }

        if(k == 4){
            tr+='<option selected="" value="4">不满意</option>';
        }else{
            tr+='<option value="4">不满意</option>';
        }

        if(k == 5){
            tr+='<option selected="" value="5">差</option>';
        }else{
            tr+='<option value="5">差</option>';
        }


        tr+='</select></td>' +
            '<td><input class="col-xs-12 col-sm-12" maxlength="255" name="serviceopinion" value="'+ obj[i].serviceopinion+'"/></td>' +
            '<td align="center">' +
            '<a href="javascript:;" class="dele">删除</a>' +
            '</td></tr>';
        $("#totalNum").append(tr);
        window.setTimeout(function(){calculate()}, 300);
    }
}

function calculate() {
    //企业数量
    var count=0;
    //参与人数
    var pCount=0;
    //暂存企业
    var orgStr="";
    $("#totalNum").find("tr").each(function () {

        var orgName = $.trim($(this).find("td:first").find("input:eq(1)").val());
        if("" != orgName) {
            pCount++;
                if (orgStr.indexOf(" " + orgName + " ") == -1){
                    orgStr += (" " + orgName + " ");
                    count++;
                }
        }

    });

    jQuery("#partakeorgnum").val(count);
    jQuery("#partakeorgnumpeople").val(pCount);

    jQuery("#contM").html(count);
    jQuery("#contN").html(pCount);
}
