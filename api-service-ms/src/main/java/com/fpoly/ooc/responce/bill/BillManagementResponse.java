package com.fpoly.ooc.responce.bill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillManagementResponse {

    private Long billId;

    private String billCode;

    private Long totalQuantity;

    private BigDecimal totalPrice;

    private String fullName;

    private String phoneNumber;
    
    private LocalDateTime createdDate;

    private String billType;

    private String symbol;

    private String status;

    private BigDecimal shipPrice;
    
    private BigDecimal priceReduce;

    private String employee;

}
