package com.yew1eb.service;
import com.yew1eb.base.BaseDao;
import com.yew1eb.entity.CmsUserGroup;

public interface CmsUserGroupService extends BaseDao<CmsUserGroup,Integer>{
	//排序
	public void updatePriority(Integer id, Integer priority);
}
