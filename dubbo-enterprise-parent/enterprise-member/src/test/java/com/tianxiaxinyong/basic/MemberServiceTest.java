package com.tianxiaxinyong.basic;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.tianxiaxinyong.enterprise.common.DataException;
import com.tianxiaxinyong.enterprise.common.ServiceException;
import com.tianxiaxinyong.enterprise.member.domain.Member;
import com.tianxiaxinyong.enterprise.member.service.MemberService;

public class MemberServiceTest {
//	@Autowired
//	private MemberService<Member> memberService;
	
	@Test
	public  void test() throws ServiceException  {
		ApplicationContext factory = new ClassPathXmlApplicationContext("META-INF/spring/applicationContext.xml");

		MemberService memberService = (MemberService) factory.getBean("memberService");
		Member member = null;
		try {
			member = memberService.findMemberByMemberName("admin");
			System.out.println(member.getUsername());
		} catch (DataException e) {
			e.printStackTrace();
		}
		System.out.println(member.toString());
		System.out.println("初始化完成!");
	}
}
