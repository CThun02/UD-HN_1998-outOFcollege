package com.fpoly.ooc.dto;

import com.fpoly.ooc.entity.Voucher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherHistoryConditionDTO {

    private Long billId;

    private String username;

    private Voucher voucher;

}
