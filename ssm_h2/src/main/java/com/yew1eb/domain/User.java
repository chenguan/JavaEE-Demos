package com.yew1eb.domain;

/**
 * @author zhouhai
 * @createTime 16/5/13
 * @description
 */

public class User {

    private long id;
    private String name;
    private String sex;

    public User(String name, String sex) {
        this.name = name;
        this.sex = sex;
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String toString() {
        return new String("[id="+id+",name="+name+",sex="+sex +"]");
    }
}
