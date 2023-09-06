package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.service.interfaces.SizeTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/api/size")
public class SizeController {
    @Autowired
    private SizeTypeServiceI service;

    @GetMapping("/data")
    public List<Size> getBrands(){
        return service.getAll();
    }
}
