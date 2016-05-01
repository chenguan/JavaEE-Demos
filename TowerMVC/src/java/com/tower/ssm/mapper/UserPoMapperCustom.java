package com.tower.ssm.mapper;

import java.util.List;

import com.tower.ssm.po.UserCustom;
import com.tower.ssm.po.UserVo;


public interface UserPoMapperCustom {
    //用户查询列表
	public List<UserCustom> findUsersList(UserVo userVo)throws Exception;
}
