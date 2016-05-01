package com.huarong.p2p.api.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.huarong.p2p.api.sign.SignValidation;
import com.huarong.p2p.api.validation.validator.SignValidator;

/**
 * 验签注解
 *
 * @author he
 * @since 1.0.0
 */
@Documented
@Target({ElementType.METHOD, ElementType.PARAMETER,ElementType.FIELD,ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SignValidator.class)
public @interface Sign {

    String message() default "sign validation is fail";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
    
    Class<? extends SignValidation> value();
}
