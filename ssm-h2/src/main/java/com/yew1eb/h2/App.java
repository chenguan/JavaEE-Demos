package com.yew1eb.h2;

import java.sql.SQLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Hello world!
 *
 */
public class App 
{
	private static final Logger logger = LogManager.getLogger(App.class.getName());
    
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        

        try {
        	org.h2.tools.Server.main();
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}
