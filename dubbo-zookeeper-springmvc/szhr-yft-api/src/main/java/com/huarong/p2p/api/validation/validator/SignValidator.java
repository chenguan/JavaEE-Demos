package com.huarong.p2p.api.validation.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huarong.p2p.api.bean.SignBean;
import com.huarong.p2p.api.sign.SignValidation;
import com.huarong.p2p.api.sign.imp.DefaultSignValidation;
import com.huarong.p2p.api.validation.Sign;

/**
 * 签名验证器
 *
 * @author he
 * @since 1.0.0
 */
public class SignValidator implements ConstraintValidator<Sign, SignBean> {
	
	private static Logger logger = LoggerFactory.getLogger(SignValidator.class);
	
    private SignValidation signValidation;

    @Override
    public void initialize(Sign constraintAnnotation) {
    	try {
    		signValidation =  constraintAnnotation.value().newInstance();
		} catch (InstantiationException e) {
			logger.error(e.getMessage()+":实例化签名管理器失败。");
		} catch (IllegalAccessException e) {
			logger.error(e.getMessage()+":实例化签名管理器失败。");
		}finally{
			if (signValidation == null) {
				signValidation = new DefaultSignValidation();
			}
		}
    }

	@Override
	public boolean isValid(SignBean value, ConstraintValidatorContext context) {
		return signValidation.validation(value);
	}
}
