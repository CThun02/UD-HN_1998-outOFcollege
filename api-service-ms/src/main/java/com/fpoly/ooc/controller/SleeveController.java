package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.ShirtTailType;
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
    public ResponseEntity<?> create(@RequestBody SleeveType sleeveType) {
        return ResponseEntity.ok(service.create(sleeveType));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody SleeveType sleeveType) {

        return ResponseEntity.ok(service.update(sleeveType, id));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        SleeveType sleeveType = service.getOne(id);
        service.delete(sleeveType.getId());
        return ResponseEntity.ok("Ok");
    }
}
