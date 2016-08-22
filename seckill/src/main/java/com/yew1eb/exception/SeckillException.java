package com.yew1eb.exception;

/**
 * @author zhouhai
 * @createTime 16/8/21
 * @description
 */
public class SeckillException extends RuntimeException {

    public SeckillException(String message) {
        super(message);
    }

    public SeckillException(String message, Throwable cause) {
        super(message, cause);
    }
}