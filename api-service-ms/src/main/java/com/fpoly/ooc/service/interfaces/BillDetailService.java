package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.responce.bill.BillProductResponse;
import com.fpoly.ooc.responce.bill.BillResponse;

import java.util.List;

public interface BillDetailService {

    List<BillResponse> getAll();

    BillDetail createBill(BillDetailRequest request);

    BillDetail updateBill(Long id, BillDetailRequest request);

    void deleteBill(Long id);

    List<BillProductResponse> getAllProduct();

}
