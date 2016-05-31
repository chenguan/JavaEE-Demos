/**
 * Project Name:sample-api
 * File Name:IConstants.java
 * Package Name:com.hr.app.api.constant
 * Date:2016-4-1下午3:05:34
 * Copyright (c) 2016, hejiahua@sanhaodai.com All Rights Reserved.
 *
 */

package com.huarong.p2p.api.constant;

import java.util.Properties;

import com.huarong.p2p.api.util.PropsUtil;

/**
 * 常量
 * 
 * @author hjh
 * @date 2016-4-1 下午3:05:42
 */
public class IConstants {
	private static final String CONFIG = "config.properties";

	/**
	 * 是否启用加密
	 */
	public static String ENABLED_PASS = "";
	/**
	 * 加密字符串
	 */
	public static String PASS_KEY = "";

	static {
		Properties config = PropsUtil.loadProps(CONFIG);
		ENABLED_PASS = config.getProperty("enabled_pass");
		PASS_KEY = config.getProperty("pass_key");
	}
}
