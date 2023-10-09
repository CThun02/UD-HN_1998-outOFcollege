package com.fpoly.ooc.responce.bill;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BillInfoResponse {

    private Long billId;

    private String billCode;

    private String billType;

    private String fullName;

    private String phoneNumber;

    private String email;

    private String address;

}
