package com.fpoly.ooc.request.voucher;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.validation.CompareDateNow;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotBlank(message = "Tên voucher không được bỏ trống")
    private String voucherName;

    private String voucherNameCurrent;

    private String voucherCode;

    @NotBlank(message = "Hình thức giảm giá không được bỏ trống")
    private String voucherMethod;

    @Min(value = 1, message = "Giá trị tối thiểu là 1")
    private BigDecimal voucherValue;

    private BigDecimal voucherValueMax;

    @Min(value = 1, message = "Giá trị tối thiểu là 1")
    private Integer limitQuantity;

    @Min(value = 1, message = "Giá trị tối thiểu là 1")
    private BigDecimal voucherCondition;

    @CompareDateNow(message = "Ngày bắt đầu phải lớn hơn ngày hiện tại")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime startDate;

    @CompareDateNow(message = "Ngày kết thúc phải lớn hơn ngày hiện tại")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime endDate;

    @JsonProperty("status")
    private String status;

}
