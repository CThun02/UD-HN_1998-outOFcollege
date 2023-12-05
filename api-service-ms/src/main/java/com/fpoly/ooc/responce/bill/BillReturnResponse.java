package com.fpoly.ooc.responce.bill;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.responce.timeline.TimeLineResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductDisplayResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BillReturnResponse {
    private Long id;
    private String billCode;
    private String customerName;
    private String userName;
    @JsonFormat(pattern = "HH:mm:ss MM/dd/yyyy")
    private LocalDateTime conpletionDate;
    private BigDecimal price;
    private BigDecimal priceReduce;
    private String billType;
    private String symbol;
    @JsonFormat(pattern = "HH:mm:ss MM/dd/yyyy")
    private LocalDateTime createdAt;
    private String createdBy;
    private List<TimelineProductDisplayResponse> billDetails;
    private List<TimeLineResponse> timeLines;
    private String fullName;
    private String phoneNumber;
    private String phoneNumberReceived;
    private String address;
    @JsonFormat(pattern = "HH:mm:ss MM/dd/yyyy")
    private LocalDateTime shippingDate;
    private String note;
    private String status;

    public BillReturnResponse(BillResponse response) {
        this.id = response.getId();
        this.billCode = response.getBillCode();
        this.customerName = response.getCustomerName();
        this.userName = response.getUserName();
        this.conpletionDate = response.getCompletionDate();
        this.price = response.getPrice();
        this.billType = response.getBillType();
        this.symbol = response.getSymbol();
        this.createdAt = response.getCreatedAt();
        this.createdBy = response.getCreatedBy();
        this.note = response.getNote();
        this.status = response.getStatus();
        this.phoneNumber = response.getNumberPhone();
        this.phoneNumberReceived = response.getNumberPhoneReceived();
        this.priceReduce = response.getPriceReduce();
    }
}
