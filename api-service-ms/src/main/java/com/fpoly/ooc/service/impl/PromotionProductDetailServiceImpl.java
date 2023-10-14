package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.DeleteProductDetailInPromotionDTO;
import com.fpoly.ooc.dto.PromotionProductDTO;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.entity.Promotion;
import com.fpoly.ooc.entity.PromotionProduct;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.PromotionProductDetailRepository;
import com.fpoly.ooc.service.interfaces.PromotionProductDetailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@Slf4j
public class PromotionProductDetailServiceImpl implements PromotionProductDetailService {

    @Autowired
    private PromotionProductDetailRepository promotionProductDetailRepository;

    @Override
    @Transactional
    public PromotionProduct saveOrUpdate(PromotionProductDTO dto) {
        log.info("value: " + dto);

        PromotionProduct promotionProduct = validation(dto);

        if(promotionProduct == null) {
            return null;
        }

        return promotionProductDetailRepository.save(promotionProduct);
    }

    @Override
    public void deletePromotionProduct(DeleteProductDetailInPromotionDTO dto) {
        List<Long> ids = promotionProductDetailRepository.findIdPromotionProduct(dto.getProductDetailIds(), dto.getPromotionId());

        if(ids == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND));
        }

        for (Long id: ids) {
            promotionProductDetailRepository.deleteById(id);
        }
    }

    private PromotionProduct validation(PromotionProductDTO dto) {

        if (promotionProductDetailRepository.isCheckProductDetailInPromotion(dto.getProductDetail().getId(), dto.getPromotion().getId())) {
            return null;
        }

        PromotionProduct promotionProduct = new PromotionProduct();

        promotionProduct.setId(dto.getPromotionProductId());
        promotionProduct.setProductDetailId(dto.getProductDetail());
        promotionProduct.setPromotion(dto.getPromotion());
        promotionProduct.setPercentReduce(
                dto.getPromotion().getPromotionMethod().equals("%")
                        ? dto.getPromotion().getPromotionValue() : null
        );
        promotionProduct.setMoneyReduce(dto.getPromotion().getPromotionValue());
        promotionProduct.setMethodReduce(dto.getPromotion().getPromotionMethod());
        promotionProduct.setMoneyAfter(caculatorPrice(dto.getProductDetail(), dto.getPromotion()));

        return promotionProduct;
    }

    private BigDecimal caculatorPrice(ProductDetail productDetail, Promotion promotion) {

        Double priceProduct = convertBigDecimal(productDetail.getPrice());
        Double promotionValue = convertBigDecimal(promotion.getPromotionValue());
        Double promotionValueMax = convertBigDecimal(promotion.getPromotionMaxValue());
        Double valuePercent = (priceProduct * promotionValue) / 100;
        double moneyAfter = 0d;

        if (promotion.getPromotionMethod().equals("%")) {
            if (valuePercent > promotionValueMax) {
                moneyAfter = priceProduct - promotionValueMax;
            } else {
                moneyAfter = priceProduct - valuePercent;
            }
        } else {
            moneyAfter = priceProduct - promotionValue;
        }

        return new BigDecimal(moneyAfter);
    }

    private Double convertBigDecimal(BigDecimal bigDecimal) {

        if (bigDecimal == null) {
            return null;
        }

        return Double.valueOf(String.valueOf(bigDecimal));
    }

}
