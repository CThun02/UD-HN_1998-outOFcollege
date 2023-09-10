package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Category;

import com.fpoly.ooc.service.interfaces.CategoryServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/api/category")
public class CategoryController {
    @Autowired
    private CategoryServiceI service;

    @GetMapping("/data")
    public List<Category> getBrands(){
        return service.getAll();
    }

   @DeleteMapping("/delete/{id}")
   public ResponseEntity<?> delete(@PathVariable("id") Long id){
        return ResponseEntity.ok(service.delete(id));

   }
   @PutMapping("/update")
    public ResponseEntity<?> update( @RequestBody Category request){
        return ResponseEntity.ok(service.update(request));
   }

   @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Category category){
        return ResponseEntity.ok(service.create(category));
   }



}
