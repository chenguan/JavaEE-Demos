package com.huarong.p2p.api.mybatis.mapper;

import com.huarong.p2p.api.mybatis.model.Admin;

public interface AdminMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Admin record);

    int insertSelective(Admin record);

    Admin selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(Admin record);

    int updateByPrimaryKeyWithBLOBs(Admin record);

    int updateByPrimaryKey(Admin record);
}