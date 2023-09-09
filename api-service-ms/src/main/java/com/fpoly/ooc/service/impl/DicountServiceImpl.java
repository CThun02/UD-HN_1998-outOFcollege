package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ExceptionResponse;
import com.fpoly.ooc.entity.Discount;
import com.fpoly.ooc.exception.CustomNotFoundException;
import com.fpoly.ooc.repository.DiscountRepository;
import com.fpoly.ooc.request.promotion.DiscountRequest;
import com.fpoly.ooc.responce.promition.DiscountResponse;
import com.fpoly.ooc.service.interfaces.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DicountServiceImpl implements DiscountService {

    @Autowired
    private DiscountRepository discountRepository;

    @Override
    public List<DiscountResponse> findAllDiscount() {
        return discountRepository.findAllDiscount();
    }

    @Override
    public Page<DiscountResponse> pageAllDiscount(Pageable pageable) {
        return discountRepository.pageAllDiscount(pageable);
    }

    @Override
    public DiscountRequest findDiscountRequestById(Long id) {

        Optional<Discount> discountOptional = discountRepository.findById(id);

        if (discountOptional.isEmpty()) {
            throw new CustomNotFoundException(ExceptionResponse.EXCEPTION_NOT_FOUND);
        }

        return DiscountRequest.builder()
                .id(discountOptional.get().getId())
                .discountCode(discountOptional.get().getDiscountCode())
                .discountName(discountOptional.get().getDiscountName())
                .discountMethod(discountOptional.get().getDiscountMethod())
                .discountValue(discountOptional.get().getDiscountValue())
                .discountMaxValue(discountOptional.get().getDiscountMaxValue())
                .startDate(discountOptional.get().getStartDate())
                .endDate(discountOptional.get().getEndDate())
                .discountCondition(discountOptional.get().getDiscountCondition())
                .build();
    }

    @Override
    public Discount findDiscountById(Long id) {

        Optional<Discount> discountOptional = discountRepository.findById(id);

        if(discountOptional.isEmpty()) {
            throw new RuntimeException(ExceptionResponse.EXCEPTION_NOT_FOUND);
        }

        return discountOptional.get();
    }

    @Override
    public Discount saveOrUpdate(DiscountRequest request) {

        Discount discount = Discount.builder()
                .id(request.getId())
                .discountCode(request.getDiscountCode())
                .discountName(request.getDiscountName())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .discountValue(request.getDiscountValue())
                .discountMaxValue(request.getDiscountMaxValue())
                .discountCondition(request.getDiscountCondition())
                .discountMethod(request.getDiscountMethod())
                .build();

        return discountRepository.save(discount);
    }

    @Override
    public Discount updateStatusDiscount(Long id) {

        Optional<Discount> discountOptional = discountRepository.findById(id);

        if (discountOptional.isEmpty()) {
            throw new CustomNotFoundException(ExceptionResponse.EXCEPTION_NOT_FOUND);
        }

        Discount discount = discountOptional.get();
        discount.setStatus(Const.DISCOUNT_STATUS_INACTIVE);

        return discountRepository.save(discount);
    }

}
