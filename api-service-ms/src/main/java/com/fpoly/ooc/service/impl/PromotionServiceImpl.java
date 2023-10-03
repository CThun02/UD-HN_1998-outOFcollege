package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.Promotion;
import com.fpoly.ooc.repository.PromotionRepository;
import com.fpoly.ooc.request.promotion.PromotionRequest;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import com.fpoly.ooc.responce.voucher.VoucherResponse;
import com.fpoly.ooc.service.interfaces.PromotionService;
import com.fpoly.ooc.util.PageUltil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public Page<PromotionProductResponse> pageAll(VoucherAndPromotionConditionDTO voucherAndPromotionConditionDTO,
                                                  Pageable pageable) {

        String status = Objects.isNull(voucherAndPromotionConditionDTO.getStatus()) ?
                null : voucherAndPromotionConditionDTO.getStatus().equalsIgnoreCase("ALL") ?
                null : voucherAndPromotionConditionDTO.getStatus();

        return (Page<PromotionProductResponse>) PageUltil.page(
                promotionRepository.findAllPromotionProduct(
                        Objects.isNull(voucherAndPromotionConditionDTO.getCodeOrName())
                                ? null : "%" + voucherAndPromotionConditionDTO.getCodeOrName() + "%",
                        Objects.isNull(voucherAndPromotionConditionDTO.getStartDate())
                                ? null : voucherAndPromotionConditionDTO.getStartDate(),
                        Objects.isNull(voucherAndPromotionConditionDTO.getEndDate())
                                ? null : voucherAndPromotionConditionDTO.getEndDate(),
                        status
                ), pageable);
    }

    @Override
    public Promotion saveOrUpdate(PromotionRequest promotionRequest) {
        return null;
    }

    @Override
    public Promotion updateStatus(Long id) {
        return null;
    }

    private Promotion promotion(PromotionRequest request) {
        Promotion promotion = new Promotion();
        return promotion;
    }

}
