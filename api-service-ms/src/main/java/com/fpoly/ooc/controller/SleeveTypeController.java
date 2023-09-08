package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.SleeveType;
import com.fpoly.ooc.service.interfaces.SleeveTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/api/sleevetype")
public class SleeveTypeController {
    @Autowired
    private SleeveTypeServiceI service;

    @GetMapping("/data")
    public List<SleeveType> getBrands(){
        return service.getAll();
    }
}
