package com.kangyonggan.service;

import com.kangyonggan.model.User;

/**
 * @author kangyonggan
 * @since 16/4/29
 */
public interface UserService {

    /**
     * 根据ID查找用户
     *
     * @param id
     * @return
     */
    User getUser(long id);
}
