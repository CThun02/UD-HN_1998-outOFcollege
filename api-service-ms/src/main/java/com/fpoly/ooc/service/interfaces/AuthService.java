package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.dto.CredentialsDTO;
import com.fpoly.ooc.dto.RePasswordRequest;
import com.fpoly.ooc.dto.SignUpGoogleDTO;
import com.fpoly.ooc.dto.UserDTO;
import com.fpoly.ooc.request.account.SignUpRequest;

import java.util.concurrent.CompletableFuture;

public interface AuthService {
    UserDTO login(CredentialsDTO dto);
    UserDTO register(SignUpRequest signUp);
    CompletableFuture<UserDTO> forgotPassword(RePasswordRequest rePasswordReq);
    UserDTO findByLogin(String login);
    UserDTO loginWithConnectGoogle(SignUpGoogleDTO req);
}
