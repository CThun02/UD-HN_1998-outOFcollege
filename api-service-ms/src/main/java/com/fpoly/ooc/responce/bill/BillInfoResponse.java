package com.fpoly.ooc.responce.bill;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpoly.ooc.entity.Payment;
import com.fpoly.ooc.entity.PaymentDetail;
import com.fpoly.ooc.responce.payment.PaymentDetailResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
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

    @JsonFormat(pattern = "dd/MM/yyyy ")
    private LocalDateTime shipDate;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy ")
    private LocalDateTime createdDate;

    private String fullName;

    private String phoneNumber;

    private Long addressId;

    private String addressDetaill;

    private String ward;

    private String district;

    private String city;

    private String status;

    private BigDecimal voucherPrice;

    private List<PaymentDetailResponse> lstPaymentDetail;

    public BillInfoResponse(Long billId, String billCode, String transaction, String symbol, String billType,
                            BigDecimal totalPrice, BigDecimal priceReduce, BigDecimal shipPrice, BigDecimal amountPaid,
                            LocalDateTime shipDate, LocalDateTime createdDate, String fullName, String phoneNumber,
                            Long addressId, String addressDetaill, String ward, String district, String city,
                            String status, BigDecimal voucherPrice) {
        this.billId = billId;
        this.billCode = billCode;
        this.transaction = transaction;
        this.symbol = symbol;
        this.billType = billType;
        this.totalPrice = totalPrice;
        this.priceReduce = priceReduce;
        this.shipPrice = shipPrice;
        this.amountPaid = amountPaid;
        this.shipDate = shipDate;
        this.createdDate = createdDate;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.addressId = addressId;
        this.addressDetaill = addressDetaill;
        this.ward = ward;
        this.district = district;
        this.city = city;
        this.status = status;
        this.voucherPrice = voucherPrice;
    }
}
