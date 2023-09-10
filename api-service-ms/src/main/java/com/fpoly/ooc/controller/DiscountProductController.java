package com.fpoly.ooc.controller;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ExceptionResponse;
import com.fpoly.ooc.dto.PageDTO;
import com.fpoly.ooc.exception.CustomNotFoundException;
import com.fpoly.ooc.request.promotion.DiscountProductRequest;
import com.fpoly.ooc.service.interfaces.DiscountProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/api/discount-product")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class DiscountProductController {

    @Autowired
    private DiscountProductService discountProductService;

    @GetMapping("/")
    public ResponseEntity<?> findAllDiscountProduct(
            @RequestBody PageDTO pageDTO,
            @RequestParam(value = "idDiscount", defaultValue = "0") Long idDiscount
    ) {

        if(idDiscount == 0) {
            throw new CustomNotFoundException(ExceptionResponse.EXCEPTION_NOT_FOUND);
        }

        return ResponseEntity.ok(
                discountProductService.pageAllDiscount(pageDTO, idDiscount));
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody DiscountProductRequest request) {

        discountProductService.saveOrUpdate(request);
        return ResponseEntity.ok("DONE");
    }

    @PostMapping("/update-product")
    public ResponseEntity<?> updateStatus(@RequestBody DiscountProductRequest request) {

        discountProductService.upateStatusDisountProduct(request);
        return ResponseEntity.ok("DONE");
    }


}
