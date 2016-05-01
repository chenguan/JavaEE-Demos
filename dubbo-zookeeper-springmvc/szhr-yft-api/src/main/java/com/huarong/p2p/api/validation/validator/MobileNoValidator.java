/**
 * Project Name:api-framework
 * File Name:MobileNoValidator.java
 * Package Name:com.hr.api.validation.validator
 * Date:2016-4-6下午1:25:48
 * Copyright (c) 2016, hejiahua@sanhaodai.com All Rights Reserved.
 *
*/

package com.huarong.p2p.api.validation.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.huarong.p2p.api.validation.MobileNo;

/**
 * 手机号码注解验证器
 * TODO
 * @author hjh
 * @date 2016-4-6 下午1:37:44
 */
public class MobileNoValidator implements ConstraintValidator<MobileNo, CharSequence>{
	/**手机号码验证正则*/
	//private static String PATTERN_MOBILE_NO = "^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$";
	
	@Override
	public void initialize(MobileNo constraintAnnotation) {
		
	}

	@Override
	public boolean isValid(CharSequence value,
			ConstraintValidatorContext context) {
		//因为已经默认使用pattern注解，所以不在这里做验证，如果有新的严重规则重新更改
		return true;
	}

}

