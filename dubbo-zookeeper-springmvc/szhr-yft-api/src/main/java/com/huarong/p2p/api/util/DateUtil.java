package com.huarong.p2p.api.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 日期工具类
 *
 * @author he
 * @since 1.0.0
 */
public final class DateUtil {
	
	public final static String YYYY_MM_DD_HH_MM_SS="yyyy-MM-dd HH:mm:ss";
	
    private static SimpleDateFormat FORMAT_YYYY_MM_DD_HH_MM_SS = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
    private static SimpleDateFormat FORMAT_YYYY_MM_DD = new SimpleDateFormat("yyyy-MM-dd");

    private DateUtil() {
    }
    
    /**
     * 返回对应pattern格式的日期
     * @param pattern
     * @return
     */
    public static String getFormatDate(String pattern){
    	SimpleDateFormat format = new SimpleDateFormat(pattern);
    	return format.format(new Date());
    }
    
    /**
     * 获取当前日期与时间 yyyy-MM-dd
     */
    public static String getCurrentDate() {
        return FORMAT_YYYY_MM_DD.format(new Date());
    }
    
    /**
     * 获取当前日期与时间 yyyy-MM-dd HH:mm:ss
     */
    public static String getCurrentDateTime() {
        return FORMAT_YYYY_MM_DD_HH_MM_SS.format(new Date());
    }
}
