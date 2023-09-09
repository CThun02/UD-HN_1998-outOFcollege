package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.PageDTO;
import com.fpoly.ooc.entity.DiscountProduct;
import com.fpoly.ooc.request.promotion.DiscountProductRequest;
import com.fpoly.ooc.responce.promition.DiscountProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DiscountProductService {

    List<DiscountProductResponse> findAllDiscount(Long idDiscount);

    Page<DiscountProductResponse> pageAllDiscount(PageDTO pageDTO, Long idDiscount);

    void saveOrUpdate(DiscountProductRequest request);

    void upateStatusDisountProduct(DiscountProductRequest request);

}
