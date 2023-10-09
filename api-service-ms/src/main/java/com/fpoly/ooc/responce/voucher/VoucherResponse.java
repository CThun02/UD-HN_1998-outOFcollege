package com.fpoly.ooc.responce.voucher;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherResponse {

    private Long voucherId;

    private String voucherCode;

    private String voucherName;

    private BigDecimal voucherValue;

    private BigDecimal voucherValueMax;

    private String voucherMethod;

    private Integer limitQuantity;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime endDate;

    private String status;

    private String objectUse;

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof VoucherResponse other)) {
            return false;
        }
        return new EqualsBuilder()
                .append(voucherId, other.voucherId)
                .append(voucherCode, other.voucherCode)
                .append(voucherName, other.voucherName)
                .append(voucherValue, other.voucherValue)
                .append(voucherValueMax, other.voucherValueMax)
                .append(voucherMethod, other.voucherMethod)
                .append(limitQuantity, other.limitQuantity)
                .append(startDate, other.startDate)
                .append(endDate, other.endDate)
                .append(status, other.status)
                .append(objectUse, other.objectUse)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(voucherId)
                .append(voucherCode)
                .append(voucherName)
                .append(voucherValue)
                .append(voucherValueMax)
                .append(voucherMethod)
                .append(limitQuantity)
                .append(startDate)
                .append(endDate)
                .append(status)
                .append(objectUse)
                .toHashCode();
    }

}















