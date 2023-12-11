package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillDetailRepo;
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
    private BillServiceImpl billService;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Autowired
    private ProductDetailServiceI productDetailService;

    @Override
    public BillDetail createBillDetail(BillDetailRequest request) {
        BillDetail billDetail = BillDetail.builder().id(request.getBillDetailId())
                .bill(Bill.builder().id(request.getBillId()).build())
                .productDetail(ProductDetail.builder().id(request.getProductDetailId()).build())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .build();
        Bill bill = billService.findBillByBillId(request.getBillId());
        BillDetail savedBillDetail = null;

        if (request.getBillDetailId() != null) {
            billDetail = billDetailRepo.findById(request.getBillDetailId()).orElse(null);
            billDetail.setQuantity(request.getQuantity());
            savedBillDetail = billDetailRepo.save(billDetail);
        } else {
            List<BillDetail> existingBillDetail = billDetailRepo.findBillDetailByBill_Id(request.getBillId());
            if (existingBillDetail.isEmpty()) {
                savedBillDetail = billDetailRepo.save(billDetail);
            } else {
                Boolean check = true;
                for (BillDetail billDetailUpdate : existingBillDetail) {
                    if (request.getProductDetailId() == billDetailUpdate.getProductDetail().getId()) {
                        billDetailUpdate.setQuantity(billDetailUpdate.getQuantity() + request.getQuantity());
                        billDetailUpdate.setPrice(request.getPrice());
                        billDetailUpdate.setStatus(Const.STATUS_INACTIVE);
                        savedBillDetail = billDetailRepo.save(billDetailUpdate);
                        check = false;
                        break;
                    }
                }
                if (check) {
                    savedBillDetail = billDetailRepo.save(billDetail);
                }
            }
        }
        BigDecimal priceBill = billDetailRepo.getTotalPriceByBillCode(bill.getBillCode());
        bill.setPrice(priceBill);
        billService.updateBill(bill);
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
    public BillDetail deleteBillDetail(Long billId, Long billDetailId) {
        Bill bill = billService.findBillByBillId(billId);
        BillDetail billDetail = billDetailRepo.findById(billDetailId).orElse(null);
        billDetailRepo.deleteById(billDetailId);

        BigDecimal priceBill = billDetailRepo.getTotalPriceByBillCode(bill.getBillCode());
        bill.setPrice(priceBill);
        billService.updateBill(bill);
        return billDetail;
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

    @Override
    public List<BillDetail> findBillDetailByBillCode(String billCode) {
        if (billCode == null){
            throw new NotFoundException(Const.CODE_NOT_FOUND);
        }
        return billDetailRepo.findBillDetailByBill_BillCode(billCode);
    }

}
