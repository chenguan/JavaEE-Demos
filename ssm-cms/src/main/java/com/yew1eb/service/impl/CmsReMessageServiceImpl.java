package com.yew1eb.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.yew1eb.base.AbstractBaseDao;
import com.yew1eb.common.Pager;
import com.yew1eb.entity.CmsReceiverMessage;
import com.yew1eb.service.CmsReMessageService;
@Service
public class CmsReMessageServiceImpl extends AbstractBaseDao<CmsReceiverMessage, Integer> implements CmsReMessageService {

	@Override
	public Pager<CmsReceiverMessage> findByBox(Integer msgBox, Integer msgReceiverUserId,
			int showPages, int pageSize) {
		String operate = ".findByPage";
		Map<String, Object> maps = new HashMap<String, Object>();
		maps.put("showPages", showPages);
		maps.put("pageSize", pageSize);
		maps.put("msgBox",msgBox);
		maps.put("msgReceiverUserId", msgReceiverUserId);
		return findByKey(maps, operate);
	}

}
