package com.fpoly.ooc.dto;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Voucher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherAccountConditionDTO {

    private Voucher voucher;

    private String username;

}
