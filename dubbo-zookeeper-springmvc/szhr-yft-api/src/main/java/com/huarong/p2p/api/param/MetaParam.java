/**
 * Project Name:sample-api
 * File Name:MetaParam.java
 * Package Name:com.hr.app.api.param
 * Date:2016-4-5下午2:49:18
 * Copyright (c) 2016, hejiahua@sanhaodai.com All Rights Reserved.
 *
*/

package com.huarong.p2p.api.param;

import com.huarong.p2p.api.util.StringUtil;

/**
 * 元参数(与业务无关)
 * @author hjh
 * @date 2016-4-5 下午2:49:26
 */
public class MetaParam {
	
	public String os;//客户端平台 默认是PC接口

	public String getOs() {
		if (StringUtil.isEmpty(os)) {
			return MetaParam.MetaParam_OS.OS_PC;
		}
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}
	
	/**
	 * 客户端所使用的系统
	 * @author hjh
	 * @date 2016-4-5 下午2:55:12
	 * @since 1.0.0
	 */
	public interface MetaParam_OS{
		/**PC端*/
		public String OS_PC = "os_pc";
		
		/**IOS端*/
		public String OS_IOS = "os_ios";
		
		/**ANDROID端*/
		public String OS_AD = "os_ad";
		
		/**WAP端*/
		public String OS_WAP = "os_wap";
	}
}

