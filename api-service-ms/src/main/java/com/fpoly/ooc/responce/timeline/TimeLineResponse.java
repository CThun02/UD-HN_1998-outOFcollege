package com.fpoly.ooc.responce.timeline;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy ")
    private LocalDateTime createdDate;

    private String createdBy;

    private String billType;

    private String billStatus;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy ")
    private LocalDateTime completionDate;

    private BigDecimal totalPrice;

    private String address;

}
