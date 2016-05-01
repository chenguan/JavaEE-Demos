package com.tianxiaxinyong.web.security;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.exceptions.JedisConnectionException;

public class RedisManager {
	
	private static final Logger LOG = LoggerFactory.getLogger(RedisManager.class);
	
	private JedisPool redisPool;

	public JedisPool getRedisPool() {
		return redisPool;
	}

	public void setRedisPool(JedisPool redisPool) {
		this.redisPool = redisPool;
	}
	
	
	/**
	 * Add the string value to the head (LPUSH) or tail (RPUSH) of the list stored at key. 
	 * If the key does not exist an empty list is created just before the append operation. 
	 * If the key exists but is not a List an error will catch.
	 * 
	 * @param queueName 字符串队列名
	 * @param content 字符串值
	 */
	public void push(String queueName, String content) {
		Jedis jedis = null;
		try {
			jedis = redisPool.getResource();
			jedis.lpush(queueName.getBytes(), content.getBytes());
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.lpush异常：" + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.lpush异常：" + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}
	
	/**
	 * 获取redis中的key对应的值
	 * @param key
	 * @return
	 */
	public String get(String key) {
		Jedis jedis = null;
		String value = "";
		try {
			jedis = redisPool.getResource();
			value = jedis.get(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.get异常: " + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.get异常: " + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
		return value;
	}
	
	/**
	 * 获取redis中的key对应的值
	 * @param key
	 * @return
	 */
	public byte[] get(byte[] data) {
		String key = new String(data);
		return get(key).getBytes();
	}
	
	/**
	 * 删除一个指定的key
	 * @param key
	 */
	public void del(byte[] data) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.del(data);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.del异常: " + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.del异常: " + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}
	
	/**
	 * 删除一个指定的key
	 * @param key
	 */
	public void del(String key) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.del(key);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.del异常: " + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis.del异常: " + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}
	
	/**
	 * 模糊查询返回符合条件的key的集合
	 * @param pattern
	 * @return
	 */
	public Set<String> keys(String pattern) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			return jedis.keys(pattern);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.keys异常: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.keys异常: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}
	
	/**
	 * 模糊查询返回符合条件的key的集合
	 * @param pattern
	 * @return
	 */
	public Set<byte[]> byteKeys(String pattern) {
		Set<String> keys = keys(pattern);
		Set<byte[]> sets = new HashSet<byte[]>();
		for (String key : keys) {
			sets.add(key.getBytes());
		}
		return sets;
	}
	
	/**
	 * 设置一个具有生存周期的key-value 主要用于缓存
	 * @param key
	 * @param value
	 * @param timeout
	 */
	public void setex(String key, String value, int timeout) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.setex(key, timeout, value);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis setex异常：" + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis setex异常：" + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}
	
	/**
	 * 设置一个具有生存周期的key-value 主要用于缓存
	 * @param key
	 * @param value
	 * @param timeout
	 */
	public void setex(byte[] key, byte[] value, int timeout) {
		Jedis jedis = null;

		try {
			jedis = redisPool.getResource();
			jedis.setex(key, timeout, value);
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				redisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis setex异常：" + e.toString(), e);
		}
		catch (Exception e) {
			LOG.error("jedis setex异常：" + e.toString(), e);
		}
		finally {
			if (null != jedis) {
				redisPool.returnResource(jedis);
			}
		}
	}
	
	/**
	 * @category 缓存时间
	 * @return
	 */
	public int getExpire(){
		return 30*60;
	}
}
