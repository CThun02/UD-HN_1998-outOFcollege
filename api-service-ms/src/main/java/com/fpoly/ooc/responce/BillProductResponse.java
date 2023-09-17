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
public class BillProductResponse {

    private Long productId;

    private Long productDetailId;

    private String imgDefault;

    private String productName;

    private String sizeName;

    private String colorName;

    private BigDecimal price;

    private Integer quantity;

}
