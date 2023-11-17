package com.fpoly.ooc.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.sql.DataSource;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling(ex -> ex.authenticationEntryPoint(userAuthenticationEntryPoint))
                .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement((e) -> e.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers(HttpMethod.POST, "api/v1/auth/login", "api/v1/auth/signup").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/admin/account/**").hasRole("EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/admin/account/**").hasRole("EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/admin/account/**").hasRole("EMPLOYEE")
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/account/**").hasRole("EMPLOYEE")
                        .requestMatchers(HttpMethod.POST, "/api/admin/bill/**").hasRole("EMPLOYEE")
                        .requestMatchers(HttpMethod.GET, "/api/admin/bill/**").hasRole("EMPLOYEE")
                        .requestMatchers(HttpMethod.PUT, "/api/admin/bill/**").hasRole("EMPLOYEE")
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/bill/**").hasRole("EMPLOYEE")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().permitAll());
        return http.build();
    }
}
