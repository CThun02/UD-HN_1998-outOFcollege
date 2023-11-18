package com.fpoly.ooc.request.address;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressRequest {
    private Long idAddress;
    private String fullName;
    private String phoneNumber;
    private String email;
    private String city;
    private String district;
    private String ward;
    private String street;
    private String addressDetail;
    private Boolean defaultAddress;
}
