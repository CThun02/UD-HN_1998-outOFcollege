package com.fpoly.ooc.controller;

import com.fpoly.ooc.request.product.ProductReturnRequest;
import com.fpoly.ooc.service.interfaces.ProductReturnServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/admin/product-return")
public class ProductReturnController {
    @Autowired
    ProductReturnServiceI service;

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody ProductReturnRequest request){
        return ResponseEntity.ok(service.create(request));
    }
}
