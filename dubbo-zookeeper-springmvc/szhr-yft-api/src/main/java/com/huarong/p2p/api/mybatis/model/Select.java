package com.huarong.p2p.api.mybatis.model;

public class Select {
    private Long id;

    private Long typeid;

    private String selectkey;

    private Integer selectvalue;

    private String selectname;

    private Integer deleted;

    private String introduce;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTypeid() {
        return typeid;
    }

    public void setTypeid(Long typeid) {
        this.typeid = typeid;
    }

    public String getSelectkey() {
        return selectkey;
    }

    public void setSelectkey(String selectkey) {
        this.selectkey = selectkey == null ? null : selectkey.trim();
    }

    public Integer getSelectvalue() {
        return selectvalue;
    }

    public void setSelectvalue(Integer selectvalue) {
        this.selectvalue = selectvalue;
    }

    public String getSelectname() {
        return selectname;
    }

    public void setSelectname(String selectname) {
        this.selectname = selectname == null ? null : selectname.trim();
    }

    public Integer getDeleted() {
        return deleted;
    }

    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }

    public String getIntroduce() {
        return introduce;
    }

    public void setIntroduce(String introduce) {
        this.introduce = introduce == null ? null : introduce.trim();
    }
}