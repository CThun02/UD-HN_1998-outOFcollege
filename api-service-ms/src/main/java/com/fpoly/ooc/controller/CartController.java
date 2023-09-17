package com.fpoly.ooc.controller;

import com.fpoly.ooc.request.CartRequest;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartDetailService cartDetailService;

    @GetMapping()
    public ResponseEntity<?> getALl() {
        return ResponseEntity.ok(cartDetailService.getAll());
    }

    @PostMapping("")
    public ResponseEntity<?> createCart(@RequestBody CartRequest request) {
        return ResponseEntity.ok(cartDetailService.createCartDetail(request));
    }

}
