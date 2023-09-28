package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.service.interfaces.FormServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/form")
@CrossOrigin("*")
public class FormController {
    @Autowired
    private FormServiceI service;

    @GetMapping("")
    public List<Form> data(){
        return service.findAll();
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam String categoryName){
        Form form = Form.builder().formName(categoryName).build();
        return ResponseEntity.ok(service.create(form));
    }
}
