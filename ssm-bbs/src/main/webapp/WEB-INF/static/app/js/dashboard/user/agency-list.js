$(function(){
    $('#user-manage').addClass('active open');
    $('#user-agency-list').addClass('active');

    $(".news").click(function(){
        var url = $(this).attr("href");
        url = url.replace("news", "jqgrid/news");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : ['标题', '发布机构名称', '发布状态', '创建时间', '有效期'],
                colModel: [
                    { name: 'title', key: true, width: 250 },
                    { name: 'orgname', width: 250 },
                    { name: 'status', width: 120, formatter:function(value,options,rowData){
                        if( value == 'unpublished' ){
                            return '未发布';
                        }else if( value == 'published' ){
                            return '已发布';
                        }else if( value == 'back' ){
                            return '退回';
                        }else if( value == 'trash' ){
                            return '回收站';
                        }
                    }},
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120 },
                    { name: 'expiredate', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".newsOnline").click(function(){
        var url = $(this).attr("href");
        url = url.replace("newsOnline", "jqgrid/newsOnline");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : ['标题', '发布机构名称', '发布状态', '创建时间', '有效期'],
                colModel: [
                    { name: 'title', key: true, width: 250 },
                    { name: 'orgname', width: 250 },
                    { name: 'status', width: 120, formatter:function(value,options,rowData){
                        if( value == 'unpublished' ){
                            return '未发布';
                        }else if( value == 'published' ){
                            return '已发布';
                        }else if( value == 'back' ){
                            return '退回';
                        }else if( value == 'trash' ){
                            return '回收站';
                        }
                    }},
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120 },
                    { name: 'expiredate', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".commonProblem").click(function(){
        var url = $(this).attr("href");
        url = url.replace("commonProblem", "jqgrid/commonProblem");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : ['标题', '发布机构名称', '发布状态', '创建时间', '有效期'],
                colModel: [
                    { name: 'title', key: true, width: 250 },
                    { name: 'orgname', width: 250 },
                    { name: 'status', width: 120, formatter:function(value,options,rowData){
                        if( value == 'unpublished' ){
                            return '未发布';
                        }else if( value == 'published' ){
                            return '已发布';
                        }else if( value == 'back' ){
                            return '退回';
                        }else if( value == 'trash' ){
                            return '回收站';
                        }
                    }},
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120 },
                    { name: 'expiredate', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".appealHandle").click(function(){
        var url = $(this).attr("href");
        url = url.replace("appealHandle", "jqgrid/appealHandle");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '诉求单号', '标题', '发起企业名称', '诉求类型', '服务分类', '是否选择服务机构', '状态', '申请时间'],
                colModel: [
                    { name: 'demandno', key: true, width: 120 },
                    { name: 'title', width: 120 },
                    { name: 'orgname', width: 170},
                    { name: 'type', width: 80},
                    { name: 'servicetype', width: 100},
                    { name: 'replace', width: 125, formatter:function(value,options,rowData){
                        if( value===0 ){
                            return '未选择';
                        }else{
                            return '已选择';
                        }}},
                    { name: 'status', width: 70, formatter:function(value,options,rowData){
                        if( value == 'complete' ){
                            return '已完成';
                        }else if( value == 'checkout' ){
                            return '处理中';
                        }else if( value == 'forwarding' ){
                            return '待处理';
                        }else if( value == 'back' ){
                            return '已退回';
                        }
                    }},
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 90}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".activityRelease").click(function(){
        var url = $(this).attr("href");
        url = url.replace("activityRelease", "jqgrid/activityRelease");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '标题', '发布机构名称', '发布状态', '创建时间', '有效期'],
                colModel: [
                    { name: 'title', key: true, width: 250 },
                    { name: 'orgname', width: 250 },
                    { name: 'status', width: 120, formatter:function(value,options,rowData){
                        if( value == 'unpublished' ){
                            return '未发布';
                        }else if( value == 'published' ){
                            return '已发布';
                        }else if( value == 'back' ){
                            return '退回';
                        }else if( value == 'trash' ){
                            return '回收站';
                        }
                    }},
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120 },
                    { name: 'expiredate', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".activityEnroll").click(function(){
        var url = $(this).attr("href");
        url = url.replace("activityEnroll", "jqgrid/activityEnroll");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '标题', '发布机构名称', '报名企业', '报名人', '创建时间', '有效期'],
                colModel: [
                    { name: 'title', key: true, width: 300 },
                    { name: 'source', width: 170 },
                    { name: 'orgname', width: 130 },
                    { name: 'username', width: 100 },
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 90 },
                    { name: 'expiredate', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 90}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".serviceItem").click(function(){
        var url = $(this).attr("href");
        url = url.replace("serviceItem", "jqgrid/serviceItem");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '项目名称', '发布机构名称', '联系人', '电子邮箱', '手机号码', '联系电话', '创建时间'],
                colModel: [
                    { name: 'itemname', key: true, width: 210 },
                    { name: 'orgname', width: 190 },
                    { name: 'linkman', width: 70 },
                    { name: 'email', width: 120 },
                    { name: 'mobilephone', width: 90 },
                    { name: 'telephone', width: 90 },
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 90}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".serviceCase").click(function(){
        var url = $(this).attr("href");
        url = url.replace("serviceCase", "jqgrid/serviceCase");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '服务案例名称', '服务项目名称', '创建机构', '创建时间'],
                colModel: [
                    { name: 'title', key: true, width: 250 },
                    { name: 'serviceitemname',  width: 250 },
                    { name: 'orgname', width: 250 },
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".serviceArchive").click(function(){
        var url = $(this).attr("href");
        url = url.replace("serviceArchive", "jqgrid/serviceArchive");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '活动主题', '开始时间', '结束时间', '企业数量', '人数', '收入', '财政拨款'],
                colModel: [
                    { name: 'title', key: true, width: 180 },
                    { name: 'starttime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120 },
                    { name: 'endtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120 },
                    { name: 'partakeorgnum', width: 120 },
                    { name: 'partakeorgnumpeople', width: 90 },
                    { name: 'servicerevenue', width: 120 },
                    { name: 'financegrant', width: 120}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".serviceOrgs").click(function(){
        var url = $(this).attr("href");
        url = url.replace("serviceOrgs", "jqgrid/serviceOrgs");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '企业名称', '联系人', '手机号码', '联系电话', '服务日期'],
                colModel: [
                    { name: 'orgname', key: true, width: 270 },
                    { name: 'contactperson', width: 150 },
                    { name: 'mobilephone', width: 150 },
                    { name: 'telephone', width: 150 },
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 150}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".serviceOrgNum").click(function(){
        var url = $(this).attr("href");
        url = url.replace("serviceOrgNum", "jqgrid/serviceOrgNum");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '企业名称', '联系人', '手机号码', '联系电话', '服务意见'],
                colModel: [
                    { name: 'orgname', key: true, width: 270 },
                    { name: 'contactperson', width: 150 },
                    { name: 'mobilephone', width: 150 },
                    { name: 'telephone', width: 150 },
                    { name: 'serviceopinion', width: 150}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".serviceNum").click(function(){
        var url = $(this).attr("href");
        url = url.replace("serviceNum", "jqgrid/serviceNum");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : ['企业名称', '联系人', '手机号码', '联系电话', '服务意见'],
                colModel: [
                    { name: 'orgname', key: true, width: 270 },
                    { name: 'contactperson', width: 150 },
                    { name: 'mobilephone', width: 150 },
                    { name: 'telephone', width: 150 },
                    { name: 'serviceopinion', width: 150}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".synergismRelease").click(function(){
        var url = $(this).attr("href");
        url = url.replace("synergismRelease", "jqgrid/synergismRelease");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '标题', '手机号码', '联系电话', '邮箱', '申请日期'],
                colModel: [
                    { name: 'title', key: true, width: 270 },
                    { name: 'mobile', width: 150 },
                    { name: 'tel', width: 150 },
                    { name: 'email', width: 150 },
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 150}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    $(".synergismResponse").click(function(){
        var url = $(this).attr("href");
        url = url.replace("synergismResponse", "jqgrid/synergismResponse");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : ['标题', '手机号码', '联系电话', '邮箱', '申请日期'],
                colModel: [
                    { name: 'title', key: true, width: 270 },
                    { name: 'mobile', width: 150 },
                    { name: 'tel', width: 150 },
                    { name: 'email', width: 150 },
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 150}
                ],
                viewrecords: true,
                height: 250,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 800);
    });

    function updatePagerIcons(table) {
        $('.ui-jqgrid-labels .s-ico').hide();
        $('.ui-jqgrid-labels .s-ico').parent().removeClass('ui-jqgrid-sortable').attr('style','font-size: 13px;');
        var replacement =
        {
            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
        };
        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
        });
    }

});