package com.fpoly.ooc.controller;

import com.fpoly.ooc.request.account.AccountRequest;
import com.fpoly.ooc.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account/api/")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("view")
    public ResponseEntity<?> getAll(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return ResponseEntity.ok(accountService.phanTrang(pageNo, 5));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        accountService.remove(id);
        return ResponseEntity.ok(null);
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody AccountRequest request) {
        return ResponseEntity.ok(accountService.save(request));
    }

}
