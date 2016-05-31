package com.huarong.p2p.api.mybatis.model;

import java.util.Date;

/**
 * 用户反馈对象
 * @author yebin
 * @since 1.0.0
 */
public class Feedback {
	private Long userId;
	private String content;
	private Date publishTime;//反馈时间
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getPublishTime() {
		return publishTime;
	}
	public void setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
	}
	
}
