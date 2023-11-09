package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.CredentialsDTO;
import com.fpoly.ooc.dto.UserDTO;
import com.fpoly.ooc.request.account.SignUpRequest;

public interface AuthService {
    UserDTO login(CredentialsDTO dto);
    UserDTO register(SignUpRequest signUp);
    UserDTO forgotPassword(String email);
    UserDTO findByLogin(String login);
}
