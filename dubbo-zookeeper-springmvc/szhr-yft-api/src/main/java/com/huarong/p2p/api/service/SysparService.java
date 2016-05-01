package com.huarong.p2p.api.service;

import com.huarong.p2p.api.mybatis.model.Select;

/**
 * 系统参数服务接口
 * @author he
 *
 * 2016年4月15日
 */
public interface SysparService {
	/**
	 * 通过selectKey查询select
	 * @param fields 查询结果集
	 * @param selectKey 查询条件
	 * @return
	 */
	public Select selectBySelectKey(String fields,String selectKey);
}
