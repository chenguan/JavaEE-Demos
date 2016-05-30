package com.yew1eb.controller;

import com.shiyanlou.photo.domain.User;
import com.shiyanlou.photo.service.ImageService;
import com.shiyanlou.photo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


@Controller
@RequestMapping("/user")
public class UserController {
    private static final long serialVersionUID = 1L;


    @RequestMapping("/login")
    public Object login(Model model, @RequestParam String username, @RequestParam String password) {

        String result = null;
        User user = null;
        //验证用户是否有效
        if (username.isEmpty()) {
            result = "1";
        } else if (password.isEmpty()) {
            result = "2";
        } else if ((user = userService.getUserByUsername(username)) == null) {
            result = "3";
        } else {
            if (!user.getPassword().equals(password)) {
                result = "4";
            } else {
                request.getSession().setAttribute("user", user);
                request.getSession().setAttribute("imageList", imageService.getByUserId(user.getId()));
                result = "5";
            }
        }
        return "user";

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("Utf-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        UserService userService = new UserService();
        ImageService imageService = new ImageService();

        (type == 2) {    //用户注册
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String repassword = request.getParameter("repassword");
            String result = null;
            //验证有效性
            if (username.isEmpty()) {
                result = "1";
            } else if (password.isEmpty()) {
                result = "2";
            } else if (repassword.isEmpty()) {
                result = "3";
            } else if (!repassword.equals(password)) {
                result = "4";
            } else if (userService.getUserByUsername(username) != null) {
                result = "5";
            } else {
                User user = new User(username, password);
                //添加用户
                userService.addUser(user);
                result = "6";
            }
            out.print(result);
        }else if (type == 3) {    //用户退出
            request.getSession().invalidate();
        }
    }


}
