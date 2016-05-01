package com.huarong.p2p.api.mybatis.mapper;

import java.util.Map;

import com.huarong.p2p.api.mybatis.model.SendSms;

public interface SendSmsMapper {
    int deleteByPrimaryKey(Long id);

    int insert(SendSms record);

    int insertSelective(SendSms record);

    SendSms selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SendSms record);

    int updateByPrimaryKey(SendSms record);
    
    int insertSendSms(SendSms sendSms);
    
    int checkSendSmsCount(Map<String, String> sqlParam);
}