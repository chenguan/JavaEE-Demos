package com.huarong.p2p.consumer.security;

/**
 * 令牌管理器
 *
 * @author he
 * @since 1.0.0
 */
public interface TokenManager {

    String createToken(String username);

    boolean checkToken(String token);
}
