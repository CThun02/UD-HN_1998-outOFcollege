package com.fpoly.ooc.responce;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductDetailResponse {

    private Long productDetailId;

    private String productName;

    private String imgDefault;

    private BigDecimal price;

    private Integer quantity;

}
