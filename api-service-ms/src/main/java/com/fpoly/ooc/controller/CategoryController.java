package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.request.category.CategoryRequest;
import com.fpoly.ooc.request.form.FormRequest;
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
    public List<Category> data() {
        return service.findAll();
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam String categoryName) throws JsonProcessingException {
        Category category = Category.builder().categoryName(categoryName).build();
        return ResponseEntity.ok(service.create(category));
    }

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Category category) throws JsonProcessingException {
        return ResponseEntity.ok(service.create(category));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Category category) {
        return ResponseEntity.ok(service.update(category, id));
    }
    @PutMapping("update/{id}")
    public ResponseEntity<?> updateStatus(@RequestBody CategoryRequest request, @PathVariable Long id){
        return ResponseEntity.ok(service.updateStatus(request, id).getId());
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Category category = service.getOne(id);
        service.delete(category.getId());
        return ResponseEntity.ok("Ok");
    }
}
