package com.liuwenjian.controller;

/**
 * Created by halapro on 2016/3/7.
 */

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloController {

    @RequestMapping("/hello")
    public ModelAndView hello(){
        ModelAndView mv =new ModelAndView();
        mv.addObject("spring", "spring mvc");
        mv.setViewName("hello");
        return mv;
    }
}
