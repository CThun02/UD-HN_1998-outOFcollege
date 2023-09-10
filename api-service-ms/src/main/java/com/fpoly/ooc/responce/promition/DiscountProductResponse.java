package com.fpoly.ooc.responce.promition;

import com.fpoly.ooc.entity.DiscountProduct;
import com.fpoly.ooc.entity.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscountProductResponse {

    private Long id;

    private String discountCode;

    private String discountName;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private BigDecimal discountValue;

    private BigDecimal discountMaxValue;

    private String discountMethod;

    private BigDecimal discountCondition;

    private List<ProductDetail> discountProductList;

}
