package com.fpoly.ooc.dto;

import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateQuantityProductDetailDTO {
    // field update quantity
    private ProductDetail productDetail;
    private Integer quantityCurrent;
    private Integer quantityUpdate;
    private Boolean isEditProductTimeLine;

    // TODO: return list filter
    private ProductDetailRequest request;
    private BigDecimal min;
    private BigDecimal maxPrice;
}
