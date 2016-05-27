package com.java1234.controller.web.api;

import com.java1234.entity.Blog;
import com.java1234.lucene.BlogIndex;
import com.java1234.service.BlogService;
import com.java1234.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequestMapping("/lucene")
public class LuceneAddIndexApi {

    @Autowired
    private BlogService blogService;

    private BlogIndex blogIndex = new BlogIndex();

    @RequestMapping("")
    @ResponseBody
    public String index() {
        return "welcome to lucene";
    }

    @RequestMapping(value = "/rebuild", method = RequestMethod.GET)
    @ResponseBody
    public String rebuild(HttpServletRequest request, HttpServletResponse response) throws Exception {
        List<Blog> blogs = blogService.getAll();
        System.out.println(blogs.size());
        for (Blog blog : blogs) {
            blogIndex.addIndex(blog); // 添加博客索引
        }
        ResponseUtil.write(response, blogs);
        return "finished!";
    }

}
