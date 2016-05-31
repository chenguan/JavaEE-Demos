package com.huarong.p2p.api.mybatis.model;

import java.util.Date;

public class SendSms {
    private Long id;

    private String content;

    private Date sendtime;

    private String splitid;

    private String splitphone;

    private Integer status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public Date getSendtime() {
        return sendtime;
    }

    public void setSendtime(Date sendtime) {
        this.sendtime = sendtime;
    }

    public String getSplitid() {
        return splitid;
    }

    public void setSplitid(String splitid) {
        this.splitid = splitid == null ? null : splitid.trim();
    }

    public String getSplitphone() {
        return splitphone;
    }

    public void setSplitphone(String splitphone) {
        this.splitphone = splitphone == null ? null : splitphone.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}