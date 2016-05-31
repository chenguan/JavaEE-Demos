package com.huarong.p2p.api.service.impl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.rmi.RemoteException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.Map;

import javax.jws.WebService;
import javax.xml.ws.WebServiceClient;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.dubbo.config.annotation.Service;
import com.huarong.p2p.api.bean.Response;
import com.huarong.p2p.api.mybatis.model.Select;
import com.huarong.p2p.api.mybatis.model.SendSms;
import com.huarong.p2p.api.mybatis.model.SmsConfig;
import com.huarong.p2p.api.service.SendSmsService;
import com.huarong.p2p.api.service.SmsService;
import com.huarong.p2p.api.service.SysparService;
import com.huarong.p2p.api.util.DateUtil;
import com.huarong.p2p.api.util.StringUtil;
import com.shove.Convert;
import com.shove.data.DataSet;
import com.shove.data.dao.MySQL;
/**
 * 短信发送接口实现
 * @author he
 *
 * 2016年4月14日
 */
@Service(protocol="dubbo",async=true)
public class SmsServiceImpl   implements SmsService{/*
	@Autowired
	SysparService sysparService;
	
	@Autowired
	SendSmsService sendSmsService;
	
	private static Logger logger = LoggerFactory.getLogger(SmsServiceImpl.class);
	
	@Override
	public boolean checkTemplate(String template){
		if ("template".equals(template)) {
			return true;
		}
		return false;
	}
	
	@Override
	public boolean sendSms(String defaultMessage, String template,
			boolean isVoice) {
		return true;
	}
	
	@Override
	public boolean sendSms(String defaultMsgOrTemplate, boolean isVoice) {
		boolean result = false;
		if (checkTemplate(defaultMsgOrTemplate)) {
			result = sendSms(null, defaultMsgOrTemplate, isVoice);
		}else {
			result = sendSms(defaultMsgOrTemplate, null, isVoice);
		}
		return result;
	}
	

	public final static String  username = "AjkDbl08Ujc=";
	public final static String password = "AkQDP11/UkZXZlBlUz9XYQ==";
	public final static String endpoint = "http://118.195.131.79:8090/services/Sms";

	
	*//**   
	 * @throws ServiceException 
	 * @throws SQLException 
	 * @MethodName: sendSMS  
	 * @Param: SMSUtil  
	 * @Author: gang.lv
	 * @Date: 2013-5-30 下午04:04:13
	 * @Return:    
	 * @Descb: 发送短信
	 * @Throws:
	*//*
	public static Response sendSMS(String userName, String password, String content,
			String phone,String randomCode,String pathtype) throws SQLException {
		
			logger.debug("------------code------"+randomCode);
			String status = sendHrSms(content, phone, randomCode, pathtype);
			
			return getReturn(status);
		
	}

	
	public  String sendHrSms(String content,
			String phone, String randomCode,String pathtype){
		
		String smsuser="",smspwd="",smsendpoint="";
		int businessId=-1;//当前运营商
		String condition = "status=1 and isMarket=0 and id!=4";
		if (!StringUtil.isEmpty(pathtype)){
			condition = " isMarket=1 AND status=1 ";
		}
		SmsConfig smsConfig = dataAccessor.selectOne("com.huarong.p2p.api.mybatis.inter.SmsConfigMapper.selectByCondition", condition);
		smsuser = username;
		smspwd = password;
		smsendpoint = endpoint;
		if (smsConfig!=null)
		{//重置短息接口渠道
			smsuser = smsConfig.getAccount();
			smspwd = smsConfig.getPassword();
			smsendpoint = smsConfig.getUrl();
			businessId = smsConfig.getId();
		}
		
		if(StringUtils.isNotBlank(randomCode)){
            content += "("+randomCode+")";
        }
		
        try {
           
            String time = DateUtil.getCurrentDate();
            //数量验证
            String beginTime =time+ " 00:00:00";
            String endTime = time+ " 23:59:59";
            Select select = sysparService.selectBySelectKey("selectValue", "SMSACOUNT");
            if (select!=null) {
                int useacount =select.getSelectvalue();//可发数量
                int smsacount = sendSmsService.checkSendSmsCount(beginTime, endTime, phone);//已发数量
                if (smsacount>=useacount) {
                    logger.debug("~~~~~~~~~~~~~~~~~~~~~~~~~~发送已上限~~~~~~~~~~~~~~~~~~~~~~~");
                    return "3";
                }
            }
            //插入数据库
            SendSms insertSendSms = new SendSms();
            insertSendSms.setContent(content);
            insertSendSms.setSendtime(new Date());
            insertSendSms.setSplitid("");
            insertSendSms.setSplitphone(phone);
            insertSendSms.setStatus(2);
            sendSmsService.insertSendSms(insertSendSms);
            
            select = sysparService.selectBySelectKey("deleted", "SMS");
            if (select!=null ) {
                int deleted = select.getDeleted();
                if (deleted==2) {//标识不启用,直接返回成功，验证码自己在后台看
                    return "0";
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getMessage());
        }
        
		
		logger.debug("smsuser:"+smsuser + ";smspwd:" + smspwd + ";smsendpoint:" + smsendpoint);

		//log.info(PropertyResourceBundle.getBundle("config").getString("softwareSerialNo"));
		//加入亿美短信发送,亿美短信已未使用
		if (businessId==1) {
                Client client = SingletonClient.getClient(smsuser, smspwd);
                log.info("【华融金融】"+content);
                int code = client.sendSMS(new String[] { phone }, "【华融金融】"+content, "",5);
                log.info(code==0?"亿美短信发送成功！":"亿美短信发送失败!");
                return code+"";
        }
		
		//新加的短信方式 http://58.83.147.92:8080/qxt/smssenderv2
		if (businessId == 5 || businessId == 6){
			Map<String,String> message = new java.util.HashMap<String,String>();
			message.put("user", smsuser);
			message.put("password", smspwd);
			message.put("tele", phone);
			message.put("msg", "【三好贷】"+content);
			message.put("extno", "95279527");
			message.put("addseqno", "1");
			
			String ret  = transRequest(smsendpoint, message);
			logger.debug("sms_ret:"+ret);
			if (ret.startsWith("ok")){
				return "0";
			} else{
				return "1";
			}
		} 
		
		
		
		org.apache.cxf.service.Service service = new Service();
		Call call = null;

		call = (Call) service.createCall();
		
		//采用AZDG方式加密
		//采用AZDG方式加密		
		
		//发送短信
		call.setOperationName("InsertDownSms");
		call.setTargetEndpointAddress(new java.net.URL(smsendpoint));
		String boay = "<sendbody><message><orgaddr></orgaddr><mobile>"+phone+"</mobile><content>" + content + "</content><sendtime></sendtime><needreport>0</needreport></message><publicContent></publicContent></sendbody>";
		String ret1 = (String) call.invoke(new Object[] { smsuser, smspwd, "", boay });
		ret1.length();		
		JSONObject jsonObj = XML.toJSONObject(ret1);
		JSONObject response = (JSONObject) jsonObj.get("response");
		JSONObject head = (JSONObject) response.get("head");
		String code = (String) head.get("code");
		System.out.println(code);
		return code;
		
	}
	private static String byteToString(byte[] bByte) {
        StringBuffer sBuffer = new StringBuffer();
        for (int i = 0; i < bByte.length; i++) {
            sBuffer.append(byteToArrayString(bByte[i]));
        }
        return sBuffer.toString();
    }
	// 返回形式为数字跟字符串
    private static String byteToArrayString(byte bByte) {
    	String[] strDigits = { "0", "1", "2", "3", "4", "5",
             "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };
        int iRet = bByte;
        // System.out.println("iRet="+iRet);
        if (iRet < 0) {
            iRet += 256;
        }
        int iD1 = iRet / 16;
        int iD2 = iRet % 16;
        return strDigits[iD1] + strDigits[iD2];
    }
    
	*//**
	 *功能：
	 * @param url
	 * @param message
	 * @return
	 *//*
	public static String transRequest(String url, Map<String,String> message) {
		// 响应内容
		String result = "error";

		// 定义http客户端对象--httpClient
		HttpClient httpClient = new DefaultHttpClient();
 
		// 定义并实例化客户端链接对象-postMethod
		PostMethod postMethod = new PostMethod(url);
		httpClient.e
		String strObj = message.get("password");
		try {
			//密码加密
			String resultString = null;
			try {
				resultString = new String(strObj);
				MessageDigest md = MessageDigest.getInstance("MD5");
				// md.digest() 该函数返回值为存放哈希值结果的byte数组
				resultString = byteToString(md.digest(strObj.getBytes()));
			} catch (NoSuchAlgorithmException ex) {
				ex.printStackTrace();
			}
			
			// 设置http的头
			postMethod.setRequestHeader("ContentType", "application/x-www-form-urlencoded;charset=GBK");
			postMethod.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "gbk");
			// 填入各个表单域的值
			NameValuePair[] data = {
				new NameValuePair("user", message.get("user")), 
				new NameValuePair("password", resultString),
				new NameValuePair("tele", message.get("tele")),
				new NameValuePair("msg", message.get("msg")),
				new NameValuePair("extno", message.get("extno")),
				new NameValuePair("addseqno", message.get("addseqno"))
			};
//			log.info("----message:" + message);
//			log.info("====url:"+url);
//			log.info("====resultString:"+resultString);
			// 将表单的值放入postMethod中
			postMethod.setRequestBody(data);

			// 定义访问地址的链接状态
			int statusCode = 0;
			try {
				// 客户端请求url数据
				statusCode = httpClient.executeMethod(postMethod);
			} catch (Exception e) {
				e.printStackTrace();
			}

			// 请求成功状态-200
			if (statusCode == HttpStatus.SC_OK) {
				try {
					result = postMethod.getResponseBodyAsString();
				} catch (IOException e) {
					e.printStackTrace();
					result = "error";
				}
			} else {
				log.error("请求返回状态：" + statusCode);
			}
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			result = "error";
		} finally {
			// 释放链接
			postMethod.releaseConnection();
			httpClient.getHttpConnectionManager().closeIdleConnections(0);
		}
		return result;
	}

	
*/}
