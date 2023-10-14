package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.responce.bill.BillManagementResponse;
import com.fpoly.ooc.responce.bill.BillResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BillDetailService {

    List<BillResponse> getAll();

    BillDetail createBill(BillDetailRequest request);

    BillDetail updateBill(Long id, BillDetailRequest request);

    void deleteBill(Long id);

}
