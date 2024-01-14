package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.AddressRepository;
import com.fpoly.ooc.service.interfaces.AddressServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressServiceI {
    @Autowired
    private AddressRepository repo;

    @Override
    public Address create(Address address) {
        return repo.save(address);
    }

    @Override
    public Address update(Address address) {
        Address addressCheck = repo.findById(address.getId()).orElse(null);
        if (addressCheck != null) {
            return repo.save(address);
        }
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        return null;
    }

    @Override
    public List<Address> findAll() {
        return null;
    }

    @Override
    public Address getOne(Long id) throws NotFoundException {
        return repo.findById(id)
                .orElseThrow(() -> new NotFoundException(ErrorCodeConfig.getMessage(Const.ID_NOT_FOUND)));

    }

    @Override
    public void updateAddressDefault(Long addressId, Boolean value) {
        repo.updateAddressDefault(addressId, value);
    }

    @Override
    public List<Address> getListAddress(String username) {
        return repo.getListAddress(username);
    }

    @Override
    public Address getByCom(String ward, String district, String city, String descriptionDetail) {
        List<Address> lst = repo.getListAddressByCom(ward, district, city, descriptionDetail);
        if(lst.isEmpty()){
            return null;
        }
        return lst.get(0);
    }
}
