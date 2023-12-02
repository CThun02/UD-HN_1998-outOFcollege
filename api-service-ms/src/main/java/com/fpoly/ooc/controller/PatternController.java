package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.request.form.FormRequest;
import com.fpoly.ooc.request.pattern.PatternRequest;
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
    public ResponseEntity<?> create(@RequestParam String categoryName) throws JsonProcessingException {
        Pattern pattern = Pattern.builder().patternName(categoryName).build();
        return ResponseEntity.ok(service.create(pattern));
    }
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Pattern pattern) throws JsonProcessingException {
        return ResponseEntity.ok(service.create(pattern));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Pattern pattern) {

        return ResponseEntity.ok(service.update(pattern, id));
    }
    @PutMapping("update/{id}")
    public ResponseEntity<?> updateStatus(@RequestBody PatternRequest patternRequest, @PathVariable Long id){
        return ResponseEntity.ok(service.updateStatus(patternRequest, id).getId());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?>delete(@PathVariable Long id){
        Pattern pattern= service.getOne(id);
        service.delete(pattern.getId());
        return ResponseEntity.ok("Ok");
    }
}
