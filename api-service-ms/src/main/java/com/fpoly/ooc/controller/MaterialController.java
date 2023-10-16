package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.request.material.MaterialRequest;
import com.fpoly.ooc.service.interfaces.MaterialServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/material")
@CrossOrigin("*")
public class MaterialController {
    @Autowired
    private MaterialServiceI service;

    @GetMapping("")
    public List<Material> data() {
        return service.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Material material) {
        return ResponseEntity.ok(service.create(material));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Material material) {
        return ResponseEntity.ok(service.update(material, id));
    }

    @PutMapping("updateStatus/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody MaterialRequest request) {
        return ResponseEntity.ok(service.updateStatus(request, id).getId());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Material material = service.getOne(id);
        service.delete(material.getId());
        return ResponseEntity.ok("Ok");

    }
}
