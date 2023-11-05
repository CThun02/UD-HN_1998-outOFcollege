package com.fpoly.ooc.request.productDetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetSizeAndColorRequest {
    private Long colorId;
    private Long sizeId;
    private Long productId;
    private Long productDetailId;
    private Long brandId;
    private Long categoryId;
    private Long patternId;
    private Long formId;
    private Long buttonId;
    private Long materialId;
    private Long collarId;
    private Long sleeveId;
    private Long shirtTailId;
}
