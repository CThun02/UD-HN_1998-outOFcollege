package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.AddressDTO;
import com.fpoly.ooc.dto.UserDetailsDTO;
import com.fpoly.ooc.dto.UserInfomationDTO;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.account.UserDetailsRequest;
import com.fpoly.ooc.request.address.AddressRequest;

public interface ClientAccountService {

    UserDetailsDTO userDetailsDto(String username) throws NotFoundException;

    AddressDTO updateAddress(AddressRequest request, String username) throws NotFoundException;

    UserInfomationDTO updateUserDetail(UserDetailsRequest request) throws NotFoundException;

    AddressDTO getAddress(Long addressId) throws NotFoundException;

    UserInfomationDTO getUserDetail(String username) throws NotFoundException;

    Boolean deleteAddress(Long addressId);
}
