package com.fpoly.ooc.responce;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BillResponse {

    private Long cartId;

    private Long cartDetailId;

    private Integer quantity;

    private String productDetailName;

    private BigDecimal price;

    private String status;

}
