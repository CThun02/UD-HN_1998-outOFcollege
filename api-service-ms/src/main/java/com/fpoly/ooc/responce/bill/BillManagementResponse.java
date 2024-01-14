package com.fpoly.ooc.responce.bill;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(pattern = "HH:mm:ss MM/dd/yyyy")
    private LocalDateTime createdDate;

    private String billType;

    private String symbol;

    private String status;

    private BigDecimal shipPrice;

    private BigDecimal priceReduce;

    private String employee;

    private String accountName;

    private String accountPhoneNumber;

    private String billUpdatedBy;

}
