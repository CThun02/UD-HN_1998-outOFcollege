package com.fpoly.ooc.request.bill;

import com.fpoly.ooc.request.payment.PaymentDetailRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillRequest {

    private Long id;

    private String accountId;

    private LocalDateTime dateOfReceipt;

    private LocalDateTime completionDate;

    private BigDecimal price;

    private BigDecimal priceReduce;

    private String billType;

    private String status;

    private String note;

    private String billCode;

    private List<BillDetailRequest> lstBillDetailRequest;

    private List<PaymentDetailRequest> lstPaymentDetailRequest;

}
