package com.yew1eb.service;

import org.springframework.stereotype.Service;

import com.yew1eb.base.BaseDao;
import com.yew1eb.common.Pager;
import com.yew1eb.entity.CmsMessage;
@Service
public interface CmsMessageService extends BaseDao<CmsMessage, Integer>{
	public Pager<CmsMessage> findByBox(Integer msgBox,Integer msgSendUserId,int showPages,int pageSize);
}
