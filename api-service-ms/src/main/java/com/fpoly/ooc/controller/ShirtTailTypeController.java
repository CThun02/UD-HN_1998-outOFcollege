package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.ShirtTailType;
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
    public ResponseEntity<?> create(ShirtTailType shirtTailType) {
        return ResponseEntity.ok(service.create(shirtTailType));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@RequestParam Long id) {
        ShirtTailType shirtTailType = service.getOne(id);
        return ResponseEntity.ok(service.update(shirtTailType));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@RequestParam Long id) {
        ShirtTailType shirtTailType = service.getOne(id);
        service.delete(shirtTailType.getId());
        return ResponseEntity.ok("Ok");
    }
}
