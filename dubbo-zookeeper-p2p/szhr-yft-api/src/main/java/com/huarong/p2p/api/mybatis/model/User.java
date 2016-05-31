package com.huarong.p2p.api.mybatis.model;

import java.math.BigDecimal;
import java.util.Date;

public class User {
	
	private boolean isLogin;//是否登陆
	
    public boolean isLogin() {
		return isLogin;
	}

	public void setLogin(boolean isLogin) {
		this.isLogin = isLogin;
	}

	private Long id;

    private String email;

    private String username;

    private Integer vipstatus;

    private Integer authstep;

    private Integer enable;

    private String password;

    private String dealpwd;

    private String mobilephone;

    private String refferee;

    private Integer rating;

    private Integer creditrating;

    private String lastip;

    private Date lastdate;

    private Date vipcreatetime;

    private Long creditlimit;

    private String headimg;

    private Date createtime;

    private BigDecimal usablesum;

    private BigDecimal freezesum;

    private BigDecimal dueinsum;

    private BigDecimal dueoutsum;

    private Long kefuid;

    private Long adminid;

    private Long groupid;

    private Long usablecreditlimit;

    private Long creditlimtor;

    private BigDecimal vipfee;

    private Integer feestatus;

    private Long logincount;

    private Date locktime;

    private Integer cashstatus;

    private BigDecimal xmax;

    private BigDecimal x;

    private BigDecimal xmin;

    private Integer isfirstvip;

    private String sign;

    private String sign2;

    private Integer loginerrorcount;

    private Integer isloginlimit;

    private Integer isapplypro;

    private String orgname;

    private Integer usertype;

    private Integer sumscore;

    private BigDecimal presrent;

    private BigDecimal expire;

    private String content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public Integer getVipstatus() {
        return vipstatus;
    }

    public void setVipstatus(Integer vipstatus) {
        this.vipstatus = vipstatus;
    }

    public Integer getAuthstep() {
        return authstep;
    }

    public void setAuthstep(Integer authstep) {
        this.authstep = authstep;
    }

    public Integer getEnable() {
        return enable;
    }

    public void setEnable(Integer enable) {
        this.enable = enable;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getDealpwd() {
        return dealpwd;
    }

    public void setDealpwd(String dealpwd) {
        this.dealpwd = dealpwd == null ? null : dealpwd.trim();
    }

    public String getMobilephone() {
        return mobilephone;
    }

    public void setMobilephone(String mobilephone) {
        this.mobilephone = mobilephone == null ? null : mobilephone.trim();
    }

    public String getRefferee() {
        return refferee;
    }

    public void setRefferee(String refferee) {
        this.refferee = refferee == null ? null : refferee.trim();
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getCreditrating() {
        return creditrating;
    }

    public void setCreditrating(Integer creditrating) {
        this.creditrating = creditrating;
    }

    public String getLastip() {
        return lastip;
    }

    public void setLastip(String lastip) {
        this.lastip = lastip == null ? null : lastip.trim();
    }

    public Date getLastdate() {
        return lastdate;
    }

    public void setLastdate(Date lastdate) {
        this.lastdate = lastdate;
    }

    public Date getVipcreatetime() {
        return vipcreatetime;
    }

    public void setVipcreatetime(Date vipcreatetime) {
        this.vipcreatetime = vipcreatetime;
    }

    public Long getCreditlimit() {
        return creditlimit;
    }

    public void setCreditlimit(Long creditlimit) {
        this.creditlimit = creditlimit;
    }

    public String getHeadimg() {
        return headimg;
    }

    public void setHeadimg(String headimg) {
        this.headimg = headimg == null ? null : headimg.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public BigDecimal getUsablesum() {
        return usablesum;
    }

    public void setUsablesum(BigDecimal usablesum) {
        this.usablesum = usablesum;
    }

    public BigDecimal getFreezesum() {
        return freezesum;
    }

    public void setFreezesum(BigDecimal freezesum) {
        this.freezesum = freezesum;
    }

    public BigDecimal getDueinsum() {
        return dueinsum;
    }

    public void setDueinsum(BigDecimal dueinsum) {
        this.dueinsum = dueinsum;
    }

    public BigDecimal getDueoutsum() {
        return dueoutsum;
    }

    public void setDueoutsum(BigDecimal dueoutsum) {
        this.dueoutsum = dueoutsum;
    }

    public Long getKefuid() {
        return kefuid;
    }

    public void setKefuid(Long kefuid) {
        this.kefuid = kefuid;
    }

    public Long getAdminid() {
        return adminid;
    }

    public void setAdminid(Long adminid) {
        this.adminid = adminid;
    }

    public Long getGroupid() {
        return groupid;
    }

    public void setGroupid(Long groupid) {
        this.groupid = groupid;
    }

    public Long getUsablecreditlimit() {
        return usablecreditlimit;
    }

    public void setUsablecreditlimit(Long usablecreditlimit) {
        this.usablecreditlimit = usablecreditlimit;
    }

    public Long getCreditlimtor() {
        return creditlimtor;
    }

    public void setCreditlimtor(Long creditlimtor) {
        this.creditlimtor = creditlimtor;
    }

    public BigDecimal getVipfee() {
        return vipfee;
    }

    public void setVipfee(BigDecimal vipfee) {
        this.vipfee = vipfee;
    }

    public Integer getFeestatus() {
        return feestatus;
    }

    public void setFeestatus(Integer feestatus) {
        this.feestatus = feestatus;
    }

    public Long getLogincount() {
        return logincount;
    }

    public void setLogincount(Long logincount) {
        this.logincount = logincount;
    }

    public Date getLocktime() {
        return locktime;
    }

    public void setLocktime(Date locktime) {
        this.locktime = locktime;
    }

    public Integer getCashstatus() {
        return cashstatus;
    }

    public void setCashstatus(Integer cashstatus) {
        this.cashstatus = cashstatus;
    }

    public BigDecimal getXmax() {
        return xmax;
    }

    public void setXmax(BigDecimal xmax) {
        this.xmax = xmax;
    }

    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public BigDecimal getXmin() {
        return xmin;
    }

    public void setXmin(BigDecimal xmin) {
        this.xmin = xmin;
    }

    public Integer getIsfirstvip() {
        return isfirstvip;
    }

    public void setIsfirstvip(Integer isfirstvip) {
        this.isfirstvip = isfirstvip;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign == null ? null : sign.trim();
    }

    public String getSign2() {
        return sign2;
    }

    public void setSign2(String sign2) {
        this.sign2 = sign2 == null ? null : sign2.trim();
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

    public Integer getIsapplypro() {
        return isapplypro;
    }

    public void setIsapplypro(Integer isapplypro) {
        this.isapplypro = isapplypro;
    }

    public String getOrgname() {
        return orgname;
    }

    public void setOrgname(String orgname) {
        this.orgname = orgname == null ? null : orgname.trim();
    }

    public Integer getUsertype() {
        return usertype;
    }

    public void setUsertype(Integer usertype) {
        this.usertype = usertype;
    }

    public Integer getSumscore() {
        return sumscore;
    }

    public void setSumscore(Integer sumscore) {
        this.sumscore = sumscore;
    }

    public BigDecimal getPresrent() {
        return presrent;
    }

    public void setPresrent(BigDecimal presrent) {
        this.presrent = presrent;
    }

    public BigDecimal getExpire() {
        return expire;
    }

    public void setExpire(BigDecimal expire) {
        this.expire = expire;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}