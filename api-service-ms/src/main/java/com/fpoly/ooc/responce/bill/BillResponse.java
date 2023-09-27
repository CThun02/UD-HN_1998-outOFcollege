package com.fpoly.ooc.responce.bill;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BillResponse {

    private Long billId;

    private Long billDetailId;

    private Long productDetailId;

    private String imgDefault;

    private Integer quantity;

    private String productName;

    private BigDecimal price;

    private String status;

    private LocalDateTime createDate;

}
