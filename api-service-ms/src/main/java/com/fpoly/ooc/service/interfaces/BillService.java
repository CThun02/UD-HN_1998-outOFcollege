package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.request.bill.BillRequest;
import com.fpoly.ooc.responce.bill.BillProductResponse;
import com.fpoly.ooc.responce.bill.BillResponse;

import java.util.List;

public interface BillService {

    List<BillResponse> getAll();

    BillDetail createBill(BillRequest request);

    BillDetail updateBill(Long id, BillRequest request);

    void deleteBill(Long id);

    List<BillProductResponse> getAllProduct();

}
