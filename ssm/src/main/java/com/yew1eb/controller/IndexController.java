package com.yew1eb.controller;

import com.yew1eb.common.PageParam;
import com.yew1eb.domain.User;
import com.yew1eb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/")
public class IndexController {

    @Autowired
    private UserService userService;

    @RequestMapping("")
    public String index(Model model) {
        return "index";
    }

    @RequestMapping("/add")
    public String add(Model model, @RequestParam String username, @RequestParam String password) {
        User u = new User(username, password);
        userService.insert(u);
        return "index";
    }

    @RequestMapping("/query")
    public String query(Model model, @RequestParam String username, @RequestParam String password) {
        List<User> users = userService.findByName(username);
        if (users != null && users.get(0).getPassword().equals(password)) {
            model.addAttribute("test", "登录成功");
        } else {
            model.addAttribute("test", "登录失败");
        }
        return "query";
    }


    @RequestMapping("/list")
    public String show(Model model, @RequestParam(required = false, defaultValue = "1") String page) {
        int currPage = Integer.parseInt(page);
        int rowCount = userService.getRowCount();
        PageParam pageParam = new PageParam();
        pageParam.setRowCount(rowCount);
        if (pageParam.getTotalPage() < currPage) {
            currPage = pageParam.getTotalPage();
        }
        pageParam.setCurrPage(currPage);
        model.addAttribute("users", userService.getUserByPage(pageParam));
        return "list";

    }

}