package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Discount;
import com.fpoly.ooc.request.promotion.DiscountRequest;
import com.fpoly.ooc.responce.promition.DiscountResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DiscountService {

    List<DiscountResponse> findAllDiscount();

    Page<DiscountResponse> pageAllDiscount(Pageable pageable);

    DiscountRequest findDiscountById(Long id);

    Discount saveOrUpdate(DiscountRequest request);

    Discount updateStatusDiscount(Long id);

}
