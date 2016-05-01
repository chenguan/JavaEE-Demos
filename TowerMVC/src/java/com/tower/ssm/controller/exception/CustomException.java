package com.tower.ssm.controller.exception;

public class CustomException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7756595833304133489L;
	//异常信息
	public String message;
	public CustomException(String message) {
		super(message);
		this.message = message;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
