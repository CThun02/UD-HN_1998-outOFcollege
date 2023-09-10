package com.fpoly.ooc.responce.product;
import lombok.Builder;

import java.util.List;
@Builder
public class ProductDetailSizeResponse {
    public Long sizeId;
    public String sizeName;
    public List<ProductDetailColorResponse> listColor;
}
