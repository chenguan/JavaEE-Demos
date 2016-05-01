package com.huarong.p2p.api.jdbc;

/**
 * 服务运行异常
 *
 * @author he
 * @since 1.0.0
 */
@SuppressWarnings("serial")
public class ServiceException extends RuntimeException {

    public ServiceException(String message) {
        super(message);
    }
}
