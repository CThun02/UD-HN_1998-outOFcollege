package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.AddressDTO;
import com.fpoly.ooc.dto.UserDetailsDTO;
import com.fpoly.ooc.dto.UserInfomationDTO;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.AccountRepository;
import com.fpoly.ooc.repository.AddressRepository;
import com.fpoly.ooc.service.interfaces.AuthService;
import com.fpoly.ooc.service.interfaces.ClientAccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ClientAccountServiceImpl implements ClientAccountService {

    private AddressRepository addressRepository;
    private AccountRepository accountRepository;

    @Override
    public UserDetailsDTO userDetailsDto(String username) {
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        if(StringUtils.isEmpty(username) || StringUtils.isBlank(username)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        List<AddressDTO> addressDTOS = addressRepository.addressByUsername(username);
        UserInfomationDTO userInfomationDTO = accountRepository.userInfomationByUsername(username);

        userDetailsDTO.setAddressDTO(addressDTOS);
        userDetailsDTO.setUserInfomationDTO(userInfomationDTO);
        return userDetailsDTO;
    }
}
