package com.huarong.p2p.api.service.impl;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.dubbo.config.annotation.Service;
import com.huarong.p2p.api.mybatis.model.Select;
import com.huarong.p2p.api.service.SysparService;

@Service(protocol="dubbo")
public class SysparServiceImpl   implements SysparService {

	@Override
	public Select selectBySelectKey(String fields, String selectKey) {/*
		Map<String, String> sqlParam = new HashMap<String, String>();
		sqlParam.put("fields", fields);
		sqlParam.put("selectKey", selectKey);
		return dataAccessor.selectOne("com.huarong.p2p.api.mybatis.model.Select.selectBySelectKey", sqlParam);
	*/
		return null;
	}

}
