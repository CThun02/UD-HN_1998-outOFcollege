package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.AddressDTO;
import com.fpoly.ooc.dto.UserDetailsDTO;
import com.fpoly.ooc.dto.UserInfomationDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.AccountRepository;
import com.fpoly.ooc.repository.AddressRepository;
import com.fpoly.ooc.request.account.UserDetailsRequest;
import com.fpoly.ooc.request.address.AddressRequest;
import com.fpoly.ooc.service.interfaces.AuthService;
import com.fpoly.ooc.service.interfaces.ClientAccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@AllArgsConstructor
public class ClientAccountServiceImpl implements ClientAccountService {

    private AddressRepository addressRepository;
    private AccountRepository accountRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetailsDTO userDetailsDto(String username) {
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        if (StringUtils.isEmpty(username) || StringUtils.isBlank(username)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        List<AddressDTO> addressDTOS = addressRepository.addressByUsername(username);
        UserInfomationDTO userInfomationDTO = accountRepository.userInfomationByUsername(username);

        userDetailsDTO.setAddressDTO(addressDTOS);
        userDetailsDTO.setUserInfomationDTO(userInfomationDTO);
        return userDetailsDTO;
    }

    @Override
    public AddressDTO updateAddress(AddressRequest request, String username) {
        Address address = addressRepository.findById(request.getIdAddress()).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ADDRESS_NOT_FOUND))
        );

        List<AddressDTO> addressDTOS = addressRepository.addressByUsername(username);
        addressDTOS.forEach(e -> {
            Address addressByUser = addressRepository.findById(e.getIdAddress()).orElse(null);
            if (addressByUser != null) {
                addressByUser.setDefaultaddress(false);
                addressRepository.save(addressByUser);
            }
        });

        address.setFullName(request.getFullName());
        address.setSdt(request.getPhoneNumber());
        address.setEmail(request.getEmail());
        address.setCity(request.getCity());
        address.setDistrict(request.getDistrict());
        address.setWard(request.getWard());
        address.setStreet(request.getStreet());
        address.setDescriptionDetail(request.getAddressDetail());
        address.setDefaultaddress(request.getDefaultAddress());

        return addressDTO(addressRepository.save(address));
    }

    @Override
    public UserInfomationDTO updateUserDetail(UserDetailsRequest request) {
        Account account = accountRepository.findLoginByUsername(request.getUsername());

        if (account == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        if (!passwordEncoder.matches(CharBuffer.wrap(request.getPassword()), account.getPassword())) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.PASSWORD_NOT_CORRECT));
        }

        account.setPassword(request.getNewPassword());
        account.setFullName(request.getFullName());
        account.setEmail(request.getEmail());
        account.setNumberPhone(request.getPhoneNumber());
        account.setGender(request.getGender());
        account.setDob(request.getDateOfBirth());
        account.setIdNo(request.getNationalIdentificationCard());
        account.setAvatar(request.getAvatar());

        return userInfomationDTO(accountRepository.save(account));
    }

    @Override
    public AddressDTO getAddress(Long addressId) {
        Address address = addressRepository.findById(addressId).orElseThrow(() ->
                new NotFoundException(ErrorCodeConfig.getMessage(Const.ADDRESS_NOT_FOUND))
        );
        return addressDTO(address);
    }

    @Override
    public UserInfomationDTO getUserDetail(String username) {
        Account account = accountRepository.findLoginByUsername(username);

        if (account == null) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }
        return userInfomationDTO(account);
    }

    @Override
    public Boolean deleteAddress(Long addressId) {
        Address address = addressRepository.findById(addressId).orElse(null);
        if (address != null) {
            address.setStatus(Const.STATUS_INACTIVE);
        }
        return addressRepository.save(address) != null;

    }

    private UserInfomationDTO userInfomationDTO(Account account) {
        UserInfomationDTO userInfomationDTO = new UserInfomationDTO();
        userInfomationDTO.setFullName(account.getFullName());
        userInfomationDTO.setUsername(account.getUsername());
        userInfomationDTO.setPhoneNumber(account.getNumberPhone());
        userInfomationDTO.setPassword(account.getPassword());
        userInfomationDTO.setEmail(account.getEmail());
        userInfomationDTO.setGender(account.getGender());
        userInfomationDTO.setDate(account.getDob());
        return userInfomationDTO;
    }

    private AddressDTO addressDTO(Address address) {
        AddressDTO addressDTO = new AddressDTO();

        addressDTO.setIdAddress(address.getId());
        addressDTO.setFullName(address.getFullName());
        addressDTO.setPhoneNumber(address.getSdt());
        addressDTO.setEmail(address.getEmail());
        addressDTO.setCity(address.getCity());
        addressDTO.setDistrict(address.getDistrict());
        addressDTO.setWard(address.getWard());
        addressDTO.setStreet(address.getStreet());
        addressDTO.setDescriptionDetail(address.getDescriptionDetail());
        addressDTO.setDefaultAddress(address.getDefaultaddress());

        return addressDTO;
    }

    private Boolean validText(String text) {
        return StringUtils.isNotEmpty(text) && StringUtils.isNotBlank(text);
    }

}
