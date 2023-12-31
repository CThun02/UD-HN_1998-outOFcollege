package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.color.ColorRequest;
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
    public ResponseEntity<?> create(@RequestBody Color color) throws JsonProcessingException, NotFoundException {
        return ResponseEntity.ok(service.create(color));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?>update(@PathVariable Long id, @RequestBody Color color) throws NotFoundException {
        return ResponseEntity.ok(service.update(color,id));
    }

    @PutMapping("updateStatus/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody ColorRequest request) throws NotFoundException {
        return ResponseEntity.ok(service.updateStatus(request, id).getId());
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?>delete(@PathVariable Long id){
        Color color = service.getOne(id);
        service.delete(color.getId());
        return ResponseEntity.ok("Ok");
    }
}
