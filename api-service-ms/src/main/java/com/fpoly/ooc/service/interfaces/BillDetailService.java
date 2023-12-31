package com.fpoly.ooc.service.interfaces;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.responce.pdf.PdfResponse;

import java.util.List;

public interface BillDetailService {

    BillDetail createBillDetail(BillDetailRequest request) throws JsonProcessingException, NotFoundException;

    BillDetail updateBill(Long id, String status);

    BillDetail deleteBillDetail(Long BillId, Long billDetailId) throws JsonProcessingException, NotFoundException;

    BillDetail updateBillDetail(BillDetailRequest request) throws JsonProcessingException, NotFoundException;

    void deleteBill(Long id);

    PdfResponse pdfResponse(String billCode);

    List<BillDetail> findBillDetailByBillCode(String billCode) throws NotFoundException;

}
