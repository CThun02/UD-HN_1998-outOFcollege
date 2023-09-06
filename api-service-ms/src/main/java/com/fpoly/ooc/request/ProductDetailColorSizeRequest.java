package com.fpoly.ooc.request;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class ProductDetailColorSizeRequest {
    private String colorId;
    private Long sizeId;
    private Integer quantity;
    private BigDecimal price;

}
