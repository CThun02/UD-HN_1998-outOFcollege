package com.fpoly.ooc.responce.product;

import com.fpoly.ooc.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPromotionResponse {

    private Long productId;

    private String productName;

    private String imageDefault;

    private Long sellQuantity;

    private BigDecimal minPrice;

    private BigDecimal maxPrice;

    private Long quantityProduct;

}
