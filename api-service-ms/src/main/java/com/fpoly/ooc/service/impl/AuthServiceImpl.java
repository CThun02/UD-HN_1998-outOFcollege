package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.CredentialsDTO;
import com.fpoly.ooc.dto.EmailDetails;
import com.fpoly.ooc.dto.UserDTO;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Role;
import com.fpoly.ooc.exception.LoginException;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.account.SignUpRequest;
import com.fpoly.ooc.service.interfaces.AccountService;
import com.fpoly.ooc.service.interfaces.AuthService;
import com.fpoly.ooc.service.interfaces.EmailService;
import com.fpoly.ooc.service.interfaces.RoleService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private AccountService accountService;
    private PasswordEncoder passwordEncoder;
    private RoleService roleService;
    private EmailService emailService;

    @Override
    public UserDTO login(CredentialsDTO dto) {
        Account account = accountService.findAccountByLogin(dto.getLogin(), dto.getRole());

        if(account == null) {
            throw new LoginException(ErrorCodeConfig.getMessage(Const.JWT_LOGIN_ERROR), HttpStatus.BAD_REQUEST);
        }

        if (passwordEncoder.matches(CharBuffer.wrap(dto.getPassword()), account.getPassword())) {
            return mapperUser(account);
        }
        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
    }

    @Override
    public UserDTO register(SignUpRequest signUp) {
        Account accountByUsername = accountService.findLoginByUsername(signUp.getUsername());
        Account accountByEmail = accountService.findLoginByUsername(signUp.getEmail());
        Account accountByPhoneNumber = accountService.findLoginByUsername(signUp.getPhoneNumber());

        if (accountByUsername != null) {
            throw new LoginException(ErrorCodeConfig.getMessage(Const.JWT_USER_ALREADY_EXIST), HttpStatus.BAD_REQUEST);
        }

        if (accountByPhoneNumber != null) {
            throw new LoginException(ErrorCodeConfig.getMessage(Const.JWT_PHONE_NUMBER_ALREADY_EXIST), HttpStatus.BAD_REQUEST);
        }

        if (accountByEmail != null) {
            throw new LoginException(ErrorCodeConfig.getMessage(Const.JWT_EMAIL_ALREADY_EXIST), HttpStatus.BAD_REQUEST);
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

        if(Objects.nonNull(savedUser)) {
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setMessageBody(Const.SIGN_UP_SEND_EMAIL);
            emailDetails.setSubject("Đăng kí tài khoản");
            emailDetails.setRecipient(List.of(savedUser.getEmail()));
            emailService.sendSimpleMail(emailDetails);
        }

        return mapperUser(savedUser);
    }

    @Override
    public UserDTO forgotPassword(String email) {
        return null;
    }

    @Override
    public UserDTO findByLogin(String login) {
        Account account=  accountService.findAccountByLogin(login, null);
        return UserDTO.builder()
                .fullName(account.getFullName())
                .username(account.getUsername())
                .roles(roleService.findRoleNameByUsername(account.getUsername()))
                .build();
    }

    private UserDTO mapperUser(Account account) {
        return UserDTO.builder()
                .username(account.getUsername())
                .fullName(account.getFullName())
                .roles(roleService.findRoleNameByUsername(account.getUsername()))
                .build();
    }

    private String generatorCode() {
        return RandomStringUtils.random(10, true, false).toUpperCase();
    }

}
