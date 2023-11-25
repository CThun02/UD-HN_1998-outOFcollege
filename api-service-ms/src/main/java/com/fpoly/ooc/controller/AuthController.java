package com.fpoly.ooc.controller;

import com.fpoly.ooc.config.UserAuthenticationProvider;
import com.fpoly.ooc.dto.CredentialsDTO;
import com.fpoly.ooc.dto.UserDTO;
import com.fpoly.ooc.request.account.SignUpRequest;
import com.fpoly.ooc.service.interfaces.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
public class AuthController {

    private AuthService authService;
    private UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CredentialsDTO dto) {
        UserDTO userDto = authService.login(dto);
        userDto.setToken(userAuthenticationProvider.createToken(userDto.getUsername()));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignUpRequest dto) {
        UserDTO createdUser = authService.register(dto);
        createdUser.setToken(userAuthenticationProvider.createToken(dto.getUsername()));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getUsername())).body(createdUser);
    }

    @GetMapping("/verified/{token}")
    public ResponseEntity<?> verifiedUser(@PathVariable("token") String token) {
        return ResponseEntity.ok().body(userAuthenticationProvider.getUsernameFromToken(token));
    }

}
