package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.Promotion;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.promotion.PromotionRequest;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PromotionService {

    List<PromotionProductResponse> pageAll(VoucherAndPromotionConditionDTO voucherAndPromotionConditionDTO);

    Promotion saveOrUpdate(PromotionRequest promotionRequest) throws NotFoundException;

    Promotion updateStatus(Long id);

    PromotionRequest findByIdProductDetail(String promotionCode) throws NotFoundException;

    Promotion findByCode(String code) throws NotFoundException;

    Promotion findById(Long id) throws NotFoundException;

    Promotion updateStatus(String code) throws NotFoundException;

    Promotion updateStatus(String code, String status) throws NotFoundException;

    List<PromotionProductResponse> findAllPromotionProductResponse();

    List<PromotionProductResponse> getPromotionByProductDetailId(Long pdId, String status);


}
