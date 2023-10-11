package com.fpoly.ooc.controller;

import com.fpoly.ooc.dto.CustomerConditionDTO;
import com.fpoly.ooc.request.account.AccountRequest;
import com.fpoly.ooc.service.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/account")
@CrossOrigin("*")
public class AccountController {

    @Autowired
    private AccountService service;

    @GetMapping("viewAll")
    public ResponseEntity<?> phanTrang(@RequestParam(name = "page", defaultValue = "0") Integer pageNo, @RequestParam Long roleId) {
        return ResponseEntity.ok(service.phanTrang(pageNo, 5, roleId));
    }

    //Viết một phương thức mới Lấy dữ liệu address detail với usename
    // => trả về list address detail(account, address)
    @GetMapping("address-detail/{username}")
    public ResponseEntity<?> getAddressDetailsByUsername(@PathVariable String username) {
        return ResponseEntity.ok(service.getAddressDetailsByUsername(username));
    }

    @GetMapping("detail/{username}")
    public ResponseEntity<?> detail(@PathVariable String username) {
        return ResponseEntity.ok(service.detail(username));
    }

    @PostMapping("create")
    public ResponseEntity<?> save(@RequestBody AccountRequest request) {
        service.save(request);
        return ResponseEntity.ok("ok");
    }

    @PutMapping("update/{username}")
    public ResponseEntity<?> update(@PathVariable String username, @RequestBody AccountRequest request) {
        return ResponseEntity.ok(service.update(request, username));
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        service.remove(id);
        return ResponseEntity.ok("Delete successfully");
    }

    @PostMapping("/voucher")
    public ResponseEntity<?> findAccountCustomerVoucher(
            @RequestBody CustomerConditionDTO customerConditionDTO,
            @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
            @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize
    ) {

        return ResponseEntity.ok(service.findAccountVoucher(customerConditionDTO, PageRequest.of(pageNo, pageSize)));
    }

}