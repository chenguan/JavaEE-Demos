package com.huarong.p2p.api.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.catalina.util.MD5Encoder;
import org.apache.commons.lang.StringUtils;
import org.hibernate.validator.constraints.NotBlank;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.dubbo.config.annotation.Service;
import com.huarong.p2p.api.bean.Response;
import com.huarong.p2p.api.bean.Response.Meta;
import com.huarong.p2p.api.jdbc.dao.DataAccessor;
import com.huarong.p2p.api.mybatis.mapper.FeedbackMapper;
import com.huarong.p2p.api.mybatis.model.Feedback;
import com.huarong.p2p.api.service.FeedbackService;
import com.huarong.p2p.api.service.UserService;
import com.huarong.p2p.api.util.CodecUtil;
import com.huarong.p2p.api.util.JsonUtil;
import com.huarong.p2p.api.util.StringUtil;
/**
 * @author yebin
 * @since 1.0.0
 *
 */

@Service(protocol="dubbo")
public class FeedbackServiceImpl   implements FeedbackService {/*
	private static Logger log = LoggerFactory.getLogger(FeedbackService.class);
	
	@Autowired
	FeedbackMapper feedbackMapper;

	@Override
	public Response addFeedback(@NotBlank(message="请先登陆") String userId, @NotBlank(message="请输入反馈内容") String content)
			throws Exception {
		Response response = new Response();
		try {
			
			Feedback feedback=new Feedback();
			feedback.setUserId(Long.valueOf(userId));
			feedback.setContent(content);
			feedback.setPublishTime(new Date());
			int result=feedbackMapper.addFeedback(feedback);
		    if(result>0){
		        Response. Meta	 meta = response.new Meta("00", "感谢您的反馈,我们会在第一时间内处理");
		    	response.setMeta(meta);
		    }
		} catch (Exception e) {
			//response.setMeta(new Meta("4", "发生错误,反馈不成功"));
			 Response. Meta	 meta = response.new Meta("01", "发生错误,反馈不成功");
		     response.setMeta(meta);
		}
		return response;
	}
	
*/}
