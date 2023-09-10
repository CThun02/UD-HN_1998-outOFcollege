package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.CartDetail;
import com.fpoly.ooc.request.BillRequest;
import com.fpoly.ooc.responce.BillResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BillService {

    Page<BillResponse> getAll(Integer pageNo, Integer size);

    BillDetail createBill(BillRequest request);

    Bill updateBill(Long id, BillRequest request);

    void deleteBill(Long id);

}
