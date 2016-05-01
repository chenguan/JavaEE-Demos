package com.tianxiaxinyong.basic;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class) 
@ContextConfiguration(locations={"classpath:META-INF/spring/applicationContext-dubbo.xml","classpath:META-INF/spring/applicationContext.xml"})
public class BaseTestJunit {

}
