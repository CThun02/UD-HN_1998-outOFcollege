package com.fpoly.ooc.responce.deliveryNote;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DeliveryNoteResponse {

    private String fullName;

    private String phoneNumber;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime shipDate;

    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy ")
    private LocalDateTime dateOfReceipt;

    private BigDecimal shipPrice;

    private String addressDescription;

    private String ward;

    private String district;

    private String city;

}
