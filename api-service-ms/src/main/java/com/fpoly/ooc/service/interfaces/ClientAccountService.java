package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.AddressDTO;
import com.fpoly.ooc.dto.UserDetailsDTO;
import com.fpoly.ooc.dto.UserInfomationDTO;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.request.account.UserDetailsRequest;
import com.fpoly.ooc.request.address.AddressRequest;

public interface ClientAccountService {

    UserDetailsDTO userDetailsDto(String username);

    AddressDTO updateAddress(AddressRequest request, String username);

    UserInfomationDTO updateUserDetail(UserDetailsRequest request);

    AddressDTO getAddress(Long addressId);

    UserInfomationDTO getUserDetail(String username);

    Boolean deleteAddress(Long addressId);
}
