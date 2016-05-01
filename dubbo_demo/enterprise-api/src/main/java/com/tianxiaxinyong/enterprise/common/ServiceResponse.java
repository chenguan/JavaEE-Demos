package com.tianxiaxinyong.enterprise.common;

import java.io.Serializable;

public class ServiceResponse<T> implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8109726310462521027L;
	private T data;

	private String code;

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
