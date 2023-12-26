package com.fpoly.ooc.request.bill;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpoly.ooc.dto.EmailDetails;
import com.fpoly.ooc.request.payment.PaymentDetailRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillRequest {

    private Long id;

    private Long paymentDetailId;

    private Long addressId;

    private String accountId;

    private String createdBy;

    private String transactionCode;

    private String symbol;

    private LocalDateTime dateOfReceipt;

    private LocalDateTime completionDate;

    private BigDecimal price;

    private BigDecimal priceReduce;

    private BigDecimal amountPaid;

    private String billType;

    private String status;

    private String note;

    private String billCode;

    private String fullname;

    private String phoneNumber;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime shipDate;

    private BigDecimal shipPrice;

    private List<BillDetailRequest> lstBillDetailRequest;

    private List<PaymentDetailRequest> lstPaymentDetailRequest;

    private String voucherCode;

    private String city;

    private String district;

    private String ward;

    private EmailDetails emailDetails;

    private BigDecimal priceAmount;
}
