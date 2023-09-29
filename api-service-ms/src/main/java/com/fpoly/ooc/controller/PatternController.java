package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.service.interfaces.PatternServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/pattern")
@CrossOrigin("*")
public class PatternController {
    @Autowired
    private PatternServiceI service;

    @GetMapping("")
    public List<Pattern> data(){
        return service.findAll();
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam String categoryName){
        Pattern pattern = Pattern.builder().patternName(categoryName).build();
        return ResponseEntity.ok(service.create(pattern));
    }
}
