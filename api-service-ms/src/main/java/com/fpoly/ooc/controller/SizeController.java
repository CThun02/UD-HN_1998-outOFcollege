package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Size;
import com.fpoly.ooc.service.interfaces.SizeServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("create")
    public ResponseEntity<?> create(Size size){
        return ResponseEntity.ok(service.create(size));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?>update(@RequestParam Long id){
        Size size = service.getOne(id);
        return ResponseEntity.ok(service.update(size));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?>delete(@RequestParam Long id){
        Size size = service.getOne(id);
        service.delete(size.getId());
        return ResponseEntity.ok("Ok");
    }
}
