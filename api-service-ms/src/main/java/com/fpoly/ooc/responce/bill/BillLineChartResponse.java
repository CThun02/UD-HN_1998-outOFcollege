package com.fpoly.ooc.responce.bill;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BillLineChartResponse {
    private String typeBill;
    private String time;
    private Double revenue;
}
