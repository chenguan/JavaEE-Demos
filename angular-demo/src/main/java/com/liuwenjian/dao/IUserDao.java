package com.liuwenjian.dao;

import com.liuwenjian.model.User;

import java.util.List;

/**
 * Created by halapro on 2016/3/8.
 */
public interface IUserDao {

    void save(User user);

    boolean update(User user);

    boolean delete(int id);

    User findById(int id);

    List<User> findAll();
}
