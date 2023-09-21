package com.fpoly.ooc.request.voucher;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.validation.CompareDateNow;
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

    @JsonProperty("voucherId")
    private Long voucherId;

    @JsonProperty("voucherName")
    private String voucherName;

    @JsonProperty("voucherCode")
    private String voucherCode;

    @JsonProperty("voucherMethod")
    private String voucherMethod;

    @JsonProperty("voucherValue")
    private BigDecimal voucherValue;

    @JsonProperty("voucherValueMax")
    private BigDecimal voucherValueMax;

    @JsonProperty("limitQuantity")
    private Integer limitQuantity;

    @JsonProperty("voucherCondition")
    private BigDecimal voucherCondition;

    @JsonProperty("startDate")
    @CompareDateNow(message = "Ngày bắt đầu phải lớn hơn ngày hiện tại")
    private LocalDateTime startDate;

    @JsonProperty("endDate")
    @CompareDateNow(message = "Ngày kết thúc phải lớn hơn ngày hiện tại")
    private LocalDateTime endDate;

    @JsonProperty("status")
    private String status;

}
