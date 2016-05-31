package com.tianxiaxinyong.enterprise.common;

import java.sql.SQLException;

public class DataException extends SQLException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4743497057700356049L;
	public DataException(String string) {
		super(string);
	}
}
