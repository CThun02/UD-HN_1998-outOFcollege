package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.service.interfaces.CollarTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/api/collartype")
public class CollarTypeController {
    @Autowired
    private CollarTypeServiceI service;

    @GetMapping("/data")
    public List<CollarType> getBrands(){
        return service.getAll();
    }
}
