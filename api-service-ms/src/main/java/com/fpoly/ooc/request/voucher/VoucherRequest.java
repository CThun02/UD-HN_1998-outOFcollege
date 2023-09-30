package com.fpoly.ooc.request.voucher;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fpoly.ooc.dto.EmailDetails;
import com.fpoly.ooc.validation.CompareDateNow;
import jakarta.validation.constraints.DecimalMin;
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
    @DecimalMin(value = "1", message = "Giá trị giảm phải là số nguyên dương.")
    @NotNull(message = "Giá trị giảm không được bỏ trống")
    private BigDecimal voucherValue;

    private BigDecimal voucherValueMax;

    @Min(value = 1, message = "Giá trị tối thiểu là 1")
    @NotNull(message = "Số lượng áp dụng không được bỏ trống")
    private Integer limitQuantity;

    @DecimalMin(value = "1", message = "Điều kiện giảm phải là số nguyên dương.")
    @NotNull(message = "Đơn hàng tối thiểu không được bỏ trống")
    private BigDecimal voucherCondition;

    @CompareDateNow(message = "Ngày bắt đầu phải lớn hơn ngày hiện tại")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    @NotNull(message = "Ngày bắt đầu không được bỏ trống")
    private LocalDateTime startDate;

    @CompareDateNow(message = "Ngày kết thúc phải lớn hơn ngày hiện tại")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    @NotNull(message = "Ngày kết thúc không được bỏ trống")
    private LocalDateTime endDate;

    private String status;

    private String objectUse;

    private EmailDetails emailDetails;

}
