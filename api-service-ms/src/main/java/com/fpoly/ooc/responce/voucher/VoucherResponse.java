package com.fpoly.ooc.responce.voucher;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class VoucherResponse {

    private Long id;

    private String voucherCode;

    private String voucherName;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private BigDecimal voucherValue;

    private BigDecimal voucherValueMax;

    private String voucherMethod;

    private BigDecimal voucherCondition;

    private Integer limiQuantity;

    private String permission;

}
