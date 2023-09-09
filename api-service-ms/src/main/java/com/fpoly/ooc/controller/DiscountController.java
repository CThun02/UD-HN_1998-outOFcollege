package com.fpoly.ooc.controller;

import com.fpoly.ooc.request.promotion.DiscountRequest;
import com.fpoly.ooc.service.interfaces.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/api/promition")
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @GetMapping("/")
    public ResponseEntity<?> findAllDiscount(
            @RequestParam(value = "pageNo", defaultValue = "0") int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {

        return ResponseEntity.ok(discountService.pageAllDiscount(PageRequest.of(pageNo, pageSize)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findDiscountById(@PathVariable("id") Long id) {

        DiscountRequest discountRequest = discountService.findDiscountRequestById(id);

        return ResponseEntity.ok(discountRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDiscountById(@PathVariable("id") Long id) {

        return ResponseEntity.ok(discountService.updateStatusDiscount(id));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateDiscount(@RequestBody DiscountRequest request) {

        return ResponseEntity.ok(discountService.saveOrUpdate(request));
    }

    @PostMapping("/save")
    public ResponseEntity<?> addDiscount(@RequestBody DiscountRequest request) {

        return ResponseEntity.ok(discountService.saveOrUpdate(request));
    }

}

