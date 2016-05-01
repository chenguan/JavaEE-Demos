package com.tower.ssm.mapper;


import java.util.List;

import com.tower.ssm.po.ItemsCustom;
import com.tower.ssm.po.ItemsQueryVo;

public interface ItemsMapperCustom {
    //商品查询列表
	public List<ItemsCustom> findItemsList(ItemsQueryVo itemsQueryVo)throws Exception;
}