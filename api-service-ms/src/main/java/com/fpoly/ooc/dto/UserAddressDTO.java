package com.fpoly.ooc.dto;

import com.fpoly.ooc.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressDTO {
    private List<AddressDTO> addresses;
}
