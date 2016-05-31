package com.huarong.p2p.consumer.controller;

import java.text.ParseException;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.huarong.p2p.api.bean.Response;
import com.huarong.p2p.api.bean.UserBean;
import com.huarong.p2p.api.mybatis.model.User;
import com.huarong.p2p.api.param.LoginParam;
import com.huarong.p2p.api.param.RegisterParam;
import com.huarong.p2p.api.service.SmsConfigService;
import com.huarong.p2p.api.service.UserService;
import com.huarong.p2p.api.validation.MobileNo;
import com.huarong.p2p.api.web.WebContext;
import com.huarong.p2p.consumer.security.IgnoreSecurity;
import com.huarong.p2p.consumer.security.TokenManager;

/**
 * 用户控制器
 *
 * @author he
 * @since 1.0.0
 */
@RestController
public class UserController {
	
	@Reference
    private UserService userService;
	
	@Reference
    private SmsConfigService smsConfigService;
    
    @Autowired
    private TokenManager tokenManager;

    /**
     * 登录
     * @throws ParseException 
     */
    @IgnoreSecurity
    @RequestMapping(value = "/login",method=RequestMethod.POST)
    public Response login(@RequestBody @Valid LoginParam param) throws Exception {
    	
        // 获取登录信息
        String lastIP = WebContext.getRequest().getRemoteAddr();
        
        // 调用登录服务
        User result = userService.login(param,lastIP);
        if (null!=result && result.isLogin()) {
            // 创建 token
            String token = tokenManager.createToken(param.getUsername());
            // 封装 user 对象
            UserBean userBean = new UserBean();
            userBean.setToken(token);
            userBean.setUsername(param.getUsername());
            // 登录成功，将 user 对象返回前端
            return new Response().success(userBean);
        } else {
            // 登录失败，返回失败信息
            return new Response().failure("login_failure");
        }
    }
    
    /**
     * 注册
     * @author he
     * @since 1.0.0
     * 2016-4-5
     */
    @IgnoreSecurity
    @RequestMapping(value = "register",method = RequestMethod.POST)
    public Response register(@Valid RegisterParam param){
    	return new Response().success();
    }
    
    /**
     * 注册短信验证
     * @author he
     * @since 1.0.0
     * 2016-4-6
     */
    @IgnoreSecurity
    @RequestMapping("register-prepare")
    public Response registerPrepare(HttpSession session,@NotEmpty(message="请填写验证码") String imgValue, @MobileNo(message="请填写正确的手机号码") String mobileNo){
    	return new Response().success(true);
    }
    
    /**
     * 注册短信发送
     * 
     * @return
     * @author he
     * @since 1.0.0
     * 2016-4-6
     */
    @IgnoreSecurity
    @RequestMapping("sendSms")
    public Response sendSms(){
    	//boolean result = smsService.sendSms(null, "template", true);
    	return new Response().success(true);
    }
    
}
