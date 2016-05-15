package com.yew1eb;

import com.github.springtestdbunit.annotation.DbUnitConfiguration;
import com.yew1eb.dao.UserDao;
import com.yew1eb.domain.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * @author zhouhai
 * @createTime 16/5/13
 * @description
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
@DbUnitConfiguration(databaseConnection = "h2DataSource")
public class UserTest {

    @Autowired
    UserDao userDao;

    @Test
    public void testInit() {
        System.out.println("Init Test....");
    }

    public void testInsert() {
        System.out.println("Test Insert user....");
        for(int i=0; i<10; ++i) {
            User user = new User(String.valueOf(i), "female");
            userDao.insert(user);
        }
    }


    public void testSelect() {
        System.out.println("Test Select user....");
        List<User> users = userDao.select();
        for (User user : users) {
            System.out.println(user);
        }
    }

}
