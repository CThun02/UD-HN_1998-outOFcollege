package com.fpoly.ooc.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AccountRequest {

    private String userName;

    private String fullName;

    private String idNo;

    private String numberPhone;

    private String email;

    private Date dob;

    private Integer gender;

    private Integer role;

    private String city;

    private String district;

    private String ward;

    private String street;

    private String descriptionDetail;

    private String image;
}
