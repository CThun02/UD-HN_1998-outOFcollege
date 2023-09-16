package com.fpoly.ooc.request.voucher;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoucherRequest {

    private Long voucherId;

    private String voucherName;

    private String voucherCode;

    private String voucherMethod;

    private BigDecimal voucherValue;

    private BigDecimal voucherValueMax;

    private Integer limitQuantity;

    private BigDecimal voucherCondition;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String status;

}
