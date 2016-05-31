package com.tianxiaxinyong.web.controller;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import com.tianxiaxinyong.enterprise.member.domain.Member;
import com.tianxiaxinyong.web.constance.WebConstance;
import com.tianxiaxinyong.web.security.shrio.ShiroUtils;

/**
 * @category 基础控制器
 * @author yiz
 *
 */

public abstract class BaseController {
	
	//得到session
	public Member getMemberFromSession(){
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		Member user = (Member) session.getAttribute(WebConstance.USERSESSIONKEY);
		return user;
	}
	
	//设置session
	public Member setSession(Member member){
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		session.setAttribute(WebConstance.USERSESSIONKEY, member);
		return member;
	}
	
	/**
	 * 获取当前登录管理员,若未登录则返回null.
	 * 
	 * @return 当前登录管理员ID
	 */
	public String getLoginAdminId(){
		String userId = ShiroUtils.getUserId();
		if(StringUtils.isBlank(userId)) {
			return null;
		} else {
			return userId;
		}
	}
	
}
