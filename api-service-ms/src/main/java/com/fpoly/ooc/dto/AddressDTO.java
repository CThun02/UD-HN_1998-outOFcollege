package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
    private Long idAddress;
    private String phoneNumber;
    private String email;
    private String city;
    private String district;
    private String ward;
    private String street;
    private String descriptionDetail;
    private Boolean defaultAddress;
    private String fullName;
}
