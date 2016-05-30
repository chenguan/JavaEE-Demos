package com.yew1eb.service;

import com.yew1eb.dao.UserDao;
import com.yew1eb.domain.Image;
import com.yew1eb.util.QiniuUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    private UserDao userDao;

    public void addImage(Image image, InputStream inputStream) {
        QiniuUtils.upload(image.getUrl());

        String[] sqls = {"insert into image(name, url, date, user_id) values(?, ?, ?, ?)"};
        String[][] parameters = {{image.getName(), image.getUrl(), new SimpleDateFormat("yyyy-MM-dd HH:mm").format(image.getDate()), image.getUser().getId() + ""}};
        DBUtils.updates(sqls, parameters);
    }

    public ArrayList<Image> getByUserId(int userId) {
        ArrayList<Image> images = new ArrayList<Image>();
        String sql = "select id, name, url, date, user_id from image where user_id = ? order by date desc";
        String[] parameters = {userId + ""};
        List<Object[]> imageList = DBUtils.query(sql, parameters);
        for (Object[] objects : imageList) {
            Image image = new Image();
            image.setId(Integer.parseInt(objects[0].toString()));
            image.setName(objects[1].toString());
            image.setUrl(objects[2].toString());
            image.setDate((Date) objects[3]);
            image.setUser(new User(Integer.parseInt(objects[4].toString())));
            images.add(image);
        }
        return images;
    }



    /**
     * 通过图片ID数组和图片URL数组删除图片
     *
     * @param ids  图片ID数组
     * @param urls 图片URL数组
     */
    public void delByIdsAndUrls(String ids, String urls) {
        String[] idArray = ids.split(",");
        String[] urlArray = urls.split(",");
        if (!"".equals(idArray[0]) && !"".equals(urlArray[0])) {
            String[] sqls = new String[idArray.length];
            String[][] parameters = new String[idArray.length][1];
            for (int i = 0; i < idArray.length; i++) {
                FileUtils.delete(urlArray[i]);
                sqls[i] = "delete from image where id = ?";
                parameters[i][0] = idArray[i];
            }
            DBUtils.updates(sqls, parameters);
        }
    }
}
