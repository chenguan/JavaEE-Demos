package com.tianxiaxinyong.web.controller.member;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.dubbo.config.annotation.Reference;
import com.tianxiaxinyong.enterprise.member.domain.Member;
import com.tianxiaxinyong.enterprise.member.service.MemberService;
import com.tianxiaxinyong.web.controller.BaseController;

@RestController
@RequestMapping("user")
public class MemberController extends BaseController {
	private MemberService<Member> memberService;
	
}
