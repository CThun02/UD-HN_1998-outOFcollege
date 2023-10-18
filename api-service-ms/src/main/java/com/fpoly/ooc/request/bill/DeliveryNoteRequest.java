package com.fpoly.ooc.request.bill;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryNoteRequest {

    private Bill bill;

    private Address address;

    private String fullname;

    private String phoneNumber;

    private LocalDateTime shipDate;

    private BigDecimal shipPrice;

}
