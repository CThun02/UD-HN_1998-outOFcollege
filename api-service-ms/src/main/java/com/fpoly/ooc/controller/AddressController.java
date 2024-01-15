package com.fpoly.ooc.controller;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.service.interfaces.AddressServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin/address")
public class AddressController {

    @Autowired
    private AddressServiceI addressServiceI;

    @PostMapping()
    public ResponseEntity<?> createAddress(@RequestBody Address address) {
        return ResponseEntity.ok(addressServiceI.create(address));
    }

    @GetMapping()
    public ResponseEntity<?> getAll(@RequestParam("username") String username) {
        return ResponseEntity.ok(addressServiceI.getListAddress(username));
    }

    @GetMapping("/getByCom")
    public ResponseEntity<?> getByCom(@RequestParam("ward") String ward, @RequestParam("district") String district,
                                      @RequestParam("city") String city, @RequestParam("descriptionDetail") String descriptionDetail) {
        return ResponseEntity.ok(addressServiceI.getByCom(ward, district, city, descriptionDetail));
    }

}
