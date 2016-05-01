package com.sankuai.bean;

/**
 * Created by fan on 15/12/22.
 */
public class User {
    private String name;
    private String passwd;
    private String email;

    public User(String name, String passwd, String email) {
        this.name = name;
        this.passwd = passwd;
        this.email = email;
    }
    public User(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", passwd='" + passwd + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}