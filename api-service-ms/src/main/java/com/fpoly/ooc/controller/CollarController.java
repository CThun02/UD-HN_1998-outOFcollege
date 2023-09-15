package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.service.interfaces.CollarServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/collar")
@CrossOrigin("*")
public class CollarController {
    @Autowired
    private CollarServiceI service;

    @GetMapping("")
    public List<CollarType> data(){
        return service.findAll();
    }
}
