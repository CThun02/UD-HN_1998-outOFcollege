package com.fpoly.ooc.responce.account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetListCustomer {

    private String username;

    private String fullname;

    private String email;

    private Boolean gender;

    private String status;

}
