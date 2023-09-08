package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.DiscountProduct;
import com.fpoly.ooc.request.promotion.DiscountProductRequest;
import com.fpoly.ooc.responce.promition.DiscountProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DiscountProductService {

    List<DiscountProductResponse> findAllDiscount(Long idDiscount);

    Page<DiscountProductResponse> pageAllDiscount(Pageable pageable, Long idDiscount);

    DiscountProduct saveOrUpdate(DiscountProductRequest request);

    void upateStatusDisountProduct(Long idDiscount, List<Long> idProduct);

}
