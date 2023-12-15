package com.fpoly.ooc.responce.payment;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class PaymentDetailResponse {
    private Long id;
    private String paymentName;
    private BigDecimal price;
}
