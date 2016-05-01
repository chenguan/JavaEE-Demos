package com.huarong.p2p.api.param;
import org.hibernate.validator.constraints.NotEmpty;

import com.huarong.p2p.api.constant.IConstants;

/**
 * 登录参数对象
 *
 * @author he
 * @since 1.0.0
 */
public class LoginParam {

    @NotEmpty(message="{loginparam.username.notnull}")
    private String username;

    @NotEmpty(message="{loginparam.password.notnull}")
    private String password;
    

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
    	//获取加密后的密码
        if ("1".equals(IConstants.ENABLED_PASS)) {
			password = com.shove.security.Encrypt.MD5(password.trim());
		} else {
			password = com.shove.security.Encrypt.MD5(password.trim()
					+ IConstants.PASS_KEY);
		}
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
