package com.huarong.p2p.consumer.security.impl;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.huarong.p2p.api.util.CodecUtil;
import com.huarong.p2p.api.util.StringUtil;
import com.huarong.p2p.consumer.security.TokenManager;

/**
 * 默认令牌管理器
 *
 * @author he
 * @since 1.0.0
 */
public class DefaultTokenManager implements TokenManager {

    private static Map<String, String> tokenMap = new ConcurrentHashMap<>();

    @Override
    public String createToken(String username) {
        String token = CodecUtil.createUUID();
        tokenMap.put(token, username);
        return token;
    }

    @Override
    public boolean checkToken(String token) {
        return !StringUtil.isEmpty(token) && tokenMap.containsKey(token);
    }
}
