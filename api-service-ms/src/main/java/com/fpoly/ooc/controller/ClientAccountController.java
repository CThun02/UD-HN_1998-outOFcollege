package com.fpoly.ooc.controller;

import com.fpoly.ooc.config.UserAuthenticationProvider;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.UserDTO;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.account.UserDetailsRequest;
import com.fpoly.ooc.request.address.AddressRequest;
import com.fpoly.ooc.service.interfaces.ClientAccountService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

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

    @PostMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody UserDetailsRequest request) {
        return ResponseEntity.ok().body(clientAccountService.updateUserDetail(request));
    }

    @PostMapping("/update-address")
    public ResponseEntity<?> updateAddress(@RequestBody AddressRequest request,
                                           @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String token) {
        UserDTO userDTO = userAuthenticationProvider.getUsernameFromToken(validToken(token));
        return ResponseEntity.ok().body(clientAccountService.updateAddress(request, userDTO.getUsername()));
    }

    @GetMapping("/address-detail")
    public ResponseEntity<?> getAddressDetail(@Param("addressId") Long addressId) {
        return ResponseEntity.ok(clientAccountService.getAddress(addressId));
    }

    @GetMapping("/user-detail")
    public ResponseEntity<?> getUserDetail(@Param("username") String username) {
        return ResponseEntity.ok().body(clientAccountService.getUserDetail(username));
    }

    @DeleteMapping("/delete-address")
    public ResponseEntity<?> deleteAddress(@RequestParam("addressId") Long addressId) {
        return ResponseEntity.ok(clientAccountService.deleteAddress(addressId));
    }

    private String validToken(String header) {
        String token = null;
        if(header != null) {
            String[] authenElements = header.split(" ");

            if(authenElements.length == 2 && "Bearer".equals(authenElements[0])) {
                token = authenElements[1];
            }
        }
        return token;
    }

}
