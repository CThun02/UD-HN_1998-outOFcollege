package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.SleeveType;
import com.fpoly.ooc.service.interfaces.SleeveServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/sleeve")
@CrossOrigin("*")
public class SleeveController {
    @Autowired
    private SleeveServiceI service;

    @GetMapping("")
    public List<SleeveType> data() {
        return service.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> create(SleeveType sleeveType) {
        return ResponseEntity.ok(service.create(sleeveType));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@RequestParam Long id) {
        SleeveType sleeveType = service.getOne(id);
        return ResponseEntity.ok(service.update(sleeveType));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@RequestParam Long id) {
        SleeveType sleeveType = service.getOne(id);
        service.delete(sleeveType.getId());
        return ResponseEntity.ok("Ok");
    }
}
