package com.liuwenjian.controller;

import com.google.gson.Gson;
import com.liuwenjian.common.JsonContentTypeView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by baozun on 2016/3/8.
 */
@Controller
@RequestMapping(path="/user")
public class UserController {

    @RequestMapping(path="/index")
    public String index(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "/login/login";
    }

    @RequestMapping(path="/mainPage")
    public String main(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "/main";
    }

    @RequestMapping(path="/login")
    public ModelAndView login(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> model = new HashMap<String, Object>();
        Gson gson = new Gson();
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if(!"root".equals(username)) {
            model.put("result","fail");
        }
        if(!"root".equals(password)) {
            model.put("result","fail");
        }
        model.put("result","success");
        return new ModelAndView(new JsonContentTypeView(gson.toJson(model)));
    }
}
