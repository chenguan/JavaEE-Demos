package com.huarong.p2p.api.mybatis.mapper;

import com.huarong.p2p.api.mybatis.model.Select;

public interface SelectMapper {
    Select selectByPrimaryKey(Long id);
}