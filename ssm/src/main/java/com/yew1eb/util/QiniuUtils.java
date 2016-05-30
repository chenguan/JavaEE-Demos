package com.yew1eb.util;

import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import com.qiniu.util.StringMap;

import java.io.IOException;


/**
 * 图片工具类（使用七牛云存储服务）
 *
 * @author www.shiyanlou.com
 */
public class QiniuUtils {
    private static final String ACCESS_KEY = "0qGWhg1kjQzK8mnAhQkd9JuBfVrIEVIcPrgARanj";
    private static final String SECRET_KEY = "pftaZ6XcUqn84w9itp3RA9AeUZsz3U4eG3U_LGec";
    private static final String BUCKET_NAME = "imagespace";

    //上传到七牛后保存的文件名
    private static String key = "test-image.png";
    //上传文件的路径
    private static String FilePath = "/Users/yew1eb/temp/test-image.png";

    //密钥配置
    private static Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
    //创建上传对象
    private static UploadManager uploadManager = new UploadManager();

    private static BucketManager bucketManager = new BucketManager(auth);
    // 覆盖上传
    public static String getUpToken() {
        //<bucket>:<key>，表示只允许用户上传指定key的文件。在这种格式下文件默认允许“修改”，已存在同名资源则会被本次覆盖。
        //如果希望只能上传指定key的文件，并且不允许修改，那么可以将下面的 insertOnly 属性值设为 1。
        //第三个参数是token的过期时间
        return auth.uploadToken(BUCKET_NAME, key, 3600, new StringMap().put("insertOnly", 1));
    }

    public static void upload(String ImageUrl) {
        try {
            //调用put方法上传
            Response res = uploadManager.put(FilePath, key, getUpToken());
            //打印返回的信息
            System.out.println(res.bodyString());
        } catch (QiniuException e) {
            Response r = e.response;
            // 请求失败时打印的异常的信息
            System.out.println(r.toString());
            try {
                //响应的文本信息
                System.out.println(r.bodyString());
            } catch (QiniuException e1) {
                //ignore
            }
        }
    }

    public static void delete(String key) {
        try {
            bucketManager.delete(BUCKET_NAME, key);
        } catch (QiniuException e) {
            //捕获异常信息
            Response r = e.response;
            System.out.println(r.toString());
        }
    }
}
