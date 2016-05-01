package com.sankuai.controller;

import com.sankuai.bean.User;
import com.sankuai.common.PageParam;
import com.sankuai.service.UserService;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by fan on 15/12/21.
 */
@Controller
public class TestController {
    @Resource
    private UserService userService;

    @RequestMapping("/index")
    public String test(Model model) {
        return "index";
    }

    @RequestMapping("/add")
    public String add(Model model, @RequestParam String username, @RequestParam String password, @RequestParam String useremail) {
        User u = new User(username, password, useremail);
        userService.insert(u);
        return "success";
    }

    @RequestMapping("/query")
    public String query(Model model, @RequestParam String username, @RequestParam String password) {
        List<User> users=userService.findByName(username);
        if (users!=null&&users.get(0).getPasswd().equals(password)) {
            model.addAttribute("test", "登录成功");
        } else {
            model.addAttribute("test", "登录失败");
        }
        return "result";
    }


    @RequestMapping("/list")
    public String show(Model model, @RequestParam(required = false, defaultValue = "1") String page) {
        int currPage=Integer.parseInt(page);
        int rowCount=userService.getRowCount();
        PageParam pageParam=new PageParam();
        pageParam.setRowCount(rowCount);
        if(pageParam.getTotalPage()<currPage){
            currPage=pageParam.getTotalPage();
        }
        pageParam.setCurrPage(currPage);
        model.addAttribute("users",userService.getUserByPage(pageParam));
        return "list";

    }

}