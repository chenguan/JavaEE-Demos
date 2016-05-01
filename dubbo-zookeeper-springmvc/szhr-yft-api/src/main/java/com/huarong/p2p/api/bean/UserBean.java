package com.huarong.p2p.api.bean;

import com.huarong.p2p.api.sign.imp.DefaultSignValidation;
import com.huarong.p2p.api.validation.Sign;

/**
 * 用户对象
 * 
 * @author he
 * @since 1.0.0
 */
@Sign(value = DefaultSignValidation.class)
public class UserBean extends SignBean {
	private String token;
	private String username;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
