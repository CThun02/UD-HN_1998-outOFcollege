package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.DeleteProductDetailInPromotionDTO;
import com.fpoly.ooc.dto.PromotionProductDTO;
import com.fpoly.ooc.dto.PromotionProductDetailDTO;
import com.fpoly.ooc.entity.PromotionProduct;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.responce.productdetail.ProductDetailShop;

import java.math.BigDecimal;
import java.util.List;

public interface PromotionProductDetailService {

    PromotionProduct saveOrUpdate(PromotionProductDTO dto);

    void deletePromotionProduct(DeleteProductDetailInPromotionDTO dto) throws NotFoundException;

    PromotionProductDetailDTO findPromotionByProductDetailIds(List<Long> productDetailIdList) throws NotFoundException;

}
