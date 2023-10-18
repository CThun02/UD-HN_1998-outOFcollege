package com.fpoly.ooc.request.promotion;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.request.product.ProductDetailRequest;
import com.fpoly.ooc.responce.product.ProductDetailResponse;
import com.fpoly.ooc.validation.CompareDateNow;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionRequest {

    private Long promotionId;

    private Long promotionProductId;

    private String promotionCode;

    @NotBlank(message = "Không được bỏ trống")
    private String promotionName;

    @NotBlank(message = "Không được bỏ trống")
    private String promotionMethod;

    @NotNull(message = "Không được bỏ trống")
    private BigDecimal promotionValue;

    private BigDecimal promotionValueMax;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    @NotNull(message = "Không được bỏ trống")
    @CompareDateNow(message = "Ngày bắt đầu lớn hơn ngày hiện tại")
    private LocalDateTime startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    @NotNull(message = "Không được bỏ trống")
    @CompareDateNow(message = "Ngày kết thúc lớn hơn ngày hiện tại")
    private LocalDateTime endDate;

    private String status;

    private List<Long> productDetailIds;

    private List<Long> productIdsResponse;

}
