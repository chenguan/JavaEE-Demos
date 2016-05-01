package com.liuwenjian.common;

import com.google.gson.JsonObject;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by halapro on 2016/3/8.
 * 说明：支持Json或String类型的view
 */
public class JsonContentTypeView extends AbstractView {

    static final Logger logger = Logger.getLogger(JsonContentTypeView.class);

    private String jsonString;

    private List<Object> dataList;

    public String getJsonString()
    {
        return jsonString;
    }

    public void setJsonString(String jsonString)
    {
        this.jsonString = jsonString;
    }

    /**
     * 传入一个String类型返回到页面
     *
     * @param json
     */
    public JsonContentTypeView(JsonObject json)
    {
        this.jsonString = json.toString();
    }

    /**
     * 传入一个list对象到页面
     *
     * @param dataList
     */
    private JsonContentTypeView(List<Object> dataList)
    {
        super();
        this.dataList = dataList;
    }


    /**
     * 说明：根据String转换成JSONView
     *
     * @param json
     * @return
     */
    public static final JsonContentTypeView valuesOf(String str)
    {
        return new JsonContentTypeView(str);
    }

    /**
     * 说明：根据json转换成JSONView
     *
     * @param json
     * @return
     */
    public static final JsonContentTypeView valuesOf(JsonObject json)
    {
        return new JsonContentTypeView(json);
    }

    /**
     * 传入一个json对象返回
     *
     * @param jsonString
     */
    public JsonContentTypeView(String jsonString)
    {
        this.jsonString = jsonString;
    }

    /**
     * 说明：公共的true
     */
    public static final JsonContentTypeView TRUE  = new JsonContentTypeView("true");

    /**
     * 说明：公共的false
     */
    public static final JsonContentTypeView FALSE = new JsonContentTypeView("false");

    @Override
    protected void renderMergedOutputModel(Map model, HttpServletRequest request, HttpServletResponse response) throws Exception
    {
        try
        {
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().print(jsonString);
        } catch (Exception e)
        {
            logger.error("json view render is error", e);
        } finally
        {
            response.getWriter().close();
        }
    }

}

