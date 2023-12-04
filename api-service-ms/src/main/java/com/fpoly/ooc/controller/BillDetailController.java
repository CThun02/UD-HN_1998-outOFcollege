package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin/bill-detail")
public class BillDetailController {

    @Autowired
    private BillDetailService billDetailService;


    @PostMapping("/create-bill-detail")
    public ResponseEntity<?> createdBillDetail(@RequestBody BillDetailRequest request) {
        return ResponseEntity.ok(billDetailService.createBillDetail(request));
    }

    @PutMapping()
    public ResponseEntity<?> updateBillDetail(@RequestBody BillDetailRequest request) throws JsonProcessingException {
        return ResponseEntity.ok(billDetailService.updateBillDetail(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBillDetail(@PathVariable("id") Long id) throws JsonProcessingException {
        return ResponseEntity.ok(billDetailService.deleteBillDetail(id));
    }

}
