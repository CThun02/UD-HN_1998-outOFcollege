package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Category;
import com.fpoly.ooc.service.interfaces.CategoryServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
}
