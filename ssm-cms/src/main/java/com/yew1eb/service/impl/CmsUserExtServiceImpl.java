package com.yew1eb.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yew1eb.base.AbstractBaseDao;
import com.yew1eb.entity.CmsUserExt;
import com.yew1eb.service.CmsUserExtService;

@Service
@Transactional
public class CmsUserExtServiceImpl extends AbstractBaseDao<CmsUserExt, Integer> implements CmsUserExtService{

}
