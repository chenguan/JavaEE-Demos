package com.tower.ssm.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.tower.ssm.mapper.UserMapper;
import com.tower.ssm.mapper.UserPoMapperCustom;
import com.tower.ssm.po.UserCustom;
import com.tower.ssm.po.UserVo;
import com.tower.ssm.service.UserService;

public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private UserPoMapperCustom userMapperCustom;



	public List<UserCustom> findUsersList(UserVo userVo) throws Exception {
		return userMapperCustom.findUsersList(userVo);
	}

	

}
