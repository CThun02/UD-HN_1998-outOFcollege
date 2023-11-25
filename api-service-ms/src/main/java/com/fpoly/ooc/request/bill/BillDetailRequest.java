package com.fpoly.ooc.request.bill;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BillDetailRequest {

    private Long billDetailId;

    private Long billId;

    private Long productDetailId;

    private BigDecimal price;

    private Integer quantity;

    private String note;

    private String status;

}
