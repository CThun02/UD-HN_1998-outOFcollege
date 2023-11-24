package com.fpoly.ooc.responce.bill;

import com.fpoly.ooc.entity.Account;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface BillResponse {

    public Long getId();

    public String getBillCode();

    public String getCustomerName();

    public String getUserName();

    public LocalDateTime getConpletionDate();

    public BigDecimal getPrice();

    public String getBillType();

    public String getSymbol();

    public LocalDateTime getCreatedAt();

    public String getCreatedBy();
}
