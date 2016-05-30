package com.yew1eb.service;

import com.yew1eb.common.PageParam;
import com.yew1eb.dao.UserDao;
import com.yew1eb.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public void insert(User user) {
        userDao.insert(user);
    }

    public List<User> findByName(String name) {
        return userDao.getByName(name);
    }

    public int getRowCount() {
        return userDao.getRowCount();
    }

    public PageParam getUserByPage(PageParam pageParam) {
        int currPage = pageParam.getCurrPage();
        int offset = (currPage - 1) * PageParam.pageSize;
        int size = PageParam.pageSize;
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("offset", offset);
        params.put("size", size);
        List<User> users = userDao.selectByParams(params);
        pageParam.setData(users);
        return pageParam;
    }
}