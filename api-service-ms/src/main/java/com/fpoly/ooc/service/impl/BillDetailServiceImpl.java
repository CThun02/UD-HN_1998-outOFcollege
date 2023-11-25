package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.repository.BillDetailRepo;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.responce.bill.BillResponse;
import com.fpoly.ooc.responce.pdf.PdfResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service

public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillService billService;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public BillDetail createBill(BillDetailRequest request) {
//        Account accountBuilder = null;
//
//        if (request.getAccountId() != null) {
//            accountBuilder = Account.builder().username(request.getAccountId()).build();
//        }
//
//        Bill bill = Bill.builder()
//                .account(accountBuilder)
//                .completionDate(LocalDateTime.now())
//                .dateOfReceipt(LocalDateTime.now())
//                .price(request.getTotalPrice())
//                .billType("in-store")
//                .build();
//
//        billRepo.save(bill);
//
//        BillDetail   billDetail = BillDetail.builder()
//                .bill(bill)
//                .productDetail(ProductDetail.builder().id(request.getProductDetailId()).build())
//                .price(request.getPrice())
//                .quantity(request.getQuantity())
//                .status("wating")
//                .build();
//
//        billDetailRepo.save(billDetail);

        return null;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public BillDetail updateBill(Long id, String status) {
        BillDetail billDetail = billDetailRepo.findById(id).orElse(null);
        if (billDetail == null) {
            throw new IllegalArgumentException("bill detail không tồn tại");
        }

        billDetail.setStatus(status);
        return billDetailRepo.save(billDetail);
    }

    @Override
    public void deleteBill(Long id) {
        billDetailRepo.deleteById(id);
    }

    @Override
    public PdfResponse pdfResponse(String billCode) {
        BillResponse bill = billService.getBillByBillCode(billCode);
        List<TimelineProductResponse> lstProductDT = billDetailRepo.lstProductDT(billCode);

        PdfResponse pdfResponse = PdfResponse.builder()
                .billCode(billCode)
                .BillCreatedAt(bill.getCreatedAt())
                .billCreatedBy(bill.getCreatedBy())
                .totalPrice(bill.getPrice())
                .shippingFee(bill.getShippingPrice())
                .amountPaid(bill.getAmountPaid())
                .lstProductDetail(lstProductDT)
                .build();

        return pdfResponse;
    }


}
