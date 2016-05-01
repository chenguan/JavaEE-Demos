package com.huarong.p2p.api.mybatis.model;

import java.math.BigDecimal;
import java.util.Date;

public class Admin {
    private Long id;

    private String username;

    private String password;

    private Integer enable;

    private Date lasttime;

    private String lastip;

    private Long roleid;

    private String realname;

    private String telphone;

    private String qq;

    private String email;

    private String isleader;

    private Integer sex;

    private String card;

    private String summary;

    private Integer nativeplacepro;

    private Integer nativeplacecity;

    private String address;

    private Date adddate;

    private BigDecimal moneys;

    private Integer loginerrorcount;

    private Integer isloginlimit;

    private Integer isfirstlogin;

    private String img;

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
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public Integer getEnable() {
        return enable;
    }

    public void setEnable(Integer enable) {
        this.enable = enable;
    }

    public Date getLasttime() {
        return lasttime;
    }

    public void setLasttime(Date lasttime) {
        this.lasttime = lasttime;
    }

    public String getLastip() {
        return lastip;
    }

    public void setLastip(String lastip) {
        this.lastip = lastip == null ? null : lastip.trim();
    }

    public Long getRoleid() {
        return roleid;
    }

    public void setRoleid(Long roleid) {
        this.roleid = roleid;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getTelphone() {
        return telphone;
    }

    public void setTelphone(String telphone) {
        this.telphone = telphone == null ? null : telphone.trim();
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq == null ? null : qq.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getIsleader() {
        return isleader;
    }

    public void setIsleader(String isleader) {
        this.isleader = isleader == null ? null : isleader.trim();
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card == null ? null : card.trim();
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary == null ? null : summary.trim();
    }

    public Integer getNativeplacepro() {
        return nativeplacepro;
    }

    public void setNativeplacepro(Integer nativeplacepro) {
        this.nativeplacepro = nativeplacepro;
    }

    public Integer getNativeplacecity() {
        return nativeplacecity;
    }

    public void setNativeplacecity(Integer nativeplacecity) {
        this.nativeplacecity = nativeplacecity;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public Date getAdddate() {
        return adddate;
    }

    public void setAdddate(Date adddate) {
        this.adddate = adddate;
    }

    public BigDecimal getMoneys() {
        return moneys;
    }

    public void setMoneys(BigDecimal moneys) {
        this.moneys = moneys;
    }

    public Integer getLoginerrorcount() {
        return loginerrorcount;
    }

    public void setLoginerrorcount(Integer loginerrorcount) {
        this.loginerrorcount = loginerrorcount;
    }

    public Integer getIsloginlimit() {
        return isloginlimit;
    }

    public void setIsloginlimit(Integer isloginlimit) {
        this.isloginlimit = isloginlimit;
    }

    public Integer getIsfirstlogin() {
        return isfirstlogin;
    }

    public void setIsfirstlogin(Integer isfirstlogin) {
        this.isfirstlogin = isfirstlogin;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img == null ? null : img.trim();
    }
}