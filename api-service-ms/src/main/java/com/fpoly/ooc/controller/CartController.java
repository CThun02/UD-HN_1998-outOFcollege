package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Cart;
import com.fpoly.ooc.request.cart.CartRequest;
import com.fpoly.ooc.service.interfaces.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartDetailService cartDetailService;

    @GetMapping()
    public ResponseEntity<?> getALl(@RequestParam("username") String username) {
        return ResponseEntity.ok(cartDetailService.getAllCart(username));
    }

    @PostMapping("")
    public ResponseEntity<?> createCartDetail(@RequestBody CartRequest request) {
        Cart cart = cartDetailService.createCartDetail(request);
        return ResponseEntity.ok(cart == null ? false : true);
    }

    @PostMapping("/createCart")
    public ResponseEntity<?> createCart(@RequestParam("username") String username) {
        return ResponseEntity.ok(cartDetailService.createCart(username));
    }
}
