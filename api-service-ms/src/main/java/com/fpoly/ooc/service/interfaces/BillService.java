package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.request.BillRequest;
import com.fpoly.ooc.responce.BillProductResponse;
import com.fpoly.ooc.responce.BillResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BillService {

    List<BillResponse> getAll();

    BillDetail createBill(BillRequest request);

    BillDetail updateBill(Long id, BillRequest request);

    void deleteBill(Long id);

    List<BillProductResponse> getAllProduct();

}
