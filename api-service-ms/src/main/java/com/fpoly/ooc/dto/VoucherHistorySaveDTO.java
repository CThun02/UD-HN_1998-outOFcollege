package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoucherHistorySaveDTO {

    private Long idBill;

    private String voucherCode;

    private BigDecimal priceReduce;

}

