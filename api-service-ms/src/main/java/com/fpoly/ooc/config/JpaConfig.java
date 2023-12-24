package com.fpoly.ooc.config;

import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.dto.UserDTO;
import com.fpoly.ooc.exception.LoginException;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.AccountRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
@Slf4j
public class JpaConfig {

    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            ServletRequestAttributes servletRequestAttributes = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes());
            HttpServletRequest request = null;

            if(servletRequestAttributes != null) {
                request = servletRequestAttributes.getRequest();
                String uri = request.getRequestURI();
                log.info("Authentication: " + uri);

                if (uri.contains("admin") && (authentication == null || !authentication.isAuthenticated())) {
                    try {
                        throw new NotFoundException(ErrorCodeConfig.getMessage(Const.JWT_AUTHENTICATION));
                    } catch (NotFoundException e) {
                        throw new RuntimeException(e);
                    }
                }

                log.warn("authentication: " + authentication);

                String user = null;
                UserDTO userDTO = null;
                if(authentication.getPrincipal().equals("anonymousUser")
                        && (uri.contains("client") || uri.contains("/api/v1/auth/signup") || uri.contains("rePassword"))) {
                    user = "CLIENT";
                } else {
                    try {
                        userDTO = (UserDTO) authentication.getPrincipal();
                        user = userDTO.getUsername() + "_" + userDTO.getFullName();
                    } catch (Exception e) {
                        user = "CLIENT";
                        log.warn("Error convert");
                    }
                }

                // return username_fullName
                return Optional.of(user);
            } else {
                return Optional.of("SYSTEM");
            }
        };
    }
}
