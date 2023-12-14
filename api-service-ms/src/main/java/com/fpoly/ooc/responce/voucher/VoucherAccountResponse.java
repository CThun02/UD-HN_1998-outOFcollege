package com.fpoly.ooc.responce.voucher;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VoucherAccountResponse {

    private Long id;

    private String voucherCode;

    private String voucherName;

    @JsonFormat(pattern = "HH:mm:ss MM/dd/YYYY")
    private LocalDateTime startDate;

    @JsonFormat(pattern = "HH:mm:ss MM/dd/YYYY")
    private LocalDateTime endDate;

    private BigDecimal voucherValue;

    private BigDecimal voucherValueMax;

    private String voucherMethod;

    private BigDecimal voucherCondition;

    private Integer limitQuantity;

    private String privt;

    private String username;

    private BigDecimal percentReduce;

    private BigDecimal moneyReduce;

    private String statusVA;

    @JsonFormat(pattern = "HH:mm:ss MM/dd/YYYY")
    private LocalDateTime createdAtVA;

}
