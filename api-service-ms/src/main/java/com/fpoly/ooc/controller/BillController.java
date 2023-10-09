package com.fpoly.ooc.controller;

import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    private BillDetailService billDetailService;

    @Autowired
    private BillService billService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(billDetailService.getAll());
    }

    @PostMapping()
    public ResponseEntity<?> createBill(@RequestBody(required = false) BillRequest request) {
        return ResponseEntity.ok(billService.createBill(request));
    }

    @GetMapping("/customer")
    public ResponseEntity<?> getListCustomer() {
        return ResponseEntity.ok(billService.getListCustomer());
    }

    @GetMapping("/customer/{username}/address")
    public ResponseEntity<?> getListAddressByUserName(@PathVariable("username") String username) {
        return ResponseEntity.ok(billService.getListAddressByUserName(username));
    }

    @PutMapping()
    public ResponseEntity<?> updateBill() {
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBill(@PathVariable("id") Long id) {
        billService.deleteBill(id);
        return ResponseEntity.ok().body("Xóa thành công");
    }

}
