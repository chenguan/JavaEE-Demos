package com.tianxiaxinyong.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tianxiaxinyong.enterprise.common.DataException;
import com.tianxiaxinyong.enterprise.common.ServiceException;
import com.tianxiaxinyong.enterprise.member.domain.Role;
import com.tianxiaxinyong.enterprise.member.service.RoleService;
import com.tianxiaxinyong.mapper.RoleMapper;

@Service("roleService")
public class RoleServiceImpl implements RoleService {
	
	@Autowired
	private RoleMapper roleMapper;
	
	@Override
	public Role findRoleById(String id) throws ServiceException, DataException {
		Role role = roleMapper.selectByPrimaryKey(id);
		return role;
	}

	@Override
	public int insertRole(Role role) throws ServiceException, DataException {
		int result = roleMapper.insert(role);
		return result;
	}

	@Override
	public int updateRole(Role role) throws ServiceException, DataException {
		int result = roleMapper.updateByPrimaryKeySelective(role);
		return result;
	}

	@Override
	public int deleteRole(String id) throws ServiceException, DataException {
		int result = roleMapper.deleteByPrimaryKey(id);
		return result;
	}

}
