package com.sankuai.common;

import com.sankuai.bean.User;

import java.util.List;

/**
 * Created by fan on 15/12/23.
 */
public class PageParam {
    private int currPage;
    private int totalPage;
    private int rowCount;
    public static int pageSize = 5;
    private List<User> data;

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getCurrPage() {
        return currPage;
    }

    public void setCurrPage(int currPage) {
        this.currPage = currPage;
    }

    public int getRowCount() {
        return rowCount;
    }

    public void setRowCount(int rowCount) {
        int totalPage = rowCount / pageSize;
        if (rowCount % pageSize > 0){
            totalPage += 1;
        }
        setTotalPage(totalPage);
        this.rowCount = rowCount;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public List<User> getData() {
        return data;
    }

    public void setData(List<User> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "PageParam{" +
                "currPage=" + currPage +
                ", totalPage=" + totalPage +
                ", rowCount=" + rowCount +
                ", data=" + data +
                '}';
    }
}