package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.VoucherAndPromotionConditionDTO;
import com.fpoly.ooc.request.voucher.DisplayVoucherRequest;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.service.interfaces.VoucherService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/admin/vouchers")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/")
    public ResponseEntity<?> findAllVoucher(@RequestBody VoucherAndPromotionConditionDTO voucherConditionDTO) {
        return ResponseEntity.ok()
                .body(voucherService.findAllVoucher(voucherConditionDTO));
    }

    @PostMapping("/add")
    public ResponseEntity<?> createVoucher(@Valid @RequestBody VoucherRequest request) {

        return ResponseEntity.ok().body(voucherService.saveOrUpdate(request));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateVoucher(@Valid @RequestBody VoucherRequest request) {
        return ResponseEntity.ok().body(voucherService.saveOrUpdate(request));
    }

    @PutMapping("/update/{code}")
    public ResponseEntity<?> updateStatus(@PathVariable("code") String code) {
        return ResponseEntity.ok().body(voucherService.updateStatus(code).getVoucherCode());
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> findByCode(@PathVariable("code") String code) {

        return ResponseEntity.ok().body(voucherService.findByVoucherCode(code));
    }

    @GetMapping("/search/{code}")
    public ResponseEntity<?> searchVoucherByCode(@PathVariable("code") String code) {
        return ResponseEntity.ok().body(voucherService.searchVoucherByCode(code));
    }

    @PostMapping("/display-modal-using")
    public ResponseEntity<?> displayModalUsingVoucher(@RequestBody DisplayVoucherRequest request) {
        return ResponseEntity.ok(voucherService.findAllVoucherResponseDisplayModalUsing(request));
    }

}
