package com.fpoly.ooc.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BillStatusDTO {

    private Long id;

    private String status;

    private String timelineStatus;

    private BigDecimal amountPaid;

}
