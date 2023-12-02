package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.request.size.SizeRequest;
import com.fpoly.ooc.service.interfaces.SizeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/size")
@CrossOrigin("*")
public class SizeController {
    @Autowired
    private SizeServiceI service;

    @GetMapping("")
    public List<Size> data() {
        return service.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Size size) throws JsonProcessingException {
        return ResponseEntity.ok(service.create(size));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Size size) {

        return ResponseEntity.ok(service.update(size, id));
    }

    @PutMapping("updateStatus/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody SizeRequest request) {
        return ResponseEntity.ok(service.updateStatus(request, id).getId());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Size size = service.getOne(id);
        service.delete(size.getId());
        return ResponseEntity.ok("Ok");
    }
}
