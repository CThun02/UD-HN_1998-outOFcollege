package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteProductDetailInPromotionDTO {

    private Long promotionId;

    private List<Long> productDetailIds;

}
