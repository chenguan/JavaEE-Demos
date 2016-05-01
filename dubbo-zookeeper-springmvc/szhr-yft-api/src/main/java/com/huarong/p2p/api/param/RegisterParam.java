/**
 * Project Name:sample-api
 * File Name:RegisterBean.java
 * Package Name:com.hr.app.api.bean
 * Date:2016-4-5下午2:34:50
 * Copyright (c) 2016, hejiahua@sanhaodai.com All Rights Reserved.
 *
*/

package com.huarong.p2p.api.param;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * 用户注册参数
 * @author hjh
 * @date 2016-4-5 下午2:35:13
 * @since 1.0.0
 */
public class RegisterParam extends MetaParam{
	
	@NotEmpty(message = "请填写用户名")
	public String username;  //用户名
	
	@NotEmpty(message="请填写登陆密码")
	public String password;  //登陆密码
	
	@NotEmpty(message = "请填写手机号")
	public String mobile; //手机号
	
	public String reffere;//推荐人
	
	
	
	public String getReffere() {
		return reffere;
	}

	public void setReffere(String reffere) {
		this.reffere = reffere;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
}

