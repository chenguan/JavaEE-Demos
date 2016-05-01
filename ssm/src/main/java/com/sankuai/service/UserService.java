package com.sankuai.service;

import com.sankuai.bean.User;
import com.sankuai.common.PageParam;
import com.sankuai.mapper.UserMapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by fan on 15/12/22.
 */
@Service
public class UserService {
    @Resource
    private UserMapper userMapper;

    public void insert(User user){
        userMapper.insert(user);
    }

    public List<User> findByName(String name){
        return userMapper.getByName(name);
    }

    public int getRowCount(){
        return userMapper.getRowCount();
    }

    public PageParam getUserByPage(PageParam pageParam){
        int currPage=pageParam.getCurrPage();
        int offset=(currPage-1)*PageParam.pageSize;
        int size=PageParam.pageSize;
        Map<String,Object> params=new HashMap<String,Object>();
        params.put("offset",offset);
        params.put("size",size);
        List<User> users=userMapper.selectByParams(params);
        pageParam.setData(users);
        return pageParam;
    }
}