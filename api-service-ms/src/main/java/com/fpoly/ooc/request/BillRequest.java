package com.fpoly.ooc.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BillRequest {

    private Long billId;

    private Long billDetailId;

    private String accountId;

    private Long productDetailId;

    private BigDecimal price;

    private Integer quantity;

    private String note;

    private String status;


}
