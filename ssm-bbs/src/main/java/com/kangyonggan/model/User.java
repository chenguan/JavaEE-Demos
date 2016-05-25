package com.kangyonggan.model;

import com.alibaba.fastjson.annotation.JSONField;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

/**
 * 用户
 *
 * @author kangyonggan
 * @since 16/4/29
 */
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    private String realname;

    private String logos;

    private String logom;

    private String logol;

    private String mobile;

    private String email;

    @Column(name = "createdTime")
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date createdtime;

    @Column(name = "updatedTime")
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date updatedtime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getLogos() {
        return logos;
    }

    public void setLogos(String logos) {
        this.logos = logos;
    }

    public String getLogom() {
        return logom;
    }

    public void setLogom(String logom) {
        this.logom = logom;
    }

    public String getLogol() {
        return logol;
    }

    public void setLogol(String logol) {
        this.logol = logol;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getCreatedtime() {
        return createdtime;
    }

    public void setCreatedtime(Date createdtime) {
        this.createdtime = createdtime;
    }

    public Date getUpdatedtime() {
        return updatedtime;
    }

    public void setUpdatedtime(Date updatedtime) {
        this.updatedtime = updatedtime;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", realname='" + realname + '\'' +
                ", logos='" + logos + '\'' +
                ", logom='" + logom + '\'' +
                ", logol='" + logol + '\'' +
                ", mobile='" + mobile + '\'' +
                ", email='" + email + '\'' +
                ", createdtime=" + createdtime +
                ", updatedtime=" + updatedtime +
                '}';
    }
}
