package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Voucher;
import com.fpoly.ooc.request.voucher.VoucherRequest;
import com.fpoly.ooc.service.interfaces.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @GetMapping("/find-all")
    public ResponseEntity<?> findAllVoucher(
            @RequestParam(value = "pageNo", defaultValue = "0") int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "5") int pageSize
    ) {

        return ResponseEntity.ok(
                voucherService.pageAllVoucher(PageRequest.of(pageNo, pageSize)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {

        voucherService.delete(id);

        VoucherRequest voucherRequest = voucherService.findVoucherById(id);

        return ResponseEntity.ok(voucherRequest != null ? "Delete Done" : "Error");
    }

    @PutMapping("/save")
    public ResponseEntity<?> updateVoucher(@RequestBody VoucherRequest request) {

        return ResponseEntity.ok(voucherService.saveOrUpdate(request));
    }

    @PostMapping("/save")
    public ResponseEntity<?> addVoucher(@RequestBody VoucherRequest request) {

        return ResponseEntity.ok(voucherService.saveOrUpdate(request));
    }

}
