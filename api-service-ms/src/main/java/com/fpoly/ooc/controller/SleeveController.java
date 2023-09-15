package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.SleeveType;
import com.fpoly.ooc.service.interfaces.SleeveServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/sleeve")
@CrossOrigin("*")
public class SleeveController {
    @Autowired
    private SleeveServiceI service;

    @GetMapping("")
    public List<SleeveType> data(){
        return service.findAll();
    }
}
