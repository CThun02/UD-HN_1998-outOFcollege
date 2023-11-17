package com.fpoly.ooc.responce.cart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CartDetailResponse {

    private Long productId;

    private Long productDetailId;

    private String productName;

    private String brandName;

    private String categoryName;

    private String patternName;

    private String formName;

    private String buttonName;

    private String materialName;

    private String collarName;

    private String sleeveName;

    private String shirtTailName;

    private String sizeName;

    private String colorName;

    private String colorCode;

    private BigDecimal priceProductDetail;

    private Integer quantityProductDetail;

    private Float weight;

    private Integer quantity;

    private Long cartDetailId;

}
