package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.DeleteProductDetailInPromotionDTO;
import com.fpoly.ooc.dto.PromotionProductDTO;
import com.fpoly.ooc.entity.PromotionProduct;

import java.math.BigDecimal;
import java.util.List;

public interface PromotionProductDetailService {

    PromotionProduct saveOrUpdate(PromotionProductDTO dto);

    void deletePromotionProduct(DeleteProductDetailInPromotionDTO dto);

}
