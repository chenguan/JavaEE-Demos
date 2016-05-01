package com.sankuai.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Enumeration;

/**
 * Created by fan on 15/12/16.
 */

public class ParameterFilter implements Filter {
    private static final Logger LOGGER = LoggerFactory.getLogger(ParameterFilter.class);
    public void destroy() {
        System.out.println("destroy");
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        chain.doFilter(req, resp);
        HttpServletRequest hsr= (HttpServletRequest) req;
        Enumeration<String> reqParameterInfos = hsr.getParameterNames();
        while (reqParameterInfos.hasMoreElements())
        {
            String headName = (String) reqParameterInfos.nextElement();
            String headValue = hsr.getParameter(headName);
            LOGGER.info(headName+": "+headValue); // 打印日志信息
        }
    }

    public void init(FilterConfig config) throws ServletException {
        System.out.println("init");
    }

}