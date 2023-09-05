package com.fpoly.ooc.controller;

import com.fpoly.ooc.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account/")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("view")
    public ResponseEntity<?> getAll(@RequestParam(name = "page", defaultValue = "0") Integer pageNo) {
        return ResponseEntity.ok(accountService.phanTrang(pageNo, 5));
    }

}
