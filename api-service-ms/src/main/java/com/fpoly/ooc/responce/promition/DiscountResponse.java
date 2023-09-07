package com.fpoly.ooc.responce.promition;

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
@ToString
public class DiscountResponse {

    private Long id;

    private String discountCode;

    private String discountName;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private BigDecimal discountValue;

    private BigDecimal discountMaxValue;

    private String discountMethod;

    private BigDecimal discountCondition;

}
