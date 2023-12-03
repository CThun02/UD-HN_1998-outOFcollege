package com.fpoly.ooc.responce.bill;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpoly.ooc.entity.Account;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface BillResponse {

    public Long getId();

    public String getBillCode();

    public String getCustomerName();

    public String getUserName();

    @JsonFormat(pattern = "HH:mm:ss MM/dd/yyyy")
    public LocalDateTime getCompletionDate();

    public BigDecimal getPrice();

    public String getBillType();

    public String getSymbol();

    @JsonFormat(pattern = "HH:mm:ss MM/dd/yyyy")
    public LocalDateTime getCreatedAt();

    public String getCreatedBy();

    public String getStatus();

    public String getNote();

    public BigDecimal getAmountPaid();

    public BigDecimal getShippingPrice();

}
