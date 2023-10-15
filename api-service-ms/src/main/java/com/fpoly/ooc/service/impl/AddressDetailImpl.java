package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.repository.AddressDetailRepository;
import com.fpoly.ooc.service.interfaces.AddressDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressDetailImpl implements AddressDetailService{

    @Autowired
    private AddressDetailRepository repo;

    @Override
    public List<AddressDetail> getAddressDetailsByUsername(String username) {
        return repo.getAddressDetailByUserName(username);
    }
}
