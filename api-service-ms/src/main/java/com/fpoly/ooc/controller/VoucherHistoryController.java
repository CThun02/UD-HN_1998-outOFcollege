package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.VoucherHistorySaveDTO;
import com.fpoly.ooc.service.interfaces.VoucherHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/voucher-history")
public class VoucherHistoryController {

    @Autowired
    private VoucherHistoryService voucherHistoryService;

    @PostMapping("/create")
    public ResponseEntity<?> addVoucherHistory(@RequestBody VoucherHistorySaveDTO dto) {
        return ResponseEntity.ok(voucherHistoryService.save(dto));
    }

}
