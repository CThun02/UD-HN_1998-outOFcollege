package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.Promotion;
import com.fpoly.ooc.request.promotion.PromotionRequest;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PromotionService {

    Page<PromotionProductResponse> pageAll(VoucherAndPromotionConditionDTO voucherAndPromotionConditionDTO,
                                           Pageable pageable);

    Promotion saveOrUpdate(PromotionRequest promotionRequest);

    Promotion updateStatus(Long id);

    PromotionRequest findByIdProductDetail(String promotionCode);

    Promotion findByCode(String code);

    Promotion findById(Long id);

    Promotion updateStatus(String code);

    Promotion updateStatus(String code, String status);

    List<PromotionProductResponse> findAllPromotionProductResponse();

}
