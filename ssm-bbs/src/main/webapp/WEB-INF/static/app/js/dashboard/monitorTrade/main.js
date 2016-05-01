$(function() {
    $('#monitor-data').addClass('active open');
    $('#monitor-trade').addClass('active');

	var showDeleteNotify = function(response) {
		Notify.success("删除成功");
	};

	function beforeEditName(treeId, treeNode) {
		$("#myModal").modal({
			remote : ctx + '/dashboard/monitor/manage/'+treeNode.id+'/edit'
		});
		return false;
	}

	var beforeRemove = function(treeId, treeNode) {
		return confirm("确认删除节点 " + treeNode.name + " 吗？");
	};

	function onRemove(event, treeId, treeNode) {
		var target = ctx + '/dashboard/monitor/manage/'+treeNode.id+'/delete';
			$.post(target).success(showDeleteNotify);
	}

	var addHoverDom = function(treeId, treeNode) {
		var sObj = $("#" + treeNode.tId + "_span");
		if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) {
			return;
		}
		var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='add'></span>";

		if(treeNode.isParent){
			sObj.after(addStr);
			var addBtn = $("#addBtn_" + treeNode.tId);
			if (addBtn) {
				addBtn.bind("click", function() {
					$("#myModal").modal({
						remote : ctx + '/dashboard/monitor/manage/create'
					});
				});
			}
		}
	};

	var removeHoverDom = function(treeId, treeNode) {
		$("#addBtn_" + treeNode.tId).unbind().remove();
	};

	function showRemoveBtn(treeId, treeNode) {


		return !treeNode.isParent;
	}
	function showRenameBtn(treeId, treeNode) {
		return !treeNode.isParent;
	}

	function zTreeOnClick(event, treeId, treeNode) {
		//alert(treeNode.tId + ", " + treeNode.name);
		if(treeNode.isParent){
			$("a.btn-primary").hide();
		}else{
			$("a.btn-primary").show();
		}
	};

	var setting1 = {
		view : {
			addHoverDom : addHoverDom,
			removeHoverDom : removeHoverDom
		},
		edit : {
			enable : true,
			editNameSelectAll: true,
			showRemoveBtn: showRemoveBtn,
			showRenameBtn: showRenameBtn
		},
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : {
			beforeEditName: beforeEditName,
			beforeRemove : beforeRemove,
			onRemove : onRemove,
			onClick: zTreeOnClick
		}
	};

	var setting2 = {
		check: {
			enable: true
		},
		data : {
			simpleData : {
				enable : true
			}
		}
	};

	$.fn.zTree.init($("#yyjc_tree"), setting1, yyjc_zNodes);
	$.fn.zTree.init($("#all_tree"), setting2, all_zNodes);

	var treeObj = $.fn.zTree.getZTreeObj("all_tree");
	var sNodes = treeObj.getNodes();
	treeObj.expandNode(sNodes[0], true, null, null, true);


});