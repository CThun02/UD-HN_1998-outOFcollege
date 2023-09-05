package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.entity.Material;
import com.fpoly.ooc.service.interfaces.ButtonTypeServiceI;
import com.fpoly.ooc.service.interfaces.MaterialServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/api/material")
public class MatterialController {
    @Autowired
    private MaterialServiceI service;

    @GetMapping("/data")
    public List<Material> getBrands(){
        return service.getAll();
    }
}
