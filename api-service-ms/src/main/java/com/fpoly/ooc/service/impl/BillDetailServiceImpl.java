package com.fpoly.ooc.service.impl;

import com.fpoly.ooc.entity.Account;
import com.fpoly.ooc.entity.Bill;
import com.fpoly.ooc.entity.BillDetail;
import com.fpoly.ooc.entity.ProductDetail;
import com.fpoly.ooc.repository.BillDetailRepo;
import com.fpoly.ooc.repository.BillRepo;
import com.fpoly.ooc.repository.CartDetailRepo;
import com.fpoly.ooc.repository.CartRepo;
import com.fpoly.ooc.request.BillRequest;
import com.fpoly.ooc.responce.BillResponse;
import com.fpoly.ooc.responce.CartResponse;
import com.fpoly.ooc.service.interfaces.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
public class BillDetailServiceImpl implements BillService {

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
    public BillDetail createBill(BillRequest request) {
        Account accountBuilder = null;
        BillDetail billDetail = null;
        BigDecimal totalPrice = new BigDecimal(0);

        if (request.getAccountId() != null) {
            accountBuilder = Account.builder().username(request.getAccountId()).build();
        }

        for (CartResponse cart : cartDetailRepo.getAllCart()) {
            totalPrice = totalPrice.add(cart.getPrice());
        }

        Bill bill = Bill.builder()
                .account(accountBuilder)
                .completionDate(new Date())
                .dateOfReceipt(new Date())
                .price(totalPrice)
                .billType("sale counter")
                .build();

        billRepo.save(bill);

        for (CartResponse cart : cartDetailRepo.getAllCart()) {
            billDetail = BillDetail.builder()
                    .bill(bill)
                    .productDetail(ProductDetail.builder().id(cart.getProductDetailId()).build())
                    .price(cart.getPrice())
                    .quantity(cart.getQuantity())
                    .status("wating")
                    .build();

            billDetailRepo.save(billDetail);
            cartDetailRepo.deleteById(cart.getCartDetailId());
            cartRepo.deleteById(cart.getCartId());
        }

        return billDetail;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public BillDetail updateBill(Long id, BillRequest request) {
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
