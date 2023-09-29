package com.fpoly.ooc.responce.account;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AccountDetailResponce {

    private String image;

    private String username;

    private String idNo;

    private String fullName;

    private Date dob;

    private Boolean gender;

    private String email;

    private String numberPhone;

    private String descriptionDetail;

    private String city;

    private String district;

    private String ward;


}
