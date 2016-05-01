package org.szhr.yft.api.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.huarong.p2p.api.param.LoginParam;
import com.huarong.p2p.api.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class) 
@ContextConfiguration("classpath:spring.xml") 
@Transactional
public class UserServiceTest {
	
	@Autowired
	UserService userService;
	
	@Test
	public void testlogin() throws Exception{
		//登陆驱动测试
		LoginParam loginParam = new LoginParam();
		loginParam.setUsername("walden");
		loginParam.setPassword("123456");
		boolean result = userService.login(loginParam, "127.0.0.1").isLogin();
		Assert.isTrue(result);
	}
	
}
