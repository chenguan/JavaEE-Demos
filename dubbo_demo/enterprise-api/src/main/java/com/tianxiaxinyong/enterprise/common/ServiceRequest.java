package com.tianxiaxinyong.enterprise.common;

import java.io.Serializable;

public class ServiceRequest<T> implements Serializable {

	private static final long serialVersionUID = 3978433951594302524L;

	private T data;

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

}
