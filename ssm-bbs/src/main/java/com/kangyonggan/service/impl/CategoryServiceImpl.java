package com.kangyonggan.service.impl;

import com.kangyonggan.model.Category;
import com.kangyonggan.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author kangyonggan
 * @since 16/4/29
 */
@Service
@Transactional
public class CategoryServiceImpl extends BaseService<Category> implements CategoryService {

}
