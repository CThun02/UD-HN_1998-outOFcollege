package com.fpoly.ooc.responce.bill;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.DeliveryNote;

import java.time.LocalDateTime;

public interface BillReturnRequestResponse {
    Long getBillId();
    String getBillCode();
    String getEmployee();
    String getCustomerName();
    @JsonFormat(pattern = "HH:mm:ss MM/dd/yyyy")
    LocalDateTime getCreatedAt();
    String getStatus();

}
