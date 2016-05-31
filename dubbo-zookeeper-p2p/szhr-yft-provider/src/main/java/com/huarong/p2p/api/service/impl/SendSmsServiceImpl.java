package com.huarong.p2p.api.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.dubbo.config.annotation.Service;
import com.huarong.p2p.api.mybatis.mapper.SendSmsMapper;
import com.huarong.p2p.api.mybatis.model.SendSms;
import com.huarong.p2p.api.service.SendSmsService;

@Service(protocol="dubbo")
public class SendSmsServiceImpl  implements SendSmsService {
	
	@Autowired
	SendSmsMapper sendSmsMapper;
	
	@Override
	public int checkSendSmsCount(String startTime, String endTime, String mobile) {
		Map<String, String> sqlParam = new HashMap<String, String>();
		sqlParam.put("startTime", startTime);
		sqlParam.put("endTime", endTime);
		sqlParam.put("mobile", mobile);
		return sendSmsMapper.checkSendSmsCount(sqlParam);
	}

	@Override
	public int insertSendSms(SendSms sendSms) {
		return sendSmsMapper.insertSendSms(sendSms);
	}

}
