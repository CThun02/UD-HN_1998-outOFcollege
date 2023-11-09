package com.fpoly.ooc.responce.bill;

import com.fpoly.ooc.responce.product.ProductDetailDisplayResponse;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import java.util.List;

@Setter
@Getter
public class BillRevenueDisplay {
    public Integer billSell;
    public BigDecimal grossRevenue;
    public LocalDateTime createdAt;
    public List<ProductDetailDisplayResponse> productDetailDisplay;

    public BillRevenueDisplay(BillRevenue billRevenue) {
        this.billSell = billRevenue.getBillSell();
        this.grossRevenue = billRevenue.getGrossRevenue();
        this.createdAt = billRevenue.getCreatedAt();
    }
}
