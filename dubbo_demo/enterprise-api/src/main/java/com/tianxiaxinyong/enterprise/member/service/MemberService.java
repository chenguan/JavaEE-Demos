package com.tianxiaxinyong.enterprise.member.service;

import com.tianxiaxinyong.enterprise.common.DataException;
import com.tianxiaxinyong.enterprise.common.ServiceException;
import com.tianxiaxinyong.enterprise.member.domain.Member;

public interface MemberService<T> {

	/**
	 * @category 根据Id查找用户
	 * @param request
	 * @return
	 * @throws ServiceException
	 */
	public Member findMemberById(String id) throws ServiceException,DataException;

	/**
	 * @category 根据用户名查找用户
	 * @param request
	 * @return
	 * @throws ServiceException
	 */
	public Member findMemberByMemberName(String userName) throws ServiceException,DataException;
	
	/**
	 * @category 插入用户至数据库
	 * @param member
	 * @return
	 * @throws ServiceException
	 * @throws DataException
	 */
	public int insertMember(Member member) throws ServiceException,DataException;
	
	/**
	 * @category 更新用户至数据库
	 * @param member
	 * @return
	 * @throws ServiceException
	 * @throws DataException
	 */
	public int updateMember(Member member) throws ServiceException,DataException;
	
	/**
	 * @category 删除用户
	 * @param id
	 * @return
	 * @throws ServiceException
	 * @throws DataException
	 */
	public int deleteMember(String id) throws ServiceException,DataException;
}
