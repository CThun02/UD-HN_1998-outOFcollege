package com.fpoly.ooc.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionData {

    private String amount;

    private String bankCode;

    private String transactionNo;

}
