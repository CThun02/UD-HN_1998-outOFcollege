package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Pattern;
import com.fpoly.ooc.service.interfaces.PatternServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/api/pattern")
public class PatternController {
    @Autowired
    private PatternServiceI service;

    @GetMapping("/data")
    public List<Pattern> getBrands(){
        return service.getAll();
    }
}