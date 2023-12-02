package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.request.product.ProductReturnRequest;
import com.fpoly.ooc.service.interfaces.ProductReturnServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RequestMapping("/api/admin/product-return")
public class ProductReturnController {
    @Autowired
    ProductReturnServiceI service;

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody ProductReturnRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping("/getProductReturnByDateAndReason")
    public ResponseEntity<?> getProductReturnByDateAndReason(
            @RequestParam String day,
            @RequestParam String dayTo,
            @RequestParam(defaultValue = "PRODUCE") String reason
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        LocalDateTime dateFrom = LocalDateTime.parse(day, formatter);
        LocalDateTime dateTo = LocalDateTime.parse(dayTo, formatter);
        return ResponseEntity.ok(service.getProductReturnByDateAndReason(dateFrom, dateTo.plusDays(1), reason));
    }
}
