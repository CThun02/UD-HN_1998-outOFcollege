package com.fpoly.ooc.request.promotion;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class DiscountProductRequest {

    private Long idDiscountProduct;

    private Long idDiscount;

    private List<Long> idProductDetail;

}
