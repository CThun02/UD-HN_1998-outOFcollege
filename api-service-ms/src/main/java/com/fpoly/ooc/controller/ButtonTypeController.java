package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.ButtonType;
import com.fpoly.ooc.service.interfaces.ButtonTypeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/button")
@CrossOrigin("*")
public class ButtonTypeController {
    @Autowired
    private ButtonTypeServiceI service;

    @GetMapping("")
    public List<ButtonType> data() {
        return service.findAll();
    }

    @PostMapping("create")
    public ResponseEntity<?> create(ButtonType buttonType) {
        return ResponseEntity.ok(service.create(buttonType));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@RequestParam Long id) {
        ButtonType buttonType = service.getOne(id);
        return ResponseEntity.ok(service.update(buttonType));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@RequestParam Long id) {
        ButtonType buttonType = service.getOne(id);
        service.delete(buttonType.getId());
        return ResponseEntity.ok("Ok");
    }
}
