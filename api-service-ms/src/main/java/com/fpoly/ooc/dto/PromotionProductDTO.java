package com.fpoly.ooc.dto;

import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Promotion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionProductDTO {

    private Long promotionProductId;

    private ProductDetail productDetail;

    private Promotion promotion;

}
