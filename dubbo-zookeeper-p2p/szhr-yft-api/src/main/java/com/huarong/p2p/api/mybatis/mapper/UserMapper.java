package com.huarong.p2p.api.mybatis.mapper;

import java.util.Map;

import com.huarong.p2p.api.mybatis.model.User;

public interface UserMapper {
	
	/**
	 * 用户登陆
	 * @author he
	 * @since 1.0.0
	 */
	void userLogin(Map<String, Object> sqlParam);
	/**
	 *通过用户名/手机/邮箱查询用户信息
	 * @author he
	 * @since 1.0.0
	 */
	User queryUserByUserName(String username);
	
	/**
	 * 如果用户登录时间过了3小时，重置用户登录错误次数
	 * @author he
	 * @since 1.0.0
	 */
	int resetUserState(User user);
	
	/**
	 * 更新用户错误登录次数
	 *
	 * @author he
	 * @since 1.0.0
	 */
	int updateUserState(User user);
	
    int deleteByPrimaryKey(Long id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKeyWithBLOBs(User record);

    int updateByPrimaryKey(User record);
}