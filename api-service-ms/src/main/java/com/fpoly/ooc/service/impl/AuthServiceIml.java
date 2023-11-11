package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.CredentialsDTO;
import com.fpoly.ooc.dto.UserDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Role;
import com.fpoly.ooc.exception.LoginException;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.account.SignUpRequest;
import com.fpoly.ooc.service.interfaces.AccountService;
import com.fpoly.ooc.service.interfaces.AuthService;
import com.fpoly.ooc.service.interfaces.RoleService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;

@AllArgsConstructor
@Service
public class AuthServiceIml implements AuthService {

    private AccountService accountService;
    private PasswordEncoder passwordEncoder;
    private RoleService roleService;

    @Override
    public UserDTO login(CredentialsDTO dto) {
        Account account = accountService.findByLogin(dto.getLogin());
        if (passwordEncoder.matches(CharBuffer.wrap(dto.getPassword()), account.getPassword())) {
            return mapperUser(account);
        }
        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
    }

    @Override
    public UserDTO register(SignUpRequest signUp) {
        Account account = accountService.findByLogin(signUp.getUsername());

        if (account != null) {
            throw new LoginException("Tên đăng nhập đã tồn tại", HttpStatus.BAD_REQUEST);
        }

        Role role = roleService.findRoleByName(signUp.getRole().toUpperCase());

        Account user = Account.builder()
                .username(signUp.getUsername())
                .email(signUp.getEmail())
                .password(signUp.getPassword())
                .fullName(signUp.getFullName())
                .numberPhone(signUp.getPhoneNumber())
                .idNo(generatorCode())
                .role(role)
                .build();
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUp.getPassword())));

        Account savedUser = accountService.save(user);

        return mapperUser(savedUser);
    }

    @Override
    public UserDTO forgotPassword(String email) {
        return null;
    }

    @Override
    public UserDTO findByLogin(String login) {
        Account account=  accountService.findByLogin(login);
        return UserDTO.builder()
                .fullName(account.getFullName())
                .username(account.getUsername())
                .build();
    }

    private UserDTO mapperUser(Account account) {
        return UserDTO.builder()
                .username(account.getUsername())
                .fullName(account.getFullName())
                .build();
    }

    private String generatorCode() {
        return RandomStringUtils.random(10, true, false).toUpperCase();
    }

}
