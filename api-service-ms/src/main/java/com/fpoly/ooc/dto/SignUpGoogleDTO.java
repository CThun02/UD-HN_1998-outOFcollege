package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpGoogleDTO {
    private String email;
    private String name;
    private String picture;
    private String role;
    private Boolean isAdmin;
}
