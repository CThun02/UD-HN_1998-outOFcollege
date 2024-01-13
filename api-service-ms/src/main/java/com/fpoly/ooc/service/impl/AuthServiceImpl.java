package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.CredentialsDTO;
import com.fpoly.ooc.dto.EmailDetails;
import com.fpoly.ooc.dto.RePasswordRequest;
import com.fpoly.ooc.dto.SignUpGoogleDTO;
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
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

@AllArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private AccountService accountService;
    private PasswordEncoder passwordEncoder;
    private RoleService roleService;
    private EmailService emailService;

    @Override
    public UserDTO login(CredentialsDTO dto) throws NotFoundException {
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
        String title = ErrorCodeConfig.getFormatMessage(Const.HTML_TITLE, "Đăng kí tài khoản");
        String body = ErrorCodeConfig.getFormatMessage(Const.HTML_BODY,
                "Chúc mừng bạn đã đăng kí tài khoản thành công.", "<p style=\"font-size: 16px;\">Tên tài khoản: "
                        + signUp.getUsername() + "</p>" + "<p style=\"font-size: 16px;\">Mật khẩu: " + signUp.getPassword() + "</p>",
                "Cảm ơn bạn đã tin tưởng và đồng hành cùng chúng tôi. Bạn có thể đăng nhập vào website của chúng tôi tại đây. Chúc một ngày tốt lành!!");
        if(Objects.nonNull(savedUser)) {
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setMessageBody(Const.SEND_EMAIL_TEMPLATE_START_WITH_h1 + title + Const.SEND_EMAIL_TEMPLATE_BODY_CENTER + body + Const.SEND_EMAIL_TEMPLATE_END);
            emailDetails.setSubject("Đăng kí tài khoản");
            emailDetails.setRecipient(List.of(savedUser.getEmail()));
            emailService.sendSimpleMail(emailDetails);
        }

        return mapperUser(savedUser);
    }

    @Override
    @Async
    public CompletableFuture<UserDTO> forgotPassword(RePasswordRequest rePasswordReq) throws NotFoundException {
        if(!StringUtils.isNotBlank(rePasswordReq.getEmail())) {
            return CompletableFuture.completedFuture(null);
        }
        Account user = accountService.findAccountByEmail(rePasswordReq.getEmail());
        if(Objects.isNull(user)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND_BY_EMAIL));
        }

        UserDTO userDTO = mapperUser(user);
        String newPassword = generatorCodeNoUpperCase();
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(newPassword)));
        Account accountUpdate = accountService.save(user);
        System.out.println("newPassword: " + newPassword);
        if(Objects.isNull(accountUpdate)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.OPERATION_ERROR));
        }

        String title = ErrorCodeConfig.getFormatMessage(Const.HTML_TITLE, "Yêu cầu thay đổi mật khẩu");
        String body = ErrorCodeConfig.getFormatMessage(Const.HTML_BODY,
                "Chúc mừng bạn đã đổi mật khẩu thành công.",
                "Mật khẩu mới của bạn là: " + newPassword,
                "Cảm ơn bạn đã tin tưởng và đồng hành cùng chúng tôi. Bạn có thể đăng nhập vào website của chúng tôi tại đây. Chúc một ngày tốt lành!!");

        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setMessageBody(Const.SEND_EMAIL_TEMPLATE_START_WITH_h1 + title + Const.SEND_EMAIL_TEMPLATE_BODY_CENTER + body + Const.SEND_EMAIL_TEMPLATE_END);
        emailDetails.setSubject("Yêu cầu thay đổi mật khẩu");
        emailDetails.setRecipient(List.of(rePasswordReq.getEmail()));
        String result = String.valueOf(emailService.sendRePassword(emailDetails));

        if(StringUtils.isBlank(result) || result.equalsIgnoreCase("ERROR")) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.SEND_EMAIL_ERROR));
        }

        return CompletableFuture.completedFuture(userDTO);
    }

    @Override
    public UserDTO findByLogin(String login) {
        Account account=  accountService.findAccountByLogin(login, null);
        return UserDTO.builder()
                .fullName(account.getFullName())
                .username(account.getUsername())
                .roles(roleService.findRoleNameByUsername(account.getUsername()))
                .email(account.getEmail())
                .build();
    }

    @Override
    public UserDTO loginWithConnectGoogle(SignUpGoogleDTO req) {
        if (Objects.isNull(req)) {
            return null;
        }

        Account findAccount = accountService.findAccountByLogin(req.getEmail(), req.getRole());
        if (Objects.nonNull(findAccount)) {
            return mapperUser(findAccount);
        }

        if (req.getIsAdmin()) {
            return null;
        }

        int usernameAtIndex = req.getEmail().indexOf("@");
        if(usernameAtIndex == -1) {
            return null;
        }
        String username = req.getEmail().substring(0, usernameAtIndex);

        Account isCheckUsername = accountService.findByUsername(username);

        if(Objects.nonNull(isCheckUsername)) {
            username = username + ((int) (Math.random() * 9999));
        }

        SignUpRequest signUp = new SignUpRequest();
        signUp.setUsername(username);
        signUp.setRole(req.getRole());
        signUp.setEmail(req.getEmail());
        signUp.setPassword(generatorCodeNoUpperCase());
        signUp.setFullName(req.getName());

        UserDTO saveAccount = register(signUp);

        return saveAccount;
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
    private String generatorCodeNoUpperCase() {
        return RandomStringUtils.random(10, true, false);
    }

}
