package com.tower.ssm.service.impl;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.tower.ssm.controller.exception.CustomException;
import com.tower.ssm.mapper.ItemsMapper;
import com.tower.ssm.mapper.ItemsMapperCustom;
import com.tower.ssm.po.Items;
import com.tower.ssm.po.ItemsCustom;
import com.tower.ssm.po.ItemsQueryVo;
import com.tower.ssm.service.ItemsService;


/**
 * 
 * <p>Title: ItemsServiceImpl</p>
 * <p>Description: 商品管理</p>
 * <p>Company: www.itcast.com</p> 
 * @author	传智.燕青
 * @date	2015-4-13下午3:49:54
 * @version 1.0
 */
public class ItemsServiceImpl implements ItemsService{
	
	@Autowired
	private ItemsMapperCustom itemsMapperCustom;

	@Autowired
	private ItemsMapper itemsMapper;


	public List<ItemsCustom> findItemsList(ItemsQueryVo itemsQueryVo)
			throws Exception {
		//通过ItemsMapperCustom查询数据库
		return itemsMapperCustom.findItemsList(itemsQueryVo);
	}


	public ItemsCustom findItemsById(Integer id) throws Exception {

		Items items = itemsMapper.selectByPrimaryKey(id);
		//中间对商品信息进行业务处理
		//....
		//返回ItemsCustom
		ItemsCustom itemsCustom = null;
		//将items的属性值拷贝到itemsCustom
		if(items!=null){
			itemsCustom = new ItemsCustom();
			BeanUtils.copyProperties(items, itemsCustom);
		}else{
			throw new CustomException("修改商品信息不存在");
		}
		return itemsCustom;

	}


	public void updateItems(Integer id, ItemsCustom itemsCustom) throws Exception {
		//添加业务校验，通常在service接口对关键参数进行校验
		//校验 id是否为空，如果为空抛出异常

		//更新商品信息使用updateByPrimaryKeyWithBLOBs根据id更新items表中所有字段，包括 大文本类型字段
		//updateByPrimaryKeyWithBLOBs要求必须转入id
		itemsCustom.setId(id);
		itemsMapper.updateByPrimaryKeyWithBLOBs(itemsCustom);
	}

	public void addItems(ItemsCustom itemsCustom)throws  Exception{

		itemsMapper.insert(itemsCustom);

	}


	public void deleteItems(Integer []id) throws Exception {
		for(Integer i:id){
			itemsMapper.deleteByPrimaryKey(i);
		}

	}

}
