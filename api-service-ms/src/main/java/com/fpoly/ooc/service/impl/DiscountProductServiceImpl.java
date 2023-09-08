package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.DiscountProduct;
import com.fpoly.ooc.repository.interfaces.DiscountProductRepository;
import com.fpoly.ooc.request.promotion.DiscountProductRequest;
import com.fpoly.ooc.responce.promition.DiscountProductResponse;
import com.fpoly.ooc.service.interfaces.DiscountProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscountProductServiceImpl implements DiscountProductService {

    @Autowired
    private DiscountProductRepository discountProductRepository;

    @Override
    public List<DiscountProductResponse> findAllDiscount(Long idDiscount) {
        return discountProductRepository.findAllDiscountProduct(idDiscount);
    }

    @Override
    public Page<DiscountProductResponse> pageAllDiscount(Pageable pageable, Long idDiscount) {
        return discountProductRepository.pageAllDiscountProduct(idDiscount, pageable);
    }

    @Override
    public DiscountProduct saveOrUpdate(DiscountProductRequest request) {
        return null;
    }

    @Override
    public void upateStatusDisountProduct(Long idDiscount, List<Long> idProduct) {

    }
}
