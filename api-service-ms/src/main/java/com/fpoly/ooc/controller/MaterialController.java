package com.fpoly.ooc.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.material.MaterialRequest;
import com.fpoly.ooc.service.interfaces.MaterialServiceI;
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
    public ResponseEntity<?> create(@RequestBody Material material) throws JsonProcessingException, NotFoundException {
        return ResponseEntity.ok(service.create(material));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Material material) {
        return ResponseEntity.ok(service.update(material, id));
    }

    @PutMapping("updateStatus/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody MaterialRequest request) throws NotFoundException {
        return ResponseEntity.ok(service.updateStatus(request, id).getId());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Material material = service.getOne(id);
        service.delete(material.getId());
        return ResponseEntity.ok("Ok");
    }
}
