package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherAccountUsedDTO {

    private String username;

    private Long voucherId;

}
