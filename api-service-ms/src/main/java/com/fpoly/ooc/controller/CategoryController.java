package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.service.interfaces.CategoryServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/category")
@CrossOrigin("*")
public class CategoryController {
    @Autowired
    private CategoryServiceI service;

    @GetMapping("")
    public List<Category> data(){
        return service.findAll();
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam String categoryName){
        Category category = Category.builder().categoryName(categoryName).build();
        return ResponseEntity.ok(service.create(category));
    }
}
