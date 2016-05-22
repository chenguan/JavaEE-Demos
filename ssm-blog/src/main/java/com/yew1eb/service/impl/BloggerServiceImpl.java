package com.yew1eb.service.impl;

import javax.annotation.Resource;

import com.yew1eb.dao.BloggerDao;
import com.yew1eb.service.BloggerService;
import org.springframework.stereotype.Service;

import com.yew1eb.domain.Blogger;

/**
 * ����Serviceʵ����
 * @author Administrator
 *
 */
@Service("bloggerService")
public class BloggerServiceImpl implements BloggerService {

	@Resource
	private BloggerDao bloggerDao;

	public Blogger find() {
		return bloggerDao.find();
	}

	public Blogger getByUserName(String userName) {
		return bloggerDao.getByUserName(userName);
	}

	public Integer update(Blogger blogger) {
		return bloggerDao.update(blogger);
	}
	
	
}
