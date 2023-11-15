package com.fpoly.ooc.controller;

import com.fpoly.ooc.config.UserAuthenticationProvider;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.service.interfaces.ClientAccountService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client/user")
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@AllArgsConstructor
public class ClientAccountController {
    private UserAuthenticationProvider userAuthenticationProvider;
    private ClientAccountService clientAccountService;

    @GetMapping("{username}")
    public ResponseEntity<?> userDetail(@PathVariable("username") String username) {
        if(StringUtils.isBlank(username) || StringUtils.isEmpty(username)) {
            throw new NotFoundException(ErrorCodeConfig.getMessage(Const.USER_NOT_FOUND));
        }

        return ResponseEntity.ok().body(clientAccountService.userDetailsDto(username));
    }

}
