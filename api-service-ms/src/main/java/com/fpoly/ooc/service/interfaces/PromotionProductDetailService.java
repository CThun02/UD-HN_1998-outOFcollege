package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.DeleteProductDetailInPromotionDTO;
import com.fpoly.ooc.dto.PromotionProductDTO;
import com.fpoly.ooc.entity.PromotionProduct;
import com.fpoly.ooc.request.promotion.PromotionRequest;

import java.util.List;

public interface PromotionProductDetailService {

    PromotionProduct saveOrUpdate(PromotionProductDTO dto);

    void deletePromotionProduct(DeleteProductDetailInPromotionDTO dto);

}
