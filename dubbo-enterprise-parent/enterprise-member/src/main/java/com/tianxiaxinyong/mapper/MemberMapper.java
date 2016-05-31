package com.tianxiaxinyong.mapper;

import com.tianxiaxinyong.enterprise.common.DataException;
import com.tianxiaxinyong.enterprise.member.domain.Member;

public interface MemberMapper {


	/**
	 * @category 主键删除
	 * @param id
	 * @return
	 */
    public int deleteByPrimaryKey(String id) throws DataException;

    /**
     * @category 插入member
     * @param record
     * @return
     */
    public int insert(Member record) throws DataException;

    /**
     * @category 主键查询Member
     * @param id
     * @return
     */
    public Member selectByPrimaryKey(String id) throws DataException;

    /**
     * @category 根据主键更新member
     * @param record
     * @return
     */
    public int updateByPrimaryKeySelective(Member member) throws DataException;
    
    /**
     * @category 用户名查询会员
     * @param username
     * @return
     */
    public Member findMemberByMemberName(String username) throws DataException;
}