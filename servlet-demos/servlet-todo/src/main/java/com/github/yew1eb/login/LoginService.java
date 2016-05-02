package com.github.yew1eb.login;

public class LoginService {

	public boolean isUserValid(String user, String password) {
		if (user.equals("root") && password.equals("root"))
			return true;

		return false;
	}

}
