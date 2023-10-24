package com.fpoly.ooc.request.voucher;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DisplayVoucherRequest {

    private String username;

    private BigDecimal priceBill;

    private String voucherCodeOrName;

}
