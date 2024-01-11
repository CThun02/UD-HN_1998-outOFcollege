package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
public class PromotionProductDetailDTO {
    private BigDecimal promotionValue;
    private String promotionMethod;
    private BigDecimal promotionValueVND;

    public PromotionProductDetailDTO() {
    }

    public PromotionProductDetailDTO(BigDecimal promotionValue, String promotionMethod, Object promotionValueVND) {
        this.promotionValue = promotionValue;
        this.promotionMethod = promotionMethod;
        this.promotionValueVND = new BigDecimal(String.valueOf(promotionValueVND));
    }
}
