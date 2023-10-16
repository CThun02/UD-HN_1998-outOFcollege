package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.AddressDetail;
import org.springframework.stereotype.Service;

import java.util.List;

public interface AddressDetailService {
    List<AddressDetail> getAddressDetailsByUsername(String username);
    public AddressDetail create(AddressDetail addressDetail);
}
