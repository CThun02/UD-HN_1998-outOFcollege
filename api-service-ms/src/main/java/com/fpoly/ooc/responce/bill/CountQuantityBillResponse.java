package com.fpoly.ooc.responce.bill;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CountQuantityBillResponse {

    private Integer countAll;

    private Integer countConfirmW;

    private Integer countConfirmS;

    private Integer shipping;

    private Integer complete;

    private Integer cancel;

    private Integer paid;

    private Integer unpaid;

}
