package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Color;
import com.fpoly.ooc.service.interfaces.ColorServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/color")
@CrossOrigin("*")
public class ColorController {
    @Autowired
    private ColorServiceI service;

    @GetMapping("")
    public List<Color> data(){
        return service.findAll();
    }
}
