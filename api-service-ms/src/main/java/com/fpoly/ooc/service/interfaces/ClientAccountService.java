package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.UserDetailsDTO;
import com.fpoly.ooc.dto.UserInfomationDTO;

public interface ClientAccountService {

    UserDetailsDTO userDetailsDto(String username);

}
