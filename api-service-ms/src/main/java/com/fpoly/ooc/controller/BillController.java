package com.fpoly.ooc.controller;

import com.fpoly.ooc.request.BillRequest;
import com.fpoly.ooc.service.interfaces.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/bill")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private BillService billService;

    @GetMapping("/product")
    public ResponseEntity<?> getAllProduct() {
        return ResponseEntity.ok(billService.getAllProduct());
    }

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(billService.getAll());
    }

    @PostMapping()
    public ResponseEntity<?> createBill(@RequestBody BillRequest request) {
        return ResponseEntity.ok(billService.createBill(request));
    }

    @PutMapping()
    public ResponseEntity<?> updateBill() {
        return ResponseEntity.ok("");
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteBill() {
        return ResponseEntity.ok("");
    }

}
