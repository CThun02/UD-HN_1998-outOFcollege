package com.fpoly.ooc.request.voucher;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoucherRequest {

    private Long id;

    private String voucherCode;

    private String voucherName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime endDate;

    private BigDecimal voucherValue;

    private BigDecimal voucherValueMax;

    private String voucherMethod;

    private BigDecimal voucherCondition;

    private Integer limitQuantity;

    private String permission;

}
