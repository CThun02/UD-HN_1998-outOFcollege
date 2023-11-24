package com.fpoly.ooc.responce.bill;

import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.Timeline;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class BillReturnResponse {
    public Long id;
    public String billCode;
    public String customerName;
    public String userName;
    public LocalDateTime conpletionDate;
    public BigDecimal price;
    public String billType;
    public String symbol;
    public LocalDateTime createdAt;
    public String createdBy;
    public List<BillDetail> billDetails;
    public List<TimeLineResponse> timeLines;
}
