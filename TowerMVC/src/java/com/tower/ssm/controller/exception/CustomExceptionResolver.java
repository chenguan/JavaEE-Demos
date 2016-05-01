package com.tower.ssm.controller.exception;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by 2015-10-28 on 2016/4/14.
 */
public class CustomExceptionResolver implements HandlerExceptionResolver {
    public ModelAndView resolveException(HttpServletRequest req,
                                         HttpServletResponse res, Object handler, Exception ex) {
        //handler就是处理器适配器要执行的handler对象(只有method)

        //解析异常类型
        //如果异常是自定义异常，直接取出异常类型，在错误页面显示
//		String message = null;
//		if (ex instanceof CustomException){
//			message = ((CustomException)ex).getMessage();
//		}else{//不是自定义异常
//			message = "未知错误";
//		}

        CustomException customException = null;
        if( ex instanceof CustomException){
            customException = (CustomException)ex;
        }else{
            customException  = new CustomException("未知错误");
        }
        String message = customException.getMessage();
        ModelAndView modelAndView = new ModelAndView();

        modelAndView.addObject("message", message);

        modelAndView.setViewName("error");

        return modelAndView;
    }
}
