package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressServiceI {
    public Address create(Address address);
    public Address update(Address address);
    public Boolean delete(Long id);
    public List<Address> findAll();
    public Address getOne(Long id);
    void updateAddressDefault(Long addressId, Boolean value);
    List<Address> getListAddress(String username);

}
