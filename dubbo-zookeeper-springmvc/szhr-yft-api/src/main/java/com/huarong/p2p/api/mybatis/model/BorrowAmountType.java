package com.huarong.p2p.api.mybatis.model;

public class BorrowAmountType {
    private Long id;

    private String name;

    private String nid;

    private Integer onceStatus;

    private String title;

    private String description;

    private Integer status;

    private String remark;

    private Long initCredit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getNid() {
        return nid;
    }

    public void setNid(String nid) {
        this.nid = nid == null ? null : nid.trim();
    }

    public Integer getOnceStatus() {
        return onceStatus;
    }

    public void setOnceStatus(Integer onceStatus) {
        this.onceStatus = onceStatus;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Long getInitCredit() {
        return initCredit;
    }

    public void setInitCredit(Long initCredit) {
        this.initCredit = initCredit;
    }
}