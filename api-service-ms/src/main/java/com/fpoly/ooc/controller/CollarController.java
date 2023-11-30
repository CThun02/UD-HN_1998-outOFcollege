package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.request.collar.CollarRequest;
import com.fpoly.ooc.request.form.FormRequest;
import com.fpoly.ooc.service.interfaces.CollarServiceI;
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
@RequestMapping("/api/admin/collar")
@CrossOrigin("*")
public class CollarController {
    @Autowired
    private CollarServiceI service;

    @GetMapping("")
    public List<CollarType> data() {
        return service.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody CollarType collarType) throws JsonProcessingException {
        return ResponseEntity.ok(service.create(collarType));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CollarType collarType) {

        return ResponseEntity.ok(service.update(collarType, id));
    }
    @PutMapping("update/{id}")
    public ResponseEntity<?> updateStatus(@RequestBody CollarRequest request, @PathVariable Long id){
        return ResponseEntity.ok(service.updateStatus(request, id).getId());
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        CollarType collarType = service.getOne(id);
        service.delete(collarType.getId());
        return ResponseEntity.ok("Ok");
    }
}
