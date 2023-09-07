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
public class CartResponse {

    private Long cartId;

    private Long cartDetailId;

    private Integer quantity;

    private String productDetailName;

    private BigDecimal price;

}
