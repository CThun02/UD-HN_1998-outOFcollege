package com.fpoly.ooc.responce.promotion;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PromotionProductResponse {

    private String promotionCode;

    private String promotionName;

    private Integer productQuantity;

    private String promotionMethod;

    private BigDecimal promotionValue;

    private BigDecimal promotionCondition;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime startDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime endDate;

    private String status;

    public PromotionProductResponse(String promotionCode, String promotionName, Integer productQuantity,
                                    String promotionMethod, BigDecimal promotionValue, BigDecimal promotionCondition,
                                    LocalDateTime startDate, LocalDateTime endDate, String status) {
        this.promotionCode = promotionCode;
        this.promotionName = promotionName;
        this.productQuantity = productQuantity;
        this.promotionMethod = promotionMethod;
        this.promotionValue = promotionValue;
        this.promotionCondition = promotionCondition;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}
