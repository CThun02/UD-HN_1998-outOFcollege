package com.fpoly.ooc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.CollarType;
import com.fpoly.ooc.entity.Form;
import com.fpoly.ooc.request.form.FormRequest;
import com.fpoly.ooc.service.interfaces.FormServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam String categoryName) throws JsonProcessingException {
        Form form = Form.builder().formName(categoryName).build();
        return ResponseEntity.ok(service.create(form));
    }
    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody Form form) throws JsonProcessingException {
        return ResponseEntity.ok(service.create(form));
    }

    @PutMapping("edit/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Form form) {

        return ResponseEntity.ok(service.update(form, id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> updateStatus(@RequestBody FormRequest request,@PathVariable Long id){
        return ResponseEntity.ok(service.updateStatus(request, id).getId());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>delete(@PathVariable Long id){
        Form form = service.getOne(id);
        service.delete(form.getId());
        return ResponseEntity.ok("Ok");
    }
}
