package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.service.interfaces.ButtonTypeServiceI;
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
@CrossOrigin("*")
@RequestMapping("/admin/api/material")
public class MatterialController {
    @Autowired
    private MaterialServiceI service;

    @GetMapping("/data")
    public List<Material> getBrands(){
        return service.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.delete(id));

    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Material responce) {
        return ResponseEntity.ok(service.create(responce));
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody Material material) {
        return ResponseEntity.ok(service.update(material));
    }

}
