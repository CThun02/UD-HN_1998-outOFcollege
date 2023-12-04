package com.fpoly.ooc.service.interfaces;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.responce.pdf.PdfResponse;

public interface BillDetailService {


    BillDetail createBillDetail(BillDetailRequest request);

    BillDetail updateBill(Long id, String status);

    BillDetail deleteBillDetail(Long billDetailId);

    BillDetail updateBillDetail(BillDetailRequest request) throws JsonProcessingException;

    void deleteBill(Long id);

    PdfResponse pdfResponse(String billCode);

}
