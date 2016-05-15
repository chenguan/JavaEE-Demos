package com.yew1eb;

import org.junit.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class H2ConnByJdbcTest {
    /* 嵌入式 : 数据库持久化存储为单个文件 AUTO_SERVER=TRUE：启动自动混合模式，允许开启多个连接，该参数不支持在内存中运行模式*/
    //private static final String JDBC_URL = "jdbc:h2:~/.h2/test;AUTO_SERVER=TRUE";

    /* 在内存中运行 : 如果不指定DBName，则以私有方式启动，只允许一个连接 */
    private static final String JDBC_URL = "jdbc:h2:mem:DBName;MODE=MySQL;DB_CLOSE_DELAY=-1";
    private static final String USER = "admin";
    private static final String PASSWORD = "123";
    private static final String DRIVER_CLASS = "org.h2.Driver";

    @Test
    public void testConn() throws Exception {
        Class.forName(DRIVER_CLASS);
        System.out.println(JDBC_URL);
        Connection conn = DriverManager.getConnection(JDBC_URL, USER, PASSWORD);
        Statement stmt = conn.createStatement();
        //如果存在USER_INFO表就先删除USER_INFO表
        stmt.execute("DROP TABLE IF EXISTS USER_INFO");
        //创建USER_INFO表
        stmt.execute("CREATE TABLE USER(id int(11) NOT NULL AUTO_INCREMENT  PRIMARY KEY, name VARCHAR(100), sex VARCHAR(4))");
        //新增
        stmt.executeUpdate("INSERT INTO USER VALUES(null,'a1','男')");
        stmt.executeUpdate("INSERT INTO USER VALUES(null,'b2','男')");
        stmt.executeUpdate("INSERT INTO USER VALUES(null,'c3','男')");
        stmt.executeUpdate("INSERT INTO USER VALUES(null,'d4','女')");
        stmt.executeUpdate("INSERT INTO USER VALUES(null,'e5','男')");
        stmt.executeUpdate("INSERT INTO USER VALUES(null,'f6','男')");
        //删除
        stmt.executeUpdate("DELETE FROM USER WHERE name='e5'");
        //修改
        stmt.executeUpdate("UPDATE USER SET name='e5' WHERE name='f6'");
        //查询
        ResultSet rs = stmt.executeQuery("SELECT * FROM USER");
        //遍历结果集
        while (rs.next()) {
            System.out.println(rs.getString("id") + "," + rs.getString("name") + "," + rs.getString("sex"));
        }
        //释放资源
        stmt.close();
        //关闭连接
        conn.close();
    }
}