package com.huarong.p2p.api.mybatis.mapper;

import com.huarong.p2p.api.mybatis.model.Person;

public interface PersonMapper {
    Person selectByPrimaryKey(Long id);
}