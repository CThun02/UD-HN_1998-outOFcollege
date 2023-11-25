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
public class BillGrowthResponse {
    private BigDecimal revenue;
    private Float growthPercent;
}
