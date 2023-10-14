package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.service.interfaces.ColorServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/color")
@CrossOrigin("*")
public class ColorController {
    @Autowired
    private ColorServiceI service;

    @GetMapping("")
    public List<Color> data(){
        return service.findAll();
    }
    @PostMapping("create")
    public ResponseEntity<?> create(Color color){
        return ResponseEntity.ok(service.create(color));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?>update(@RequestParam Long id){
        Color color = service.getOne(id);
        return ResponseEntity.ok(service.update(color));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?>delete(@RequestParam Long id){
        Color color = service.getOne(id);
        service.delete(color.getId());
        return ResponseEntity.ok("Ok");
    }
}
