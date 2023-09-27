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
@RequestMapping("/api/admin/pattern")
@CrossOrigin("*")
public class PatternController {
    @Autowired
    private PatternServiceI service;

    @GetMapping("")
    public List<Pattern> data(){
        return service.findAll();
    }
}
