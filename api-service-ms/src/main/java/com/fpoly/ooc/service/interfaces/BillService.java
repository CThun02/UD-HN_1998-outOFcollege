package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.request.BillRequest;
import com.fpoly.ooc.responce.BillResponse;
import org.springframework.data.domain.Page;

public interface BillService {

    Page<BillResponse> getAll(Integer pageNo, Integer size);

    BillDetail createBill(BillRequest request);

}
