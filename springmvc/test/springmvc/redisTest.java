package springmvc;

import model.redisUserStoreTest;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;

import dao.userService;

public class redisTest {

	public static void main(String[] args) {
		ApplicationContext context = new ClassPathXmlApplicationContext("jedisConf.xml");
		
		JedisConnectionFactory jedisConnectionFactoryTest = 
				(JedisConnectionFactory) context.getBean("jedisConnectionFactory");
		
		userService newuser = (userService) context.getBean("userService");
		redisUserStoreTest user1 = new redisUserStoreTest("00", "u1");
		redisUserStoreTest user2 = new redisUserStoreTest("01", "u2");
		
		
	/*	newuser.put(user1);
		
		newuser.put(user2);*/
		
		System.out.println(newuser.get(user2).getName());

	}

}
