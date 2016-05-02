package com.yew1eb.service;

import org.springframework.stereotype.Service;

import com.yew1eb.base.BaseDao;
import com.yew1eb.common.Pager;
import com.yew1eb.entity.CmsReceiverMessage;
@Service
public interface CmsReMessageService extends BaseDao<CmsReceiverMessage, Integer>{
	public Pager<CmsReceiverMessage> findByBox(Integer msgBox,Integer msgReceiverUserId,int showPages,int pageSize);
}
