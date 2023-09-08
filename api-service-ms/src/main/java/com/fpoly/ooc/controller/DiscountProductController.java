package com.fpoly.ooc.controller;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ExceptionResponse;
import com.fpoly.ooc.exception.CustomNotFoundException;
import com.fpoly.ooc.service.interfaces.DiscountProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/api/discount-product")
public class DiscountProductController {

    @Autowired
    private DiscountProductService discountProductService;

    @GetMapping("/")
    public ResponseEntity<?> findAllDiscountProduct(
            @RequestParam(value = "pageNo", defaultValue = "0") int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize,
            @RequestParam(value = "idDiscount", defaultValue = "0") Long idDiscount
    ) {

        if(idDiscount == 0) {
            throw new CustomNotFoundException(ExceptionResponse.EXCEPTION_NOT_FOUND);
        }

        return ResponseEntity.ok(
                discountProductService.pageAllDiscount(PageRequest.of(pageNo, pageSize), idDiscount));
    }

}
