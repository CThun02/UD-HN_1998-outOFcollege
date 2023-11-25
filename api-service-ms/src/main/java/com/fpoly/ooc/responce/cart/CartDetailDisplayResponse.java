package com.fpoly.ooc.responce.cart;


import com.fpoly.ooc.responce.product.ProductImageResponse;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartDetailDisplayResponse {

    private CartDetailResponse cartDetailResponse;

    private List<PromotionProductResponse> promotion;

    private List<ProductImageResponse> productImageResponse;

}
