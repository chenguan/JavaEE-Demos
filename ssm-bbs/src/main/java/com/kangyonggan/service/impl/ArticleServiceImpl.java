package com.kangyonggan.service.impl;

import com.kangyonggan.model.Article;
import com.kangyonggan.service.ArticleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author kangyonggan
 * @since 16/4/29
 */
@Service
@Transactional
public class ArticleServiceImpl extends BaseService<Article> implements ArticleService {

}
