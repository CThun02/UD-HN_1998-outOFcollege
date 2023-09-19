package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.service.interfaces.FormServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/form")
@CrossOrigin("*")
public class FormController {
    @Autowired
    private FormServiceI service;

    @GetMapping("")
    public List<Form> data(){
        return service.findAll();
    }
}