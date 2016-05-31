package com.tianxiaxinyong.enterprise.member.service;

import com.tianxiaxinyong.enterprise.common.DataException;
import com.tianxiaxinyong.enterprise.common.ServiceException;
import com.tianxiaxinyong.enterprise.member.domain.Role;

public interface RoleService {
	/**
	 * @category 根据Id角色
	 * @param request
	 * @return
	 * @throws ServiceException
	 */
	public Role findRoleById(String id) throws ServiceException,DataException;
	
	/**
	 * @category 插入角色
	 * @param role
	 * @return
	 * @throws ServiceException
	 * @throws DataException
	 */
	public int insertRole(Role role) throws ServiceException,DataException;
	
	/**
	 * @category 更新角色
	 * @param role
	 * @return
	 * @throws ServiceException
	 * @throws DataException
	 */
	public int updateRole(Role role) throws ServiceException,DataException;
	
	/**
	 * @category 删除角色
	 * @param id
	 * @return
	 * @throws ServiceException
	 * @throws DataException
	 */
	public int deleteRole(String id) throws ServiceException,DataException;

}
