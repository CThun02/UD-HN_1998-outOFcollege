package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDetailRequestDTO {
    private String username;
    private BigDecimal price;
    private BigDecimal priceReduce;
    private Integer quantity;
    private Long productDetailId;
}
