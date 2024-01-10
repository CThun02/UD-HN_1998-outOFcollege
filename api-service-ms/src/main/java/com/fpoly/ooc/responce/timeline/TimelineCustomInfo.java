package com.fpoly.ooc.responce.timeline;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TimelineCustomInfo {

    private Long addressId;

    private String fullName;

    private String phoneNumber;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime orderDate;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime dateOfReceipt;

    private String addressDetail;

    private String ward;

    private String district;

    private String city;

    private BigDecimal priceShip;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime dateShip;

    private BigDecimal totalPrice;

    private BigDecimal priceReduce;

    private BigDecimal pricePaid;

    private String status;

}
