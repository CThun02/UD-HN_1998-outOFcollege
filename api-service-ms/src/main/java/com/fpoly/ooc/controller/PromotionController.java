package com.fpoly.ooc.controller;

import com.fpoly.ooc.request.promotion.PromotionRequest;
import com.fpoly.ooc.service.interfaces.PromotionService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/promotion/")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @PostMapping("save")
    public ResponseEntity<?> save(@RequestBody PromotionRequest request) {
        System.out.println("requeststtt: " + request);
        return ResponseEntity.ok(promotionService.saveOrUpdate(request));
    }

    @GetMapping("{code}")
    public ResponseEntity<?> findByCode(@PathVariable("code") String code) {
        return ResponseEntity.ok(promotionService.findByIdProductDetail(code));
    }

    @GetMapping("update-status/{code}")
    public ResponseEntity<?> updateStatus(@PathVariable("code") String code) {

        return ResponseEntity.ok(promotionService.updateStatus(code).getPromotionCode());
    }

}
