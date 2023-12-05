package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.repository.BillDetailRepo;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.responce.bill.BillResponse;
import com.fpoly.ooc.responce.pdf.PdfResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service

public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Autowired
    private ProductDetailServiceI productDetailService;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public BillDetail createBillDetail(BillDetailRequest request) {
        List<BillDetail> existingBillDetail = billDetailRepo.findBillDetailByBill_Id(request.getBillId());
        Bill bill = billRepo.findById(request.getBillId()).orElse(null);
        BigDecimal billTotal = bill.getPrice();

        for (BillDetail billDetail : existingBillDetail) {
            if (request.getProductDetailId() == billDetail.getProductDetail().getId()) {
                billDetail.setQuantity(billDetail.getQuantity() + request.getQuantity());
                billDetail.setPrice(request.getPrice());
                billDetail.setStatus(Const.STATUS_INACTIVE);
                BillDetail updateBillDetail = billDetailRepo.save(billDetail);

                billTotal = billTotal.add(request.getPrice().multiply(new BigDecimal(request.getQuantity())));
                bill.setPrice(billTotal);
                billRepo.save(bill);
                return updateBillDetail;
            }
        }

        BillDetail billDetail = BillDetail.builder()
                .bill(Bill.builder().id(request.getBillId()).build())
                .productDetail(ProductDetail.builder().id(request.getProductDetailId()).build())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .build();

        billTotal = billTotal.add(request.getPrice().multiply(new BigDecimal(billDetail.getQuantity())));

        BillDetail savedBillDetail = billDetailRepo.save(billDetail);
        bill.setPrice(billTotal);
        billRepo.save(bill);
        return savedBillDetail;
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
    public BillDetail deleteBillDetail(Long billDetailId) {
        return null;
    }

    @Override
    public BillDetail updateBillDetail(BillDetailRequest request) throws JsonProcessingException {
        ProductDetail productDetail = productDetailService.getOne(request.getProductDetailId());
        productDetail.setQuantity(productDetail.getQuantity() - request.getQuantity());
        productDetailService.update(productDetail);

        BillDetail billDetail = BillDetail.builder()
                .id(request.getBillDetailId())
                .bill(Bill.builder().id(request.getBillId()).build())
                .productDetail(productDetail)
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .status(Const.STATUS_ACTIVE)
                .build();
        billDetailRepo.save(billDetail);

        return billDetail;
    }

    @Override
    public void deleteBill(Long id) {
        billDetailRepo.deleteById(id);
    }

    @Override
    public PdfResponse pdfResponse(String billCode) {
        BillResponse bill = billRepo.getBillByBillCode(billCode);
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
