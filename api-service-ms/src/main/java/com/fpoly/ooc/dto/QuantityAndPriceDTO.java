package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuantityAndPriceDTO {
    private Long productDetailId;
    private BigDecimal price;
    private Integer quantity;
}
