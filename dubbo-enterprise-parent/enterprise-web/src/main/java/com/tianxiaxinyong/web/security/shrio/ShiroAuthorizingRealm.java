/*
 *  Copyright 2014-2015 snakerflow.com
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *     http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */
package com.tianxiaxinyong.web.security.shrio;

import java.util.Calendar;
import java.util.Date;

import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.tianxiaxinyong.enterprise.common.DataException;
import com.tianxiaxinyong.enterprise.common.ServiceException;
import com.tianxiaxinyong.enterprise.member.domain.Member;
import com.tianxiaxinyong.enterprise.member.service.MemberService;
import com.tianxiaxinyong.web.constance.WebConstance;

/**
 * shiro的认证授权域
 * @author yuqs
 * @since 0.1
 */
public class ShiroAuthorizingRealm extends AuthorizingRealm {
	private static Logger log = LoggerFactory.getLogger(ShiroAuthorizingRealm.class);
	
	@Autowired
	private MemberService<Member> memberService;
	
	/**
	 * 构造函数，设置安全的初始化信息
	 */
	public ShiroAuthorizingRealm() {
//		super();
//		setAuthenticationTokenClass(UsernamePasswordToken.class);
//		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(WebConstance.HASH_ALGORITHM);
//		matcher.setHashIterations(WebConstance.HASH_INTERATIONS);
//		setCredentialsMatcher(matcher);
	}

	/**
	 * 获取当前认证实体的授权信息（授权包括：角色、权限）
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		//获取当前登录的用户名
		ShiroPrincipal subject = (ShiroPrincipal)super.getAvailablePrincipal(principals);
		String username = subject.getUsername();
		String userId = subject.getId();
		try {
			if(!subject.isAuthorized()) {
				//根据用户名称，获取该用户所有的权限列表
				/*List<String> authorities = Member.dao.getAuthoritiesName(userId);
				List<String> rolelist = Member.dao.getRolesName(userId);
				subject.setAuthorities(authorities);
				subject.setRoles(rolelist);*/
				subject.setAuthorized(true);
				log.info("用户【" + username + "】授权初始化成功......");
				log.info("用户【" + username + "】 角色列表为：" + subject.getRoles());
				log.info("用户【" + username + "】 权限列表为：" + subject.getAuthorities());
			}
		} catch(RuntimeException e) {
			throw new AuthorizationException("用户【" + username + "】授权失败");
		}
		//给当前用户设置权限
		info.addStringPermissions(subject.getAuthorities());
		info.addRoles(subject.getRoles());
		return info;
	}

	/**
	 * 根据认证方式（如表单）获取用户名称、密码
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		UsernamePasswordToken upToken = (UsernamePasswordToken) token;
		String username = upToken.getUsername();
		if (username == null) {
			log.warn("用户名不能为空");
			throw new AccountException("用户名不能为空");
		}
		Member member = null;
		try {
			member = memberService.findMemberByMemberName(username);
		} catch(Exception ex) {
			log.error("获取用户失败ex={}" , ex);
		}
		if (member == null) {
		    log.warn("用户不存在");
		    throw new UnknownAccountException("用户不存在!");
		}
		if(2==member.getUserStatus()) {
			log.warn("用户被禁止使用");
			throw new UnknownAccountException("用户被禁止使用!");
		}
		if(3==member.getUserStatus()){
			log.warn("用户被锁定！");
			throw new LockedAccountException("用户被用户被锁定!");
		}
		//锁定时间
		Date lockedDate = member.getLocktime();
		//当前时间
		Date nowDate = Calendar.getInstance().getTime();
		// 登录失败次数
		int loginFailureLockTime = WebConstance.LOCKTIMES;
		if(3==member.getUserStatus() && isUnLock(lockedDate, nowDate, loginFailureLockTime)){
			//进行解锁
			member.setUserStatus(1);
			member.setLoginFailtimes(0);
			try {
				memberService.updateMember(member);
			} catch (ServiceException e) {
				log.error("调用服务失败e={}",e);
			} catch (DataException e) {
				log.error("调用数据库失败e={}",e);
			}
		}
			
		
		log.info("用户【" + username + "】登录成功");
		ShiroPrincipal subject = new ShiroPrincipal(member);
		//List<String> authorities = Member.dao.getAuthoritiesName(user.getStr("id"));
		//List<String> rolelist = Member.dao.getRolesName(user.getStr("id"));
		//subject.setAuthorities(authorities);
		//subject.setRoles(rolelist);
		subject.setAuthorized(true);
		return new SimpleAuthenticationInfo(subject, member.getPassword(), getName());
	}
	
	/**
	 * @category 是否可以进行解锁
	 * @param lockedDate
	 * @param nowDate
	 * @param loginFailureLockTime
	 * @return
	 */
	private boolean isUnLock(Date lockedDate,Date nowDate,int loginFailureLockTime){
		//当锁定时间+解锁时间》当前时间可以进行解锁
		Calendar calendarLock = Calendar.getInstance();
		calendarLock.setTime(lockedDate);
		calendarLock.add(Calendar.DAY_OF_YEAR, loginFailureLockTime);
		Calendar calendarNow = Calendar.getInstance();
		calendarNow.setTime(nowDate);
		if(calendarLock.getTimeInMillis()>calendarNow.getTimeInMillis()){
			return false;
		}else{
			//可解锁
			return true;
		}
		
	}
}
