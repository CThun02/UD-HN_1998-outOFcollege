package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.shirttailtype.ShirtTailTypeRequest;
import com.fpoly.ooc.service.interfaces.ShirtTailTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/shirt-tail")
@CrossOrigin("*")
public class ShirtTailTypeController {
    @Autowired
    private ShirtTailTypeServiceI service;

    @GetMapping("")
    public List<ShirtTailType> data() {
        return service.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestParam String name) throws JsonProcessingException, NotFoundException {
        ShirtTailType shirtTailType = ShirtTailType.builder().shirtTailTypeName(name).build();
        return ResponseEntity.ok(service.create(shirtTailType));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ShirtTailType shirtTailType) {

        return ResponseEntity.ok(service.update(shirtTailType, id));
    }

    @PutMapping("updateStatus/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody ShirtTailTypeRequest request) throws NotFoundException {
        return ResponseEntity.ok(service.updateStatus(request, id).getId());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        ShirtTailType shirtTailType = service.getOne(id);
        service.delete(shirtTailType.getId());
        return ResponseEntity.ok("Ok");
    }
}
