package com.tianxiaxinyong.enterprise.common;

import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

/**
 * @category 数据库加密解密控制
 * @author yiz
 *
 */
public class DatasourcePropertiesFactory {
	 private static final String PRODUCTION_MODE = "true";
	    private static final String DEFAULT_SECURE_KEY = "5c66d4f345d1762a";
	    private static final String ALGORITHM = "Blowfish";
	    
	    public static String getPassword(String pwd, String production) throws Exception
	    {
	        if (PRODUCTION_MODE.equalsIgnoreCase(production != null ? production.trim() : ""))
	        {
	            try
	            {
	                return decode(pwd);
	            }
	            catch (Exception e)
	            {
	                throw e;
	            }
	        }
	        else
	        {
	            return pwd;
	        }
	    }
	    
	    public static String encode(String secret) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
	            IllegalBlockSizeException, BadPaddingException
	    {
	        byte[] kbytes = DEFAULT_SECURE_KEY.getBytes();
	        SecretKeySpec key = new SecretKeySpec(kbytes, ALGORITHM);
	        
	        Cipher cipher = Cipher.getInstance(ALGORITHM);
	        cipher.init(Cipher.ENCRYPT_MODE, key);
	        byte[] encoding = cipher.doFinal(secret.getBytes());
	        BigInteger n = new BigInteger(encoding);
	        return n.toString(16);
	    }
	    
	    public static String decode(String secret) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
	            IllegalBlockSizeException, BadPaddingException
	    {
	        byte[] kbytes = DEFAULT_SECURE_KEY.getBytes();
	        SecretKeySpec key = new SecretKeySpec(kbytes, ALGORITHM);
	        
	        BigInteger n = new BigInteger(secret, 16);
	        byte[] encoding = n.toByteArray();
	        Cipher cipher = Cipher.getInstance(ALGORITHM);
	        cipher.init(Cipher.DECRYPT_MODE, key);
	        byte[] decode = cipher.doFinal(encoding);
	        return new String(decode);
	    }
}
