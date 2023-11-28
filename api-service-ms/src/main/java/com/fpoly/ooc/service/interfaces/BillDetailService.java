package com.fpoly.ooc.service.interfaces;


import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.responce.pdf.PdfResponse;

public interface BillDetailService {


    BillDetail createBillDetail(BillDetailRequest request);

    BillDetail updateBill(Long id, String status);

    void deleteBill(Long id);

    PdfResponse pdfResponse(String billCode);

}
