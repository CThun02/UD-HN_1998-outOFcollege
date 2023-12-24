package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.AddressDetailRepository;
import com.fpoly.ooc.service.interfaces.AddressDetailService;
import com.fpoly.ooc.service.interfaces.AddressServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressDetailImpl implements AddressDetailService
{

    private AddressDetailRepository repo;
    private AddressServiceI addressServiceI;

    @Autowired
    public AddressDetailImpl(AddressDetailRepository repo, AddressServiceI addressServiceI) {
        this.repo = repo;
        this.addressServiceI = addressServiceI;
    }

    @Override
    public List<AddressDetail> getAddressDetailsByUsername(String username) {
        return repo.getAddressDetailByUserName(username);
    }

    @Override
    public AddressDetail create(AddressDetail addressDetail) throws NotFoundException {
        List<Address> addressList = addressServiceI.getListAddress(addressDetail.getAccountAddress().getUsername());
        if(addressList.size()==0){
            Address address = addressServiceI.getOne(addressDetail.getAddressDetail().getId());
            address.setDefaultaddress(true);
            addressServiceI.update(address);
        }
        return repo.save(addressDetail);
    }

    @Override
    public List<AddressDetail> getAllCustomer() {
        return repo.getAllCustomer();
    }
}
