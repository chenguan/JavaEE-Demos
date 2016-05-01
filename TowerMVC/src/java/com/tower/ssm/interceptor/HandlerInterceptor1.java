package com.tower.ssm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class HandlerInterceptor1 implements HandlerInterceptor{

	//进入handler之前执行
	//身份认证，身份授权
	//应用场景：比如身份认证，如果认真不通过，没有登录，需要此方法拦截，不再向下执行

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {

		System.out.println("HandlerInterceptor1...preHandle");
		//return false表示拦截，不向下执行
		//return true表示放行
		return true;
	}


	//进入handler方法之后，返回modelAndView之前执行
	//应用场景：从modelAndView出发，将公用模型数据在这里传到视图，也可以统一指定视图

	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler, ModelAndView modelAndView) throws Exception {
		System.out.println("HandlerInterceptor1...postHandle");

	}
	//执行handler完成执行此方法
	//应用场景：统一异常处理，统一日志处理

	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		System.out.println("HandlerInterceptor1...afterCompletion");

	}
	
}
