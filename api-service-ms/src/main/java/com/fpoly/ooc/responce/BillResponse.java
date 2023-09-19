package com.fpoly.ooc.responce;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BillResponse {

    private Long billId;

    private Long billDetailId;

    private Long productDetailId;

    private Integer quantity;

    private String productDetailName;

    private BigDecimal price;

    private String status;

    private Date createDate;

}