package com.yew1eb.service.impl;

import org.springframework.stereotype.Service;

import com.yew1eb.base.AbstractBaseDao;
import com.yew1eb.entity.CmsUserGroup;
import com.yew1eb.service.CmsUserGroupService;
@Service
public class CmsUserGroupServiceImpl extends AbstractBaseDao<CmsUserGroup,Integer> implements CmsUserGroupService{

	@Override
	public void updatePriority(Integer id, Integer priority) {
		CmsUserGroup cug = findById(id);
		cug.setPriority(priority);
		updateOrder(cug);
	}

}
