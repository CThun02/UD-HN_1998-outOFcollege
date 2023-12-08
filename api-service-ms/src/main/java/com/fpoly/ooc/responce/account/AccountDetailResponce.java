package com.fpoly.ooc.responce.account;


import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.AddressDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

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
    private List<Address> accountAddress;
}
