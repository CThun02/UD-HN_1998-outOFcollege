package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.ShirtTailType;
import com.fpoly.ooc.service.interfaces.ShirtTailTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/api/shirttailtype")
public class ShirtTailTypeController {
    @Autowired
    private ShirtTailTypeServiceI service;

    @GetMapping("/data")
    public List<ShirtTailType> getBrands(){
        return service.getAll();
    }
}
