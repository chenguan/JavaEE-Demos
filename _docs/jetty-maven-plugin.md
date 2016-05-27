### jetty插件配置

```
<plugin>
<groupId>org.mortbay.jetty</groupId>
<artifactId>jetty-maven-plugin</artifactId>
<version>8.1.16.v20140903</version>
<configuration>
    <webApp>
        <contextPath>/</contextPath>
        <!-- 本地装载contextXml，来解决未配置事务或数据库造成启动时等待时间过长 -->
        <webInfIncludeJarPattern>.*/.*jsp-api-[^/]\.jar$|./.*jsp-[^/]\.jar$|./.*taglibs[^/]*\.jar$</webInfIncludeJarPattern>
    </webApp>
    <connectors>
        <connector implementation="org.eclipse.jetty.server.nio.SelectChannelConnector">
            <port>8080</port>
        </connector>
    </connectors>
    <stopPort>9090</stopPort>
    <stopKey>stop</stopKey>
    <scanIntervalSeconds>10</scanIntervalSeconds>
</configuration>
</plugin>
```