package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.PromotionProductDTO;
import com.fpoly.ooc.entity.PromotionProduct;
import com.fpoly.ooc.request.promotion.PromotionRequest;

public interface PromotionProductDetailService {

    PromotionProduct saveOrUpdate(PromotionProductDTO dto);

    void deletePromotionProduct(Long idPromotion, Long idProductDetail);

}
