package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.VoucherHistorySaveDTO;
import com.fpoly.ooc.entity.VoucherHistory;
import com.fpoly.ooc.service.interfaces.VoucherHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/voucher-history")
public class VoucherHistoryController {

    @Autowired
    private VoucherHistoryService voucherHistoryService;

    @PostMapping("/create")
    public ResponseEntity<?> addVoucherHistory(@RequestBody VoucherHistorySaveDTO dto) {
        return ResponseEntity.ok(voucherHistoryService.save(dto));
    }

    @GetMapping("/getVoucherByBillCode")
    public ResponseEntity<?> getVoucherByBillCode(@RequestParam String billCode) {
        VoucherHistory voucherHistory = voucherHistoryService.findHistoryByBillCode(billCode);
        return ResponseEntity.ok(voucherHistory != null ?voucherHistory.getVoucherCode():null);
    }

}
