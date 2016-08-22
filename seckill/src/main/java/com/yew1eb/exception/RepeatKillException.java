package com.yew1eb.exception;

/**
 * @author zhouhai
 * @createTime 16/8/21
 * @description 重复秒杀异常
 */
public class RepeatKillException extends SeckillException {

    public RepeatKillException(String message) {
        super(message);
    }

    public RepeatKillException(String message, Throwable cause) {
        super(message, cause);
    }
}