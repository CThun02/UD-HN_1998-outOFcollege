package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.DeleteProductDetailInPromotionDTO;
import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.entity.PromotionProduct;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.service.interfaces.PromotionProductDetailService;
import com.fpoly.ooc.service.interfaces.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/promotion-product")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class PromotionProductController {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private PromotionProductDetailService promotionProductDetailService;

    @PostMapping("/")
    public ResponseEntity<?> findAll(@RequestBody VoucherAndPromotionConditionDTO voucherAndPromotionConditionDTO) {

        return ResponseEntity.ok(promotionService
                .pageAll(voucherAndPromotionConditionDTO));
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteByIdPromotionAndIdProductDetail(
            @RequestBody DeleteProductDetailInPromotionDTO dto) throws NotFoundException {
        promotionProductDetailService.deletePromotionProduct(dto);

        return ResponseEntity.ok("Done");
    }

}
