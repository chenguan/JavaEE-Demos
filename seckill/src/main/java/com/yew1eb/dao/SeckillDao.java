package com.yew1eb.dao;

import com.yew1eb.domain.Seckill;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @author zhouhai
 * @createTime 16/8/21
 * @description
 */
@Repository
public interface SeckillDao {
    String FEILDS = " seckill_id,name,number,start_time,end_time,create_time ";
    String TABLE = " seckill ";

    /**
     * 减库存
     *
     * @param seckillId
     * @param killTime
     * @return
     */
    @Update("UPDATE " + TABLE + "SET number = number - 1 WHERE " +
            "seckill_id = #{seckillId} AND start_time <= #{killTime} AND end_time >= #{killTime} AND number > 0")
    int reduceNumber(@Param("seckillId") long seckillId,
                     @Param("killTime") Date killTime);

    /**
     * 根据id查询秒杀对象
     *
     * @param seckillId
     * @return
     */
    @Select("SELECT " + FEILDS + " FROM " + TABLE + " WHERE seckill_id = #{seckillId}")
    Seckill queryById(@Param("seckillId") long seckillId);

    /**
     * 根据偏移量查询秒杀商品列表
     *
     * @param offset
     * @param limit
     * @return
     */
    @Select("SELECT " + FEILDS + " FROM " + TABLE + " ORDER BY create_time DESC LIMIT #{offset}, #{limit}")
    List<Seckill> queryAll(@Param("offset") int offset,
                           @Param("limit") int limit);

    /**
     * 使用存储过程执行秒杀
     * @param paramMap
     */
    void killByProcedure(Map<String,Object> paramMap);
}
