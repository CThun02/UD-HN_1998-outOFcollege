package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.PromotionProductDTO;
import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Promotion;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.PromotionRepository;
import com.fpoly.ooc.request.promotion.PromotionRequest;
import com.fpoly.ooc.responce.promotion.PromotionProductResponse;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.ProductServiceI;
import com.fpoly.ooc.service.interfaces.PromotionProductDetailService;
import com.fpoly.ooc.service.interfaces.PromotionService;
import com.fpoly.ooc.util.PageUltil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private ProductDetailServiceI productDetailService;

    @Autowired
    private ProductServiceI productServiceI;

    @Autowired
    private PromotionProductDetailService promotionProductDetailService;

    @Override
    public List<PromotionProductResponse> pageAll(VoucherAndPromotionConditionDTO voucherAndPromotionConditionDTO) {

        String status = Objects.isNull(voucherAndPromotionConditionDTO.getStatus()) ?
                null : voucherAndPromotionConditionDTO.getStatus().equalsIgnoreCase("ALL") ?
                null : voucherAndPromotionConditionDTO.getStatus();

        return promotionRepository.findAllPromotionProduct(
                Objects.isNull(voucherAndPromotionConditionDTO.getCodeOrName())
                        ? null : "%" + voucherAndPromotionConditionDTO.getCodeOrName() + "%",
                Objects.isNull(voucherAndPromotionConditionDTO.getStartDate())
                        ? null : voucherAndPromotionConditionDTO.getStartDate(),
                Objects.isNull(voucherAndPromotionConditionDTO.getEndDate())
                        ? null : voucherAndPromotionConditionDTO.getEndDate(),
                status
        );
    }

    @Transactional
    @Override
    public Promotion saveOrUpdate(PromotionRequest promotionRequest) {
        Promotion promotion = promotionRepository.save(promotion(promotionRequest));

        for (Long id : promotionRequest.getProductDetailIds()) {
            ProductDetail productDetail = productDetailService.findById(id);
            PromotionProductDTO dto = new PromotionProductDTO();
            dto.setPromotion(promotion);
            dto.setProductDetail(productDetail);
            dto.setPromotionProductId(promotionRequest.getPromotionProductId());

            promotionProductDetailService.saveOrUpdate(dto);
        }

        return promotion;
    }

    @Override
    public Promotion updateStatus(Long id) {
        return null;
    }

    @Override
    public PromotionRequest findByIdProductDetail(String promotionCode) {
        Promotion promotion = findByCode(promotionCode);
        log.info("promotionRequest: " + promotion);

        PromotionRequest promotionRequest = new PromotionRequest();
        log.info("promotionRequest: " + promotionRequest);

        promotionRequest.setPromotionId(promotion.getId());
        promotionRequest.setPromotionCode(promotion.getPromotionCode());
        promotionRequest.setPromotionName(promotion.getPromotionName());
        promotionRequest.setPromotionMethod(promotion.getPromotionMethod());
        promotionRequest.setPromotionValue(promotion.getPromotionValue());
        promotionRequest.setStartDate(promotion.getStartDate());
        promotionRequest.setEndDate(promotion.getEndDate());
        promotionRequest.setStatus(promotion.getStatus());

        promotionRequest.setProductDetailIds(productDetailService.findAllIdsResponseProductDetails(promotion.getId()));
        promotionRequest.setProductIdsResponse(productServiceI.findIdsProductsByIdPromotion(promotion.getId()));
        return promotionRequest;
    }

    @Override
    public Promotion findByCode(String code) {
        log.info("PromotionCode: " + code);
        return promotionRepository
                .findPromotionByPromotionCode(code)
                .orElseThrow(
                        () -> new NotFoundException(ErrorCodeConfig.getFormatMessage(Const.CODE_NOT_FOUND)));
    }

    @Override
    public Promotion findById(Long id) {
        return promotionRepository.findById(id).orElseThrow(
                () -> new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));
    }

    @Override
    public Promotion updateStatus(String code) {
        Promotion promotion = findByCode(code);

        promotion.setStatus(Const.STATUS_CANCEL);
        promotion.setDeletedAt(LocalDateTime.now());

        return promotionRepository.save(promotion);
    }

    @Override
    public Promotion updateStatus(String code, String status) {
        Promotion promotion = findByCode(code);

        promotion.setStatus(status);

        return promotionRepository.save(promotion);
    }

    @Override
    public List<PromotionProductResponse> findAllPromotionProductResponse() {
        return promotionRepository.findAllPromotionProductNoCondition();
    }

    @Override
    public List<PromotionProductResponse> getPromotionByProductDetailId(Long pdId, String status) {
        return promotionRepository.getPromotionByProductDetailId(pdId, status);
    }

    private Promotion promotion(PromotionRequest request) {
        Promotion promotionDb = null;
        if(request.getPromotionId() != null) {
            promotionDb = promotionRepository.findById(request.getPromotionId()).orElse(null);
        }

        Promotion promotion = new Promotion();

        if (StringUtils.isBlank(request.getPromotionName())) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.PROMOTION_NAME_NOT_FOUND), "promotionName");
        }

        if (StringUtils.isBlank(request.getPromotionMethod())) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.PROMOTION_METHOD_NOT_FOUND), "promotionMethod");
        }

        if (StringUtils.isEmpty(String.valueOf(request.getPromotionMethod()))) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.PROMOTION_VALUE_NOT_FOUND), "promotionMethod");
        }

        if (StringUtils.isEmpty(String.valueOf(request.getStartDate()))) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.START_DATE_NOT_FOUND), "startDate");
        }

        if (StringUtils.isEmpty(String.valueOf(request.getEndDate()))) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.END_DATE_NOT_FOUND), "endDate");
        }

        Double promotionValue = convertBigDecimal(request.getPromotionValue());
        Double promotionValueMax = convertBigDecimal(request.getPromotionValueMax());
        switch (request.getPromotionMethod()) {
            case "vnd":
                if (StringUtils.isEmpty(String.valueOf(promotionValue))) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_VALUE_EMPTY), "promotionValue");
                }
                break;
            case "%":
                if (StringUtils.isEmpty(String.valueOf(promotionValue)) || promotionValue > 100 || promotionValue < 1) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_VALUE_EMPTY), "promotionValue");
                }

                if (StringUtils.isEmpty(String.valueOf(promotionValueMax))) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.VOUCHER_VALUE_MAX_EMPTY), "promotionValueMax");
                }
                break;
            default:
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.PROMOTION_METHOD_NOT_FOUND), "promotionMethod");
        }

        LocalDateTime dateNow = LocalDateTime.now();
        switch (request.getStatus()) {
            case "":
            case "UPCOMING":

                if (dateNow.isAfter(request.getStartDate()) && dateNow.isAfter(request.getEndDate())) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.DATE_LESS_NOW), "date");
                } else {
                    if (dateNow.isAfter(request.getStartDate())) {
                        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.START_DATE_LESS_DATE_NOW), "startDate");
                    }

                    if (dateNow.isAfter(request.getEndDate())) {
                        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.END_DATE_LESS_DATE_NOW), "endDate");
                    }
                }

                if (request.getStartDate().isAfter(request.getEndDate())) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.END_DATE_LESS_START_DATE), "endDate");
                }

                promotion.setStatus(Const.STATUS_UPCOMING);
                break;
            case "ACTIVE":
                if (request.getStartDate().isAfter(request.getEndDate())) {
                    throw new NotFoundException(ErrorCodeConfig.getMessage(Const.END_DATE_LESS_START_DATE), "endDate");
                }
                promotion.setStatus(Const.STATUS_ACTIVE);
                break;
            default:
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.STATUS_INVALID), "status");
        }

        promotion.setId(
                StringUtils.isEmpty(String.valueOf(request.getPromotionId())) ? null : request.getPromotionId()
        );
        promotion.setPromotionCode(
                StringUtils.isEmpty(request.getPromotionCode()) ? generatorCode() : request.getPromotionCode()
        );
        promotion.setPromotionName(request.getPromotionName());
        promotion.setPromotionMethod(request.getPromotionMethod());
        promotion.setPromotionValue(request.getPromotionValue());
        promotion.setEndDate(request.getEndDate());
        promotion.setStartDate(request.getStartDate());

        if (Objects.nonNull(promotionDb)) {
            promotion.setStartDate(promotionDb.getStartDate());
        }

        return promotion;
    }

    private Double convertBigDecimal(BigDecimal bigDecimal) {

        if (bigDecimal == null) {
            return null;
        }

        return Double.valueOf(String.valueOf(bigDecimal));
    }

    private String generatorCode() {
        return RandomStringUtils.random(15, true, true).toUpperCase();
    }



}
