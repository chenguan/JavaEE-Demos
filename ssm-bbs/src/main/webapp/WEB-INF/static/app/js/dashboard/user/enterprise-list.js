$(function(){
    $('#user-manage').addClass('active open');
    $('#user-enterprise-list').addClass('active');

    $(".partakeActivity").click(function(){
        var url = $(this).attr("href");
        url = url.replace("partakeActivity", "jqgrid/partakeActivity");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                //data: grid_data,
                //datatype: "local",
                url : url,
                datatype : "json",
                mtype : "get",
                //styleUI : 'Bootstrap',
                //rownumbers: true,
                colNames : [ '服务档案标题', '主办机构名称', '参与人', '参与企业名称', '服务分类', '活动开始时间'],
                colModel: [
                    { name: 'title', key: false, width: 180},
                    { name: 'sponsororgname', width: 180},
                    { name: 'contactPerson', width: 70 },
                    { name: 'orgName', width: 180 },
                    { name: 'servicebigname', width: 120 },
                    { name: 'starttime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 150}
                ],
                //shrinkToFit:false,
                //autoScroll: false,
                //altRows: true,
                viewrecords: true,
                height: 225,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
            /*$("#jqGrid").jqGrid('navGrid', "#jqGridPager",
                { 	//navbar options
                    edit: true,
                    editicon : 'icon-pencil blue',
                    add: true,
                    addicon : 'icon-plus-sign purple',
                    del: true,
                    delicon : 'icon-trash red',
                    search: true,
                    searchicon : 'icon-search orange',
                    refresh: true,
                    refreshicon : 'icon-refresh green',
                    view: true,
                    viewicon : 'icon-zoom-in grey',
                });*/
        }, 750);
    });

    $(".enrollActivity").click(function(){
        var url = $(this).attr("href");
        url = url.replace("enrollActivity", "jqgrid/enrollActivity");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '活动标题', '发布机构名称', '创建时间'],
                colModel: [
                    { name: 'title', key: true, width: 400 },
                    { name: 'source', width: 340 },
                    {  name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 120}
                ],
                viewrecords: true,
                height: 225,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 750);
    });

    $(".enrollnum").click(function(){
        var url = $(this).attr("href");
        url = url.replace("enrollnum", "jqgrid/enrollnum");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '活动标题', '参与人', '发布机构名称', '服务分类', '创建时间'],
                colModel: [
                    { name: 'title', key: true, width: 280 },
                    { name: 'username', width: 200 },
                    { name: 'orgname', width: 200 },
                    { name: 'servicetype', width: 100 },
                    { name: 'publishedtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 100}
                ],
                viewrecords: true,
                height: 225,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 750);
    });



    $(".appealAmount").click(function(){
        var url = $(this).attr("href");
        url = url.replace("appealAmount", "jqgrid/appealAmount");
        window.setTimeout(function(){
            $("#jqGrid").jqGrid({
                url : url,
                datatype : "json",
                mtype : "get",
                colNames : [ '诉求单号', '标题', '企业名称', '诉求类型', '服务分类', '是否选择服务机构', '状态', '申请时间'],
                colModel: [
                    { name: 'demandno', key: true, width: 90 },
                    { name: 'title', width: 155 },
                    { name: 'orgname', width: 165 },
                    { name: 'type', width: 85},
                    { name: 'servicetype', width: 85},
                    { name: 'replace', width: 130, formatter:function(value,options,rowData){
                        if( value===0 ){
                            return '未选择';
                        }else{
                            return '已选择';
                        }}},
                    { name: 'status', width: 65, formatter:function(value,options,rowData){
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
                    { name: 'createdtime', formatter:'date', formatoptions: {newformat:'Y-m-d'}, width: 105}
                ],
                viewrecords: true,
                height: 225,
                rowNum: 10,
                pager: "#jqGridPager",
                loadComplete : function() {
                    var table = this;
                    setTimeout(function(){
                        updatePagerIcons(table);
                    }, 0);
                }
            });
        }, 750);
    });

    $(".productAmount").click(function(){

    });

    $(".applyAmount").click(function(){

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


