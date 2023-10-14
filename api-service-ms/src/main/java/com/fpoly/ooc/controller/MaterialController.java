package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Material;
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
    public List<Material> data(){
        return service.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?>create(Material material){
        return ResponseEntity.ok(service.create(material));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?>update(@RequestParam Long id){
        Material material = service.getOne(id);
        return ResponseEntity.ok(service.update(material));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?>delete(@RequestParam Long id){
        Material material = service.getOne(id);
        service.delete(material.getId());
        return ResponseEntity.ok("Ok");
    }


}
