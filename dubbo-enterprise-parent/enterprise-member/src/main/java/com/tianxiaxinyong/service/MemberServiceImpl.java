package com.tianxiaxinyong.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.tianxiaxinyong.enterprise.common.DataException;
import com.tianxiaxinyong.enterprise.common.ServiceException;
import com.tianxiaxinyong.enterprise.member.domain.Member;
import com.tianxiaxinyong.enterprise.member.service.MemberService;
import com.tianxiaxinyong.mapper.MemberMapper;

@Service("memberService")
public class MemberServiceImpl implements MemberService<Member> {

	private Logger LOG = LoggerFactory.getLogger(MemberServiceImpl.class);
	
	@Autowired
	private MemberMapper memberMapper;

	@Override
	public Member findMemberById(String id) throws ServiceException,DataException {
		Member member  = memberMapper.selectByPrimaryKey(id);
		LOG.info("用户数据member={}",JSON.toJSONString(member));
		return member;
	}

	
	@Override
	public Member findMemberByMemberName(String userName) throws ServiceException,DataException {
		Member member  = memberMapper.findMemberByMemberName(userName);
		System.out.println("tttt========================");
		return member;
	}


	@Override
	public int insertMember(Member member) throws ServiceException, DataException {
		int result = memberMapper.insert(member);
		return result;
	}


	@Override
	public int updateMember(Member member) throws ServiceException, DataException {
		int result = memberMapper.updateByPrimaryKeySelective(member);
		return result;
	}


	@Override
	public int deleteMember(String id) throws ServiceException, DataException {
		int result = memberMapper.deleteByPrimaryKey(id);
		return result;
	}

}
