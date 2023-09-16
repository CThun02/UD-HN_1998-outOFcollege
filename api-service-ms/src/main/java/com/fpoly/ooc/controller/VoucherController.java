package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.VoucherConditionDTO;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.service.interfaces.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/api/voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping("/")
    public ResponseEntity<?> findAllVoucher(
            @RequestParam(value = "pageNo",defaultValue = "0") int pageNo,
            @RequestParam(value = "pageSize",defaultValue = "10") int pageSize,
            @RequestBody VoucherConditionDTO voucherConditionDTO
            ) {
        return ResponseEntity.ok()
                .body(voucherService.findAllVoucher(PageRequest.of(pageNo, pageSize), voucherConditionDTO));
    }

    @PostMapping("/add")
    public ResponseEntity<?> createVoucher(@RequestBody VoucherRequest request) {

        return ResponseEntity.ok().body(voucherService.saveOrUpdate(request));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateVoucher(@RequestBody VoucherRequest request) {

        return ResponseEntity.ok().body(voucherService.saveOrUpdate(request));
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable("id") Long id) {

        return ResponseEntity.ok().body(voucherService.updateStatus(id));
    }

}
