package com.fpoly.ooc.responce.bill;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BillRevenueCompare {
    private Double inStoreRevenue;
    private Double onlineRevenue;
    private Double totalRevenue;
}
