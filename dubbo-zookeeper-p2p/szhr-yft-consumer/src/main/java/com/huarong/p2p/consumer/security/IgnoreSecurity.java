package com.huarong.p2p.consumer.security;

import java.lang.annotation.*;

/**
 * 忽略安全性检查
 *
 * @author he
 * @since 1.0.0
 */
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface IgnoreSecurity {
}
