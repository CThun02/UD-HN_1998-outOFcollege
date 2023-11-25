package com.fpoly.ooc.responce.bill;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    private String transaction;

    private String symbol;

    private String billType;

    private BigDecimal totalPrice;

    private BigDecimal priceReduce;

    private BigDecimal shipPrice;

    private BigDecimal amountPaid;

    private LocalDateTime shipDate;

    private String paymentName;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy ")
    private LocalDateTime createdDate;

    private String fullName;

    private String phoneNumber;

    private String address;

}
