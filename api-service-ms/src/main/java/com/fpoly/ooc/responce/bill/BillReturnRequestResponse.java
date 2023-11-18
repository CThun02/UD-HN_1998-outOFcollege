package com.fpoly.ooc.responce.bill;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpoly.ooc.entity.Account;

import java.time.LocalDateTime;

public interface BillReturnRequestResponse {
    String getBillCode();
    String getEmployee();
    String getCustomerName();
    @JsonFormat(pattern = "HH:mm:ss dd/MM/yyyy ")
    LocalDateTime getCreatedAt();
    String getStatus();
}
