package com.tianxiaxinyong.web.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.tianxiaxinyong.enterprise.common.DataException;
import com.tianxiaxinyong.enterprise.common.ServiceException;
import com.tianxiaxinyong.enterprise.member.domain.Member;
import com.tianxiaxinyong.enterprise.member.service.MemberService;
import com.tianxiaxinyong.web.constance.MD5Util;

@RestController
public class CommonController extends BaseController{
	
	private static final Logger LOG = LoggerFactory.getLogger(CommonController.class);
	@Autowired
	private MemberService<Member> memberService;
	/**
	 * @category 首页
	 * @return
	 */
	@RequestMapping("index")
	public ModelAndView index() {
		return new ModelAndView("index");
	}

	/**
	 * @category 重定向至错误
	 * @param message
	 * @return
	 */
	@RequestMapping("error")
	public ModelAndView renderErrorMessage(String message) {
		ModelAndView mav = new ModelAndView("error");
		mav.addObject("errorMessages", message);
		return mav;
	}

	@RequestMapping("login")
	public ModelAndView login() {
		return new ModelAndView("login");
	}

	@RequestMapping("doLogin")
	public String doLogin(String username, String password) {
		username = "admin";
		password = "123456";
		password = MD5Util.md5(password);
		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		// 开始验证
		Subject subject = SecurityUtils.getSubject();
		try {
			subject.login(token);
		} catch (AuthenticationException e) {
			token.clear();
		}
		if (subject != null && subject.isAuthenticated()) {
			try {
				Member member = memberService.findMemberByMemberName(username);
				setSession(member);
			} catch (ServiceException e) {
				LOG.error("会员服务失败e={}",e);
			} catch (DataException e) {
				LOG.error("数据库失败e={}",e);
			}
		}
		Member me = getMemberFromSession();
		return null;
	}
}
