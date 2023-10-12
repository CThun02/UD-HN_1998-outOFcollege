package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.repository.BillDetailRepo;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.CartDetailRepo;
import com.fpoly.ooc.repository.CartRepo;
import com.fpoly.ooc.request.bill.BillDetailRequest;
import com.fpoly.ooc.responce.bill.BillProductResponse;
import com.fpoly.ooc.responce.bill.BillResponse;
import com.fpoly.ooc.service.interfaces.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillRepo billRepo;

    @Autowired
    private BillDetailRepo billDetailRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private CartDetailRepo cartDetailRepo;

    @Override
    public List<BillResponse> getAll() {
        return billDetailRepo.getAllBill();
    }

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
    public BillDetail updateBill(Long id, BillDetailRequest request) {
        BillDetail billDetail = billDetailRepo.findById(id).orElse(null);
        if (billDetail == null) {
            throw new IllegalArgumentException("bill detail không tồn tại");
        }


        return null;
    }

    @Override
    public void deleteBill(Long id) {
        billDetailRepo.deleteById(id);
    }

}
