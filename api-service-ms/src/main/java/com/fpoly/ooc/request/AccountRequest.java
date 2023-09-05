package com.fpoly.ooc.request;

import jakarta.persistence.Column;
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

    private String city;

    private String distrit;

    private String ward;

    private String street;

    private String descriptionDetail;

    private String image;
}
