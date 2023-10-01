package com.fpoly.ooc.request.bill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillRequest {

    private LocalDateTime dateOfReceipt;

    private LocalDateTime completionDate;

    private BigDecimal price;

    private BigDecimal priceReduce;

    private String billType;

}
