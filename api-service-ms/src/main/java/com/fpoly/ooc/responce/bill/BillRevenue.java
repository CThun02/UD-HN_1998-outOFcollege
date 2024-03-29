package com.fpoly.ooc.responce.bill;

import java.math.BigDecimal;
import java.time.LocalDateTime;


public interface BillRevenue {
    public Integer getBillSell();
    public BigDecimal getGrossRevenue();
    public LocalDateTime getCreatedAt();
}
