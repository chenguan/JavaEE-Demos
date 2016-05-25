package com.kangyonggan.service.impl;

import com.kangyonggan.model.User;
import com.kangyonggan.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author kangyonggan
 * @since 16/4/29
 */
@Service
@Transactional
public class UserServiceImpl extends BaseService<User> implements UserService {

    public User getUser(long id) {
        return super.selectByPrimaryKey(id);
    }
}
