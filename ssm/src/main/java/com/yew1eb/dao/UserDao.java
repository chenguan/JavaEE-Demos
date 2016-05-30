package com.yew1eb.dao;

import com.yew1eb.domain.User;

import java.util.List;
import java.util.Map;


public interface UserDao {
    public List<User> getByName(String name);
    public void insert(User user);
    public int getRowCount();
    public List<User> selectByParams(Map<String,Object> params);
}