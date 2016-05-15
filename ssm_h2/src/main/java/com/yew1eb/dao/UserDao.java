package com.yew1eb.dao;

import com.sankuai.meituan.waimai.datasource.multi.annotation.DataSource;
import com.yew1eb.domain.User;
import com.yew1eb.util.DS;
import org.apache.ibatis.annotations.Insert;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author zhouhai
 * @createTime 16/5/13
 * @description
 */

@Component
public interface UserDao {
    static final String KEYS = "id, name, sex";
    static final String TABLE = "user";

    @DataSource(DS.H2)
    @Insert(" insert into " + TABLE + " ( " + KEYS + " ) values (null, #{name}, #{sex} )")
    void insert(User user);

    @DataSource(DS.H2)
    @Insert("select * from " + TABLE)
    List<User> select();
}
