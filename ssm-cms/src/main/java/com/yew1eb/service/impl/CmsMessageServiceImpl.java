package com.yew1eb.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.yew1eb.base.AbstractBaseDao;
import com.yew1eb.common.Pager;
import com.yew1eb.entity.CmsMessage;
import com.yew1eb.service.CmsMessageService;
@Service
public class CmsMessageServiceImpl extends AbstractBaseDao<CmsMessage, Integer> implements CmsMessageService{
	@Override
	public Pager<CmsMessage> findByBox(Integer msgBox, Integer msgSendUserId,
			int showPages, int pageSize) {
		String operate = ".findByPage";
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("showPages", showPages);
		maps.put("pageSize", pageSize);
		maps.put("msgBox",msgBox);
		maps.put("msgSendUserId", msgSendUserId);
		return findByKey(maps, operate);
	}

}
