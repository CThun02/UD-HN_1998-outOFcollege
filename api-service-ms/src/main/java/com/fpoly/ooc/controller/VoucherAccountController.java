package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.VoucherAccountUsedDTO;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.service.interfaces.VoucherAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/voucher-account")
public class VoucherAccountController {

    @Autowired
    private VoucherAccountService voucherAccountService;

    @PostMapping("/create")
    public ResponseEntity<?> createVoucherAccount(@RequestBody VoucherAccountUsedDTO dto) throws NotFoundException {
        return ResponseEntity.ok(voucherAccountService.updateAccountUsed(dto));
    }

    @PutMapping("/update-account-used")
    public ResponseEntity<?> updateStatus(@RequestBody VoucherAccountUsedDTO dto) throws NotFoundException {
        return ResponseEntity.ok(voucherAccountService.updateAccountUsed(dto));
    }

}
