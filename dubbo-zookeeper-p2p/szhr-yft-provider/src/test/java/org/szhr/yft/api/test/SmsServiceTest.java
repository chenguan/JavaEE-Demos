package org.szhr.yft.api.test;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.huarong.p2p.api.service.SmsConfigService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring.xml")
@Transactional
public class SmsServiceTest {
	@Autowired
	SmsConfigService smsConfigService;
	
	public void testSendSms(){
		//smsConfigService.sendSms(defaultMessage, template, isVoice);
	}
}
