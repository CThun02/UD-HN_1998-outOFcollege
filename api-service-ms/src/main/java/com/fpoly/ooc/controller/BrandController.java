package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Brand;
import com.fpoly.ooc.service.interfaces.BrandServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/brand")
@CrossOrigin("*")
public class BrandController {
    @Autowired
    private BrandServiceI service;

    @GetMapping("")
    public List<Brand> data(){
        return service.findAll();
    }
}
