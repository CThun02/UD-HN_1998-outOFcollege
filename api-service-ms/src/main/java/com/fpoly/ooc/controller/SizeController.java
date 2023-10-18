package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.service.interfaces.SizeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/size")
@CrossOrigin("*")
public class SizeController {
    @Autowired
    private SizeServiceI service;

    @GetMapping("")
    public List<Size> data(){
        return service.findAll();
    }
}
