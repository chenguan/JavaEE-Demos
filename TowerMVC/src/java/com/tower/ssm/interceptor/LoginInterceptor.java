package com.tower.ssm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class LoginInterceptor implements HandlerInterceptor{

	public boolean preHandle(HttpServletRequest req, HttpServletResponse res,
			Object handler) throws Exception {

		String url = req.getRequestURI();
		//判断是否是公开地址
		if(url.indexOf("login.action")>=0){
			return true;
		}

		HttpSession session = req.getSession();
		String username = (String) session.getAttribute("username");
		if(username==null){
			return true;
		}
		req.getRequestDispatcher("/WEB-INF/pages/index.jsp").forward(req, res);
		return false;
	}


	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}


	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {

	}



}
