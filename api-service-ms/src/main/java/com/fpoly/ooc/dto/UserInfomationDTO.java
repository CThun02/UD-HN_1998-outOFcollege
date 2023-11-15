package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfomationDTO {
    private String username;
    private String password;
    private String fullName;
    private String email;
    private String phoneNumber;
    private Boolean gender;
    private Date date;
}
