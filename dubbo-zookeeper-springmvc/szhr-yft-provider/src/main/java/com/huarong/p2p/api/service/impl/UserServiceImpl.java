package com.huarong.p2p.api.service.impl;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.collections4.MapUtils;
import org.hibernate.validator.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.dubbo.config.annotation.Service;
import com.huarong.p2p.api.mybatis.mapper.BorrowAmountTypeMapper;
import com.huarong.p2p.api.mybatis.mapper.UserMapper;
import com.huarong.p2p.api.mybatis.model.User;
import com.huarong.p2p.api.param.LoginParam;
import com.huarong.p2p.api.param.RegisterParam;
import com.huarong.p2p.api.service.UserService;
import com.huarong.p2p.api.util.StringUtil;

/**
 * 用户服务
 * 
 * @author he
 * @since 1.0.0
 */
@Service(protocol = "dubbo", validation = "true")
public class UserServiceImpl implements UserService {
	private static Logger log = LoggerFactory.getLogger(UserService.class);

	@Autowired
	UserMapper userMapper;
	
	@Autowired
	BorrowAmountTypeMapper borrowAmountTypeMapper;
	
	/**
	 * 用户登录
	 * 
	 * @param username
	 *            用户名
	 * @param password
	 *            密码
	 * @param lastip
	 *            登陆IP
	 * @param lasttime
	 *            登录时间
	 * @return
	 * @throws ParseException
	 * @author he
	 * @since 1.0.0
	 */
	public User login(@NotBlank LoginParam loginParam, String lastip)
			throws ParseException {
		Map<String, Object> sqlParam = new HashMap<String, Object>();
		String username = loginParam.getUsername();
		String password = loginParam.getPassword();
		if (StringUtil.isEmpty(lastip)) {
			lastip = "127.0.0.1"; // default IP
		}

		// t_user和t_person两个表查询用户机号/邮箱
		User user = userMapper.queryUserByUserName(username);
		if (null == user) {// 用户不存在
			return null;
		} else {// 开始验证密码
			Date lasttime = new Date();
			Long userid = user.getId();// ID
			Date loginTime = user.getLastdate();// 最后登录时间
			if (new Date().getTime() - loginTime.getTime() > 3 * 60 * 60 * 1000) {
				// 取消用户限制登录将isLoginLimit设置为1和loginErrorCount设置为0
				user.setIsloginlimit(1);
				user.setLoginerrorcount(0);
				userMapper.resetUserState(user);
				log.debug("---------重置登录错误次数-----------");
			}

			int isLoginLimit = user.getIsloginlimit();
			int loginErrorCount = user.getLoginerrorcount();
			String umappassword = user.getPassword();

			// 登陆时间
			user.setLastdate(lasttime);

			// 验证密码
			if (!password.equals(umappassword)) {
				if (loginErrorCount == 2) {// 错误次数3次
					user.setLoginerrorcount(3);
					user.setIsloginlimit(1);
				} else if (loginErrorCount == 3) {// 错误次数4次
					user.setLoginerrorcount(4);
					user.setIsloginlimit(1);
				} else if (loginErrorCount == 4 || isLoginLimit == 2) {// 错误次数5次，帐号被冻结
					user.setLoginerrorcount(0);
					user.setIsloginlimit(2);
				} else if (loginErrorCount == 1) {// 错误次数2
					user.setLoginerrorcount(2);
					user.setIsloginlimit(1);
				} else {// 错误次数1
					user.setLoginerrorcount(1);
					user.setIsloginlimit(1);
				}
				userMapper.resetUserState(user);
				return user;
			} else {
				// 使用存储过程登录
				sqlParam.put("userName", username);
				sqlParam.put("passWord", password);
				sqlParam.put("lastIP", lastip);
				sqlParam.put("out_ret", "-1L");
				sqlParam.put("out_desc", "");
				userMapper.userLogin(sqlParam);
				userid = MapUtils.getLong(sqlParam, "out_ret", -1L);
				if (userid <= 0) {
					if (userid == -4) {
						user.setLoginerrorcount(user.getLoginerrorcount() + 1);
						user.setLastdate(lasttime);
						// 更新用户错误登录次数和登陆时间
						userMapper.updateUserState(user);
						return null;
					} else if (userid == -5) {
						user.setEnable(2);
						return user;
					} else {
						return null;
					}
				} else {// 登陆成功
					user.setLogin(true);
					user.setIsloginlimit(1);
					user.setLoginerrorcount(0);
					userMapper.resetUserState(user);
					log.debug("---------重置登录错误次数-----------");
				}
			}
		}

		return user;
	}

	/**
	 * 用户注册
	 * 
	 * @return 用户对象
	 * @author he
	 * @since 1.0.0 2016-4-5
	 */
	@Override
	public User register(RegisterParam registerParam) {
		log.info("className:" + this.getClass().getName() + ";methodName:"
				+ Thread.currentThread().getStackTrace()[1].getMethodName());

		String email = null;
		String dealpwd = null; // 交易密码
		String mobilePhone = registerParam.getMobile();
		Integer rating = 0;// 网站积分
		Integer creditrating = 0;// 信用积分
		String lastIP = "";
		String lastDate = null;// 最后登录时间
		Integer vipstatus = 1;// VIP会员状态 1是非vip 2是vip
		String vipcreatetime = null;// VIP创建时间
		double creditlimit = 0;// 信用额度 如果是vip 那么初始creditlimit = 3000；
		Integer authstep = 1;// 认证步骤(默认是1 个人详细信息 2 工作认证 3上传
		String headImg = "";// 用户头型
		Integer enable = 1; // 是否禁用 1、启用 2、禁用
		// 测试--跳过验证
		// 得到信息额度类型
		double creditLimit = borrowAmountTypeMapper.queryBorrowAmountByNid("credit");

		Long servicePersonId = null;
		long userId = -1L;
		long result = 1L;
		boolean flag = false;
		try {
			User user = createUser(email,registerParam.getUsername(), registerParam.getPassword(), registerParam.getReffere(),
					lastDate, lastIP, dealpwd, mobilePhone, rating,
					creditrating, vipstatus, vipcreatetime, authstep, headImg,
					enable, servicePersonId, creditLimit, "");
			userId = userMapper.insert(user);
					

			// 将手机号码同步到t_person表中
			if (userId < 0) {
				return -1L;
			}

			if (userType == 1) {
				personDao.addPerson(conn, null, cellphone, null, null, null,
						null, null, null, null, null, null, null, null, null,
						null, null, null, null, null, userId, null, null, -1,
						null,
						userMap == null || userMap.get("source") == null ? null
								: (String) userMap.get("source"));
			}

			if (result <= 0) {
				return -1L;
			}
			// 绑定手机
			myHomeInfoSettingDao.addBindingMobile(conn, cellphone, userId,
					IConstants.PHONE_BINDING_ON,// 修改为已绑定
					"手机注册绑定手机", IConstants.INSERT_BASE_TYPE, null);
			// 初始化验证资料
			for (long i = 1; i <= typeLen; i++) {
				try {
					result = userDao.addMaterialsauth1(conn, userId, i);
					if (result <= 0) {
						return -1L;
					}
				} catch (Exception e) {
					return -1L;
				}
			}
			if (userMap != null) {
				relationDao.addRelation(conn, userId,
						(Long) userMap.get("parentId"),
						(Integer) userMap.get("level"), 1);
			}

			conn.commit();
		} catch (Exception e) {
			log.error(e);
			e.printStackTrace();
			conn.rollback();

			throw e;
		} finally {
			conn.close();
		}

		return userId;
	}
	
	/*
	 * 封装一个用户
	 */
	private User createUser(String email, String username, String password,
			String reffere, String lastDate, String lastIP, String dealpwd,
			String mobilePhone, Integer rating, Integer creditrating,
			Integer vipstatus, String vipcreatetime, Integer authstep,
			String headImg, Integer enable, Long servicePersonId,
			double creditLimit, String string) {
		User user =  new User();
		user.setEmail(email);
		user.setUsername(username);
		user.setPassword(password);
		user.setRefferee(reffere);
		user.setLastdate(lastdate);
		return user;
	}

}
