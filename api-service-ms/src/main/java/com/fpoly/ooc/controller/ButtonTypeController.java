package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.service.interfaces.ButtonTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/button")
@CrossOrigin("*")
public class ButtonTypeController {
    @Autowired
    private ButtonTypeServiceI service;

    @GetMapping("")
    public List<ButtonType> data(){
        return service.findAll();
    }
}
