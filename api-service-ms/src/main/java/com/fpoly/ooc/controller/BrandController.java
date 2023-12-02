package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.request.brand.BrandRequest;
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
    public ResponseEntity<?> create(@RequestParam String brandName) throws JsonProcessingException {
        Brand brand = Brand.builder().brandName(brandName).build();
        return ResponseEntity.ok(service.create(brand));
    }
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Brand brand) throws JsonProcessingException {
        return ResponseEntity.ok(service.create(brand));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Brand brand) {
        return ResponseEntity.ok(service.update(brand, id));
    }
    @PutMapping("update/{id}")
    public ResponseEntity<?> updateStatus(@RequestBody BrandRequest request, @PathVariable Long id){
        return ResponseEntity.ok(service.updateStatus(request, id).getId());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?>delete(@PathVariable Long id){
        Brand brand= service.getOne(id);
        service.delete(brand.getId());
        return ResponseEntity.ok("Ok");
    }
}
