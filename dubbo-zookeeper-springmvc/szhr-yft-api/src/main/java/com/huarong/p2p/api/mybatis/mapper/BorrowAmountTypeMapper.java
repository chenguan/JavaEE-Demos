package com.huarong.p2p.api.mybatis.mapper;

import com.huarong.p2p.api.mybatis.model.BorrowAmountType;

public interface BorrowAmountTypeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(BorrowAmountType record);

    int insertSelective(BorrowAmountType record);

    BorrowAmountType selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(BorrowAmountType record);

    int updateByPrimaryKey(BorrowAmountType record);
    
    /**
     * 根据  标识列查询额度信息
     * @param nid
     * @return
     */
    double queryBorrowAmountByNid(String nid);
}