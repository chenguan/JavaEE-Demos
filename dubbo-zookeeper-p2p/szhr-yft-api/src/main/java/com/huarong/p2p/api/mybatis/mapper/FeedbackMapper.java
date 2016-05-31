package com.huarong.p2p.api.mybatis.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.huarong.p2p.api.mybatis.model.Feedback;
import com.huarong.p2p.api.mybatis.model.User;

public interface FeedbackMapper {
	
   /**
    * 添加用户反馈	
    * @param feedback
    * @return
    */
	@Insert("INSERT INTO t_feedback(content,user_id,publish_time) VALUES(#{content},#{userId},#{publishTime})")
	int addFeedback(Feedback feedback);
}