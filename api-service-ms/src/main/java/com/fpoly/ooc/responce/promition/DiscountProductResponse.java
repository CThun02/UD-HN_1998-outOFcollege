package com.fpoly.ooc.responce.promition;

import com.fpoly.ooc.entity.ProductDetail;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class DiscountProductResponse {

    private Long id;

    private String discountCode;

    private String discountName;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private BigDecimal discountMaxValue;

    private String discountMethod;

    private String discountCondition;

    private Integer quantityProductInDiscount;

    private List<ProductDetail> productDetailList;

}
