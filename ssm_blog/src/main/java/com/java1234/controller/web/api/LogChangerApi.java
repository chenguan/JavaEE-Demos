package com.java1234.controller.web.api;

import com.java1234.common.Log4jConfigurator;
import com.java1234.entity.Blog;
import com.java1234.util.ResponseUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.Log4jConfigListener;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @author zhouhai
 * @createTime 16/6/23
 * @description
 */

@RestController
@RequestMapping("/log")
public class LogChangerApi {

    private Log4jConfigurator log4jConfigurator = new Log4jConfigurator();


    @RequestMapping("")
    @ResponseBody
    public String index() {
        return "welcome to LogChanger.";
    }

    @RequestMapping(value = "/rebuild", method = RequestMethod.GET)
    @ResponseBody
    public String rebuild(HttpServletRequest request, HttpServletResponse response) throws Exception {

        List<String> loggers = log4jConfigurator.getLoggers();

        return loggers.toString();
    }
}
