package com.fpoly.ooc.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BillStatusDTO {

    private String status;

    private BigDecimal amountPaid;
    
}
