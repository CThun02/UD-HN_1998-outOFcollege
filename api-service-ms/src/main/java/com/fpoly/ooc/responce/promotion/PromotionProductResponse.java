package com.fpoly.ooc.responce.promotion;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionProductResponse {

    private String promotionCode;

    private String promotionName;

    private Integer productQuantity;

    private String promotionMethod;

    private BigDecimal promotionValue;

    private BigDecimal promotionValueMax;

    private String promotionCondition;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String status;

}
