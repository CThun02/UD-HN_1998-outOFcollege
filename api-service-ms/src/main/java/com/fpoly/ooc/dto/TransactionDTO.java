package com.fpoly.ooc.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class TransactionDTO {

    private String status;

    private String message;

    private TransactionData data;


}
