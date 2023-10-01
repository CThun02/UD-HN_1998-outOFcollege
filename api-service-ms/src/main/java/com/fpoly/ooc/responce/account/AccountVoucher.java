package com.fpoly.ooc.responce.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountVoucher {

    private String username;

    private String fullName;

    private Boolean gender;

    private String email;

    private String phoneNumber;

}
