package com.huarong.p2p.api.service;

import com.huarong.p2p.api.mybatis.model.SendSms;

/**
 * 短信发送服务接口
 * @author he
 *
 * 2016年4月15日
 */
public interface SendSmsService {
	/**
	 * 查询时间区域内某号码已发送短信数量
	 * @param startTime 开始时间
	 * @param endTime 结束时间
	 * @param mobile  手机号
	 * @return 数量
	 */
	public int checkSendSmsCount(String startTime,String endTime,String mobile);
	
	/**
	 * 插入发送的短信
	 * @param content 短信内容
	 * @param splitID 用户ID
	 * @param cellPhones 手机号码组
	 * @return
	 */
	public int insertSendSms(SendSms sendSms);
}
