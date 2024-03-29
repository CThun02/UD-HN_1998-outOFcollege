package com.fpoly.ooc.responce.timeline;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeLineResponse {

    private Long id;

    private Long billId;

    private String note;

    private String status;

    private LocalDateTime createdDate;

    private String createdBy;

    private String billType;

    private String paymentName;

    private String billStatus;

    private LocalDateTime completionDate;

    private BigDecimal totalPrice;

    private String address;

}
