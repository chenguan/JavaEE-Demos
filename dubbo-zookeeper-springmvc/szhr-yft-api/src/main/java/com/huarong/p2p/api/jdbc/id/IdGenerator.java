package com.huarong.p2p.api.jdbc.id;

import java.util.List;

/**
 * ID 生成器接口
 *
 * @author he
 * @since 1.0.0
 */
public interface IdGenerator {

    String generateId();

    List<String> generateIdList(int count);
}
