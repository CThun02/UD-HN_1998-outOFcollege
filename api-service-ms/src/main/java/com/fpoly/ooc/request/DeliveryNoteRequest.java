package com.fpoly.ooc.request;

import com.fpoly.ooc.entity.Address;
import com.fpoly.ooc.entity.Bill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeliveryNoteRequest {

    private Long billId;

    private Long addressId;

    private LocalDateTime shipDate;

    private LocalDateTime dateOfreceipt;

    private BigDecimal shipPrice;

}
