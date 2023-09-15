package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.service.interfaces.MaterialServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/material")
@CrossOrigin("*")
public class MaterialController {
    @Autowired
    private MaterialServiceI service;

    @GetMapping("")
    public List<Material> data(){
        return service.findAll();
    }
}
