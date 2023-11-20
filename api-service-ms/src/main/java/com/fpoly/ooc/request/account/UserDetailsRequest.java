package com.fpoly.ooc.request.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsRequest {
    private String username;
    private String fullName;
    private Date dateOfBirth;
    private Boolean gender;
    private String phoneNumber;
    private String email;
    private String nationalIdentificationCard;
    private String password;
    private String newPassword;
    private String avatar;
}
