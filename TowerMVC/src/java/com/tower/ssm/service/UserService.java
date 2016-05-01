package com.tower.ssm.service;

import java.util.List;

import com.tower.ssm.po.UserCustom;
import com.tower.ssm.po.UserVo;

public interface UserService {
    //商品查询列表
	public List<UserCustom> findUsersList(UserVo userVo)throws Exception;
}
