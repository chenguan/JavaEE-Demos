package com.sankuai.mapper;

import com.sankuai.bean.User;

import java.util.List;
import java.util.Map;

/**
 * Created by fan on 15/12/22.
 */
public interface UserMapper {
    public List<User> getByName(String name);
    public void insert(User user);
    public int getRowCount();
    public List<User> selectByParams(Map<String,Object> params);
}