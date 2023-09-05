package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Product;
import com.fpoly.ooc.request.ProductRequest;
import com.fpoly.ooc.responce.ProductResponse;
import com.fpoly.ooc.service.impl.ColorServiceImpl;
import com.fpoly.ooc.service.impl.ProductDetailServiceImpl;
import com.fpoly.ooc.service.impl.ProductServiceImpl;
import com.fpoly.ooc.service.impl.SizeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("/admin/api/product")

public class ProductController {

    private ProductServiceImpl service;
    private ProductDetailServiceImpl productDetailService;
    private ColorServiceImpl colorService;
    private SizeServiceImpl sizeService;

    @Autowired
    public ProductController(ProductServiceImpl service, ProductDetailServiceImpl productDetailService, ColorServiceImpl colorService, SizeServiceImpl sizeService) {
        this.service = service;
        this.productDetailService = productDetailService;
        this.colorService = colorService;
        this.sizeService = sizeService;
    }

    @GetMapping("/data")
    public List<ProductResponse> getProducts(@RequestParam(name = "page", defaultValue = "0") int page){
        return service.pageIndex(page).getContent();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createproduct(@RequestBody ProductRequest request){
        return ResponseEntity.ok(service.create(request.dto()));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateproduct(@RequestParam(name = "id") Long id, @RequestBody ProductRequest request){
        request.setId(id);
        return ResponseEntity.ok(service.update(request.dto()));
    }
}
