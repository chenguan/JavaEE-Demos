package com.java1234.common;

import java.util.List;

/**
 * @author zhouhai
 * @createTime 16/6/23
 * @description
 */
public interface Log4jConfiguratorMXBean {

    List<String> getLoggers();

    String getLogLevel(String logger);

    void setLogLevel(String logger, String level);
}

