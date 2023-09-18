package com.fpoly.ooc.responce.cart;

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

    private Long productDetailId;

    private String imgDefault;

    private String productName;

    private String sizeName;

    private String colorName;

    private BigDecimal price;

    private Integer quantity;

}
