package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.AddressDetail;
import com.fpoly.ooc.exception.NotFoundException;

import java.util.List;

public interface AddressDetailService {
    List<AddressDetail> getAddressDetailsByUsername(String username);
    public AddressDetail create(AddressDetail addressDetail) throws NotFoundException;
    List<AddressDetail> getAllCustomer();
}
