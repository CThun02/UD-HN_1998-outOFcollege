package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ExceptionResponse;
import com.fpoly.ooc.dto.PageDTO;
import com.fpoly.ooc.entity.Discount;
import com.fpoly.ooc.entity.DiscountProduct;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.exception.CustomNotFoundException;
import com.fpoly.ooc.repository.DiscountProductRepository;
import com.fpoly.ooc.request.promotion.DiscountProductRequest;
import com.fpoly.ooc.responce.promition.DiscountProductResponse;
import com.fpoly.ooc.service.interfaces.DiscountProductService;
import com.fpoly.ooc.service.interfaces.DiscountService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DiscountProductServiceImpl implements DiscountProductService {

    @Autowired
    private DiscountProductRepository discountProductRepository;

    @Autowired
    private ProductDetailServiceI productDetailServiceI;

    @Autowired
    private DiscountService discountService;

    public Page<?> pageable(List<?> list, Pageable pageable) {

        int pageNo = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();
        int startItem = pageNo * pageSize;

        List<?> responseList = null;

        if (list.size() < startItem) {
            responseList = Collections.emptyList();
        } else {
            int toIndex = Math.min(startItem + pageSize, list.size());
            responseList = list.subList(startItem, toIndex);
        }

        return new PageImpl<>(responseList, PageRequest.of(pageNo, pageSize), list.size());
    }

    @Override
    public List<DiscountProductResponse> findAllDiscount(Long idDiscount) {
//        return discountProductRepository.findAllDiscountProduct(idDiscount);
        return null;
    }

    @Override
    public Page<DiscountProductResponse> pageAllDiscount(PageDTO pageDTO, Long idDiscount) {

        List<ProductDetail> productDetails = productDetailServiceI.findProductDetailByIdDiscount(idDiscount).isEmpty() ?
                null : productDetailServiceI.findProductDetailByIdDiscount(idDiscount)
                .stream().map(
                        p -> new ProductDetail(p.getId(), p.getProduct(), p.getPattern(), p.getButton(),
                                p.getMaterial(), p.getCollar(), p.getSleeve(), p.getSize(), p.getColor(),
                                p.getForm(), p.getShirtTail(), p.getPrice(), p.getQuantity(), p.getDescriptionDetail(),
                                p.getStatus(), null)
                ).collect(Collectors.toList());

        List<DiscountProductResponse> list = discountProductRepository.findDiscountProductByDiscountIdId(idDiscount).stream().map(
                e -> new DiscountProductResponse(
                        e.getId(),
                        e.getDiscountId().getDiscountCode(),
                        e.getDiscountId().getDiscountName(),
                        e.getDiscountId().getStartDate(),
                        e.getDiscountId().getEndDate(),
                        e.getDiscountId().getDiscountValue(),
                        e.getDiscountId().getDiscountMaxValue(),
                        e.getDiscountId().getDiscountMethod(),
                        e.getDiscountId().getDiscountCondition(),
                        productDetails
                )
        ).toList();

        return (Page<DiscountProductResponse>) pageable(list, PageRequest.of(pageDTO.getPageNo(), pageDTO.getPageSize()));
    }

    @Override
    public void saveOrUpdate(DiscountProductRequest request) {
        Discount discount = discountService.findDiscountById(request.getIdDiscount());

        request.getIdProductDetail().forEach(e -> {
            DiscountProduct discountProduct = new DiscountProduct();
            discountProduct.setDiscountId(discount);
            discountProduct.setId(request.getIdDiscountProduct().isEmpty() ? null : request.getIdDiscountProduct().get(0));

            if (Objects.isNull(productDetailServiceI.getOne(e))) {
                throw new CustomNotFoundException(ExceptionResponse.EXCEPTION_NOT_FOUND);
            } else {
                discountProduct.setProductDetailId(productDetailServiceI.getOne(e));
            }

            discountProductRepository.save(discountProduct);
        });
    }

    @Override
    public void upateStatusDisountProduct(DiscountProductRequest request) {
        request.getIdDiscountProduct().forEach(
                d -> {
                    Optional<DiscountProduct> discountProductOptional = discountProductRepository.findById(d);

                    if(discountProductOptional.isEmpty()) {
                        throw new CustomNotFoundException(ExceptionResponse.EXCEPTION_NOT_FOUND);
                    } else {
                        discountProductOptional.get().setStatus(Const.DISCOUNT_STATUS_INACTIVE);
                        discountProductRepository.save(discountProductOptional.get());
                    }
                }
        );
    }
}
