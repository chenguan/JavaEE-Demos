package com.tower.ssm.po;

import java.util.Date;

public class UserPo {
    private Integer id;

    private String username;

    private String password;

    private Integer issuper;

    private String usergroup;

    private String priority;

    private Date createtime;

    private Date lastontime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Integer getIssuper() {
        return issuper;
    }

    public void setIssuper(Integer issuper) {
        this.issuper = issuper;
    }

    public String getUsergroup() {
        return usergroup;
    }

    public void setUsergroup(String usergroup) {
        this.usergroup = usergroup == null ? null : usergroup.trim();
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority == null ? null : priority.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getLastontime() {
        return lastontime;
    }

    public void setLastontime(Date lastontime) {
        this.lastontime = lastontime;
    }
}