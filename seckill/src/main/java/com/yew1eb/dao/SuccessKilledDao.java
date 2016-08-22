package com.yew1eb.dao;

import com.yew1eb.domain.SuccessKilled;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * @author zhouhai
 * @createTime 16/8/21
 * @description
 */
public interface SuccessKilledDao {
    String FEILDS = " seckill_id,user_phone,state,create_time ";
    String TABLE = " success_killed ";


    /**
     * 插入购买明细,可过滤重复
     *
     * @param seckillId
     * @param userPhone
     * @return
     */
    @Insert("INSERT IGNORE INTO " + TABLE + "(seckill_id, user_phone) VALUES(#{seckillId}, #{userPhone})")
    int insertSuccessKilled(@Param("seckillId") long seckillId,
                            @Param("userPhone") long userPhone);

    /**
     * 根据id查询SuccessKilled并携带秒杀产品对象实体
     *
     * @param seckillId
     * @return
     */
    @Select("SELECT " +
            "sk.seckill_id," +
            "sk.user_phone," +
            "sk.create_time," +
            "sk.state," +
            "s.seckill_id 'seckill.seckill_id', " +
            "s.name 'seckill.name', " +
            "s.number 'seckill.number', " +
            "s.start_time 'seckill.start_time', " +
            "s.end_time 'seckill.end_time', " +
            "s.create_time 'seckill.create_time'" +
            "FROM success_killed sk INNER JOIN seckill s ON sk.seckill_id = s.seckill_id " +
            "WHERE sk.seckill_id=#{seckillId} AND sk.user_phone=#{userPhone}")
    SuccessKilled queryByIdWithSeckill(@Param("seckillId") long seckillId,
                                       @Param("userPhone") long userPhone);
}
