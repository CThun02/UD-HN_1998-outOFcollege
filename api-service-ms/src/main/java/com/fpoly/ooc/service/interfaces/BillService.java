package com.fpoly.ooc.service.interfaces;

import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.request.bill.BillRequest;

public interface BillService {

    Bill createBill(BillRequest request);

    void deleteBill(Long id);

}
