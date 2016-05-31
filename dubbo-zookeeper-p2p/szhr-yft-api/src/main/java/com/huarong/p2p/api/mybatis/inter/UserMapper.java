package com.huarong.p2p.api.mybatis.inter;

import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.huarong.p2p.api.mybatis.model.User;

public interface UserMapper {
	
	/**
	 *通过用户名/手机/邮箱查询用户信息
	 * @author he
	 * @since 1.0.0
	 */
	@Select("SELECT tu.* FROM t_user tu,t_person tp WHERE tu.`id` = tp.`userId` AND (tu.`username`=#{username} OR tu.`mobilePhone` = #{username} OR tp.`cellPhone` = #{username})")
	User queryUserByUserName(String username);
	
	/**
	 * 如果用户登录时间过了3小时，重置用户登录错误次数
	 * @author he
	 * @since 1.0.0
	 */
	@Update("UPDATE t_user SET loginErrorCount = #{loginerrorcount},isLoginLimit=#{isloginlimit},lastDate=#{lastdate} where id = #{id}")
	int resetUserState(User user);
	
	/**
	 * 更新用户错误登录次数
	 *
	 * @author he
	 * @since 1.0.0
	 */
	@Update("UPDATE t_user SET loginErrorCount = #{loginerrorcount},lastDate=#{lastdate} where id = #{id}")
	int updateUserState(User user);
}