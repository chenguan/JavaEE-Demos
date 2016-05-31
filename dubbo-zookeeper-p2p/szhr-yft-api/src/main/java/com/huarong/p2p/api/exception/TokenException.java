package com.huarong.p2p.api.exception;

/**
 * 令牌异常
 *
 * @author he
 * @since 1.0.0
 */
@SuppressWarnings("serial")
public class TokenException extends RuntimeException {

    public TokenException(String message) {
        super(message);
    }
}
