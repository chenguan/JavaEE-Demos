package com.huarong.p2p.api.mybatis.mapper;

import com.huarong.p2p.api.mybatis.model.SelectType;

public interface SelectTypeMapper {
    SelectType selectByPrimaryKey(Long id);
}