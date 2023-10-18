package com.fpoly.ooc.responce.bill;

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
public class BillInfoResponse {

    private Long billId;

    private String billCode;

    private String billType;

    private String fullName;

    private String phoneNumber;

    private BigDecimal totalPrice;

    private BigDecimal priceReduce;

    private BigDecimal shipPrice;

    private LocalDateTime shipDate;

    private String paymentName;

    private LocalDateTime createdDate;

    private String address;

}
