package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.service.interfaces.BrandServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/brand")
@CrossOrigin("*")
public class BrandController {
    @Autowired
    private BrandServiceI service;

    @GetMapping("")
    public List<Brand> data(){
        return service.findAll();
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam String brandName){
        Brand brand = Brand.builder().brandName(brandName).build();
        return ResponseEntity.ok(service.create(brand));
    }
}
