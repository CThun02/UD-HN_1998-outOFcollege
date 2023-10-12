package com.fpoly.ooc.request.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDetailRequest {

    private Long billId;

    private Long paymentId;

    private BigDecimal price;

}
