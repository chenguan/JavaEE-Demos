package com.huarong.p2p.api.mybatis.mapper;

import com.huarong.p2p.api.mybatis.model.SmsConfig;

public interface SmsConfigMapper {
    SmsConfig selectByPrimaryKey(Integer id);
    
    /**
     * 查询当前sms配置
     * @param condition
     * @return
     */
    SmsConfig selectByCondition(String condition);
}