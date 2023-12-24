package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin/bill-detail")
public class BillDetailController {

    @Autowired
    private BillDetailService billDetailService;


    @PostMapping("/create-bill-detail")
    public ResponseEntity<?> createdBillDetail(@RequestBody BillDetailRequest request) throws JsonProcessingException, NotFoundException {
        BillDetail billDetail = billDetailService.createBillDetail(request);
        request.setBillDetailId(billDetail.getId());
        return ResponseEntity.ok("ok");
    }

    @PutMapping()
    public ResponseEntity<?> updateBillDetail(@RequestBody BillDetailRequest request) throws JsonProcessingException, NotFoundException {
        return ResponseEntity.ok(billDetailService.updateBillDetail(request));
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteBillDetail(@RequestParam("billId") Long billId,
                                              @RequestParam("billDetailId") Long billDetailId) throws JsonProcessingException, NotFoundException {
        return ResponseEntity.ok(billDetailService.deleteBillDetail(billId, billDetailId));
    }

}
