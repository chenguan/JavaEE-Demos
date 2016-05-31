package com.huarong.p2p.api.service;

/**
 * 短信渠道配置接口
 * @author he
 *
 * 2016年4月14日
 */
public interface SmsConfigService {
	/**
	 * 
	 * @param defaultMessage 发送信息
	 * @param template 模板
	 * @param isVoice 是否语音
	 * @return 发送结果
	 */
	public boolean sendSms(String defaultMessage,String template,boolean isVoice);
	
	/**
	 * 
	 * @param defaultMsgOrTemplate 发送信息或者模板
	 * @param isVoice 是否语音
	 * @return 发送结果
	 */
	public boolean sendSms(String defaultMsgOrTemplate,boolean isVoice);
	
	/**
	 * 检查模板
	 * @param template
	 * @return
	 */
	public boolean checkTemplate(String template);
	
}
