package com.huarong.p2p.api.service;

import javax.validation.constraints.NotNull;

import com.huarong.p2p.api.mybatis.model.User;
import com.huarong.p2p.api.param.LoginParam;
import com.huarong.p2p.api.param.RegisterParam;

/**
 * 用户服务接口
 * @author he
 *
 * 2016年4月15日
 */
public interface UserService {
	
	/**
	 * 用户登录
	 * @param loginParam
	 * @param lastIP
	 * @return
	 * @throws Exception
	 */
	public User login(@NotNull LoginParam loginParam,String lastIP) throws Exception;
	
	/**
	 * 用户注册
	 * @return
	 */
	public User register(@NotNull RegisterParam registerParam);
	
}
