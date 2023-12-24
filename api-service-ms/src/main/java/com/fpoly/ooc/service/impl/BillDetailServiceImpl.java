package com.fpoly.ooc.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fpoly.ooc.constant.Const;
import com.fpoly.ooc.constant.ErrorCodeConfig;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.exception.NotFoundException;
import com.fpoly.ooc.repository.BillDetailRepo;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.responce.bill.BillInfoResponse;
import com.fpoly.ooc.responce.pdf.PdfResponse;
import com.fpoly.ooc.responce.timeline.TimelineProductResponse;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import com.fpoly.ooc.service.interfaces.ProductDetailServiceI;
import com.fpoly.ooc.service.interfaces.TimeLineService;
import jakarta.persistence.LockModeType;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Service

public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillServiceImpl billService;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Autowired
    private ProductDetailServiceI productDetailService;

    @Autowired
    private TimeLineService timeLineService;

    @Transactional(rollbackOn = Exception.class)
    @Override
    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    public BillDetail createBillDetail(BillDetailRequest request) throws JsonProcessingException, NotFoundException {
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

            if (Objects.isNull(billDetail)) {
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BILL_NOT_FOUND));
            }

            ProductDetail productDetail = productDetailService.findById(request.getProductDetailId());
            if (productDetail.getQuantity() <= 0) {
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
            }

            if (billDetail.getQuantity() - request.getQuantity() < 0) {
                throw new NotFoundException(ErrorCodeConfig.getMessage(Const.ERROR_BUY_QUANTITY_THAN_QUANTITY_IN_STORE));
            }

            if (billDetail.getQuantity() > request.getQuantity()) {
                productDetail.setQuantity(productDetail.getQuantity() +
                        (billDetail.getQuantity()) - request.getQuantity());
            }

            if (billDetail.getQuantity() < request.getQuantity()) {
                productDetail.setQuantity(productDetail.getQuantity() -
                        (request.getQuantity() - billDetail.getQuantity()));
            }

            if (Objects.equals(billDetail.getQuantity(), request.getQuantity())) {
                productDetail.setQuantity(productDetail.getQuantity() -
                        (request.getQuantity() - billDetail.getQuantity()));
            }

            productDetailService.update(productDetail);
            billDetail.setQuantity(request.getQuantity());
            savedBillDetail = billDetailRepo.save(billDetail);
        } else {
            List<BillDetail> existingBillDetail = billDetailRepo.findBillDetailByBill_Id(request.getBillId());
            if (existingBillDetail.isEmpty()) {
                savedBillDetail = billDetailRepo.save(billDetail);
            } else {
                boolean isCheck = Boolean.TRUE;
                for (BillDetail billDetailUpdate : existingBillDetail) {
                    if (Objects.equals(request.getProductDetailId(), billDetailUpdate.getProductDetail().getId())) {
                        billDetailUpdate.setQuantity(billDetailUpdate.getQuantity() + request.getQuantity());
                        billDetailUpdate.setPrice(request.getPrice());
                        savedBillDetail = billDetailRepo.save(billDetailUpdate);

                        ProductDetail productDetailDb = productDetailService.findById(billDetailUpdate.getProductDetail().getId());
                        productDetailDb.setQuantity(productDetailDb.getQuantity() - request.getQuantity());
                        productDetailService.update(productDetailDb);
                        isCheck = Boolean.FALSE;
                        break;
                    }
                }

                if (isCheck) {
                    savedBillDetail = billDetailRepo.save(billDetail);
                }
            }
        }

        BigDecimal priceBill = billDetailRepo.getTotalPriceByBillCode(bill.getBillCode());
        bill.setPrice(priceBill);
        billService.updateBill(bill);
        return savedBillDetail;
    }

    @Transactional(rollbackOn = Exception.class)
    @Override
    @Lock(LockModeType.OPTIMISTIC_FORCE_INCREMENT)
    public BillDetail updateBill(Long id, String status) {
        BillDetail billDetail = billDetailRepo.findById(id).orElse(null);
        if (billDetail == null) {
            throw new IllegalArgumentException("bill detail không tồn tại");
        }

        billDetail.setStatus(status);
        return billDetailRepo.save(billDetail);
    }

    @Override
    public BillDetail deleteBillDetail(Long billId, Long billDetailId) throws NotFoundException {
        Bill bill = billService.findBillByBillId(billId);
        BillDetail billDetail = billDetailRepo.findById(billDetailId).orElse(null);

        ProductDetail productDetail = productDetailService.findById(billDetail.getProductDetail().getId());
        Integer quantityUpdayte = productDetail.getQuantity() + billDetail.getQuantity();
        productDetail.setQuantity(quantityUpdayte);
        try {
            productDetailService.update(productDetail);
        } catch (Exception e) {
            e.printStackTrace();
        }

        billDetailRepo.deleteById(billDetailId);

        BigDecimal priceBill = billDetailRepo.getTotalPriceByBillCode(bill.getBillCode());
        bill.setPrice(priceBill);
        billService.updateBill(bill);

        return billDetail;
    }

    @Transactional(rollbackOn = RuntimeException.class)
    @Override
    public BillDetail updateBillDetail(BillDetailRequest request) throws JsonProcessingException, NotFoundException {
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
        Bill bill = billService.findBillByBillCode(billCode);
        BillInfoResponse response = timeLineService.getBillInfoByBillId(bill.getId());
        List<TimelineProductResponse> lstProductDT = billDetailRepo.lstProductDT(billCode);

        PdfResponse pdfResponse = PdfResponse.builder()
                .billCode(billCode)
                .BillCreatedAt(response.getCreatedDate())
                .billCreatedBy(bill.getCreatedBy())
                .totalPrice(response.getTotalPrice())
                .shippingFee(response.getShipPrice())
                .amountPaid(response.getAmountPaid())
                .voucherPrice(response.getVoucherPrice())
                .priceReduce(response.getPriceReduce())
                .lstProductDetail(lstProductDT)
                .build();

        return pdfResponse;
    }

    @Override
    public List<BillDetail> findBillDetailByBillCode(String billCode) throws NotFoundException {
        if (billCode == null) {
            throw new NotFoundException(Const.CODE_NOT_FOUND);
        }
        return billDetailRepo.findBillDetailByBill_BillCode(billCode);
    }

}
